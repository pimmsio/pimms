import { ImageResponse } from "next/og";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const title = url.searchParams.get("title") || "PIMMS";
  // const description =
  //   url.searchParams.get("description") || "Grow with deeplinks";

  return new ImageResponse(
    (
      <div tw="flex flex-col w-full h-full items-start justify-center bg-[#ecf8fe] text-[#1f242e] relative">
        <div tw="absolute top-[50px] left-[50px] flex">
          <img
            src="https://assets.pimms.io/wordmark.png"
            alt="PIMMS Logo"
            width={200}
            height={36}
          />
        </div>
        <div tw="absolute bottom-[-15px] right-[-105px] flex">
          <img
            src="https://assets.pimms.io/dashboard-links-screenshot-2.jpg"
            alt="PIMMS Logo"
            width={505}
            height={550}
            tw="rounded-2xl border-[6px] border-[#D4F0FE]"
          />
        </div>
        <div tw="flex flex-col w-full px-16 w-[800px]">
          <h1 tw="text-6xl font-bold my-4 leading-tight">{title}</h1>

          <div tw="flex mt-8">
            <div tw="bg-[#dc2e65] text-4xl text-white font-bold rounded-2xl px-6 pt-3 pb-4">
              Learn more
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      // fonts: [
      //   {
      //     name: "Inter",
      //     data: await fetch(
      //       new URL(
      //         "https://fonts.googleapis.com/css2?family=Inter:wght@600;700&display=swap"
      //       )
      //     ).then((res) => res.arrayBuffer()),
      //     style: "normal",
      //     weight: 700,
      //   },
      // ],
    }
  );
}
