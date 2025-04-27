export type LogoChoices = {
  facebook: string;
  instagram: string;
  x: string;
  youtube: string;
  linkedin: string;
  tiktok: string;
  reddit: string;
  wifi: string;
};

export type LogoType = keyof LogoChoices;

export type ImageType = "svg" | "png" | "jpeg" | "jpg";
export type QrCodesCustomization = {
  colors?: string[];
  corner?: string;
  id?: string;
  frame?: string;
  logo?: string;
  patterns?: { name: string; scale: number }[];
  texts?: string[];
  whitedots?: boolean;
};

export interface CreateQRCodesPostRequestBody {
  backhalf?: string;
  customization?: QrCodesCustomization;
  destination: {
    type: string;
    redirect_value: {
      url: string;
    };
  };
  domain?: string;
  download?: boolean;
  image_type?: ImageType;
  id?: string;
  public?: boolean | string;
  workspace_id?: string;
}

export interface CreateQRCodesPostResponseBody {
  archived: boolean;
  created_at: Date;
  destination: {
    type: string;
    redirect_value: {
      url: string;
    };
  };
  id: string;
  public: boolean;
  url: string;
}

export interface CreateStaticQRCodesPostRequestBody {
  customization?: QrCodesCustomization;
  value: string;
  download?: boolean;
  image_type?: ImageType;
}
