import { AwsClient } from "aws4fetch";
import crypto from "crypto";

interface imageOptions {
  contentType?: string;
  width?: number;
  height?: number;
}

class StorageClient {
  private client: AwsClient;

  constructor(private endpoint: string, public baseUrl: string) {
    this.client = new AwsClient({
      accessKeyId: process.env.STORAGE_ACCESS_KEY_ID || "",
      secretAccessKey: process.env.STORAGE_SECRET_ACCESS_KEY || "",
      service: "s3",
      region: "auto",
    });
  }

  async upload(
    key: string,
    body: Blob | Buffer | string,
    opts?: {
      contentType?: string;
      metadata?: Record<string, string>;
    }
  ): Promise<{ url: string }> {
    let uploadBody: Blob | Buffer | ArrayBuffer;

    if (typeof body === "string") {
      if (this.isBase64(body)) {
        uploadBody = this.base64ToArrayBuffer(body, opts);
      } else if (this.isUrl(body)) {
        uploadBody = await this.urlToBlob(body, opts);
      } else {
        throw new Error("Invalid input: Not a base64 string or a valid URL");
      }
    } else {
      uploadBody = body;
    }

    const headers: Record<string, string> = {
      "Content-Length":
        uploadBody instanceof Blob
          ? uploadBody.size.toString()
          : Buffer.byteLength(uploadBody).toString(),
    };

    if (opts?.contentType) {
      headers["Content-Type"] = opts.contentType;
    }

    if (opts?.metadata) {
      for (const [key, value] of Object.entries(opts.metadata)) {
        headers[`x-amz-meta-${key}`] = value;
      }
    }

    try {
      await this.client.fetch(`${this.endpoint}/${key}`, {
        method: "PUT",
        headers,
        body: uploadBody,
      });

      return {
        url: `${this.baseUrl}/${key}`,
      };
    } catch (error: any) {
      throw new Error(`Failed to upload file: ${error.message}`);
    }
  }

  async getMetadata(key: string): Promise<Record<string, string>> {
    try {
      const response = await this.client.fetch(`${this.endpoint}/${key}`, {
        method: "HEAD",
      });

      if (!response.ok) {
        throw new Error(`Failed to get metadata: ${response.statusText}`);
      }

      const metadata: Record<string, string> = {};
      response.headers.forEach((value: string, key: string) => {
        if (key.startsWith("x-amz-meta-")) {
          metadata[key.substring(11)] = value;
        }
      });

      return metadata;
    } catch (error: any) {
      throw new Error(`Failed to retrieve metadata: ${error.message}`);
    }
  }

  async delete(key: string) {
    await this.client.fetch(`${this.endpoint}/${key}`, {
      method: "DELETE",
    });

    return { success: true };
  }

  private base64ToArrayBuffer(base64: string, opts?: imageOptions) {
    const base64Data = base64.replace(/^data:.+;base64,/, "");
    const paddedBase64Data = base64Data.padEnd(
      base64Data.length + ((4 - (base64Data.length % 4)) % 4),
      "="
    );

    const binaryString = atob(paddedBase64Data);
    const byteArray = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      byteArray[i] = binaryString.charCodeAt(i);
    }
    const blobProps = {} as any;
    if (opts?.contentType) blobProps["type"] = opts.contentType;
    return new Blob([byteArray], blobProps);
  }

  private isBase64(str: string): boolean {
    const regex = /^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,([^\s]*)$/;
    return regex.test(str);
  }

  private isUrl(str: string): boolean {
    try {
      new URL(str);
      return true;
    } catch (_) {
      return false;
    }
  }

  private async urlToBlob(url: string, opts?: imageOptions): Promise<Blob> {
    let response: Response;
    if (opts?.height || opts?.width) {
      try {
        const proxyUrl = new URL("https://wsrv.nl");
        proxyUrl.searchParams.set("url", url);
        if (opts.width) proxyUrl.searchParams.set("w", opts.width.toString());
        if (opts.height) proxyUrl.searchParams.set("h", opts.height.toString());
        proxyUrl.searchParams.set("fit", "cover");
        response = await fetchWithTimeout(proxyUrl.toString());
      } catch (error) {
        response = await fetch(url);
      }
    } else {
      response = await fetch(url);
    }
    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.statusText}`);
    }
    const blob = await response.blob();
    if (opts?.contentType) {
      return new Blob([blob], { type: opts.contentType });
    }
    return blob;
  }

  isStored = (url: string) => {
    return url.startsWith(this.baseUrl);
  };
}

export const storage = new StorageClient(
  process.env.STORAGE_ENDPOINT as string,
  process.env.STORAGE_BASE_URL as string
);

export function fetchWithTimeout(
  input: RequestInfo | URL,
  init?: RequestInit | undefined,
  timeout: number = 5000
) {
  return new Promise<Response>((resolve, reject) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
      reject(new Error("Request timed out"));
    }, timeout);
    fetch(input, { ...init, signal: controller.signal })
      .then((response) => {
        clearTimeout(timeoutId);
        resolve(response);
      })
      .catch((error) => {
        clearTimeout(timeoutId);
        reject(error);
      });
  });
}

export function generateHash(input: string): string {
  return crypto.createHash("md5").update(input).digest("hex");
}
