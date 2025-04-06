import { cn } from "../lib/utils";

export const LinkedinPost = ({
  className,
  title,
  comments,
  likes,
  shares,
  avatar,
  name,
  profile,
  time,
  showSolution,
}: {
  className?: string;
  title: string;
  comments: number;
  likes: number;
  shares: number;
  avatar: string;
  name: string;
  profile: string;
  time: string;
  showSolution: boolean;
}) => {
  return (
    <div
      className={cn(
        "relative flex bg-white flex-col ring-[10px] ring-zinc-200 transition-width duration-200 ease-linear rounded-2xl",
        className
      )}
    >
      <div className="flex flex-row w-full">
        <div className="flex flex-row pr-[12px] pt-[16px] pl-[12px] mb-[8px]">
          <div className="flex relative">
            <span className="flex relative justify-center items-center box-border overflow-hidden align-middle z-10 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-tiny bg-default text-default-foreground rounded-full w-[48px] h-[48px] min-w-[48px] min-h-[48px]">
              <img
                src={avatar}
                className="flex object-cover w-full h-full transition-opacity !duration-500 opacity-0 data-[loaded=true]:opacity-100"
                alt="avatar"
                data-loaded="true"
              />
            </span>
            <div className="ml-2 flex flex-col">
              <span className="font-semibold text-[14px]">{name}</span>
              <span className="text-black/60 line-clamp-1 pr-[calc(4rem+32px)] leading-[14px] text-[12px]">
                {profile}
              </span>
              <span className="text-black/60 line-clamp-1 pr-[calc(4rem+32px)] leading-[14px]  text-[12px]">
                {time} •
              </span>
            </div>
          </div>
        </div>
        <div className="absolute right-[12px] top-[4px]">
          <div className="cursor-pointer w-[32px] h-[32px] text-black/60 hover:bg-stone-100 transition-all items-center justify-center flex rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              data-supported-dps="24x24"
              fill="currentColor"
              className="mercado-match"
              width="24"
              height="24"
              focusable="false"
            >
              <path d="M14 12a2 2 0 11-2-2 2 2 0 012 2zM4 10a2 2 0 102 2 2 2 0 00-2-2zm16 0a2 2 0 102 2 2 2 0 00-2-2z"></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="flex mr-[8px] w-full">
        <div className="text-[14px] font-normal px-[16px] w-full">
          <div className="relative">
            <p className="text-[14px] whitespace-pre-line overflow-hidden leading-[20px] break-words">
              {title}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-row px-[16px] py-[8px] justify-between">
        <div className="flex flex-row items-center">
          <div className="flex flex-row">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              id="like-consumption-small"
              data-supported-dps="16x16"
            >
              <g>
                <path
                  d="M8 0a8 8 0 018 8 8 8 0 01-8 8 8 8 0 01-8-8 8 8 0 018-8z"
                  fill="none"
                ></path>
                <circle cx="8" cy="8" r="7" fill="#378fe9"></circle>
                <path
                  d="M11.93 7.25h-.55c-.05 0-.15-.19-.4-.46-.37-.4-.78-.91-1.07-1.19a7.13 7.13 0 01-1.73-2.24c-.24-.51-.26-.74-.75-.74a.78.78 0 00-.67.81c0 .14.07.63.1.8a7.54 7.54 0 001 2.2H4.12a.88.88 0 00-.65.28.84.84 0 00-.23.66.91.91 0 00.93.85h.16a.82.82 0 00-.55.24.77.77 0 00-.21.54.81.81 0 00.74.8.8.8 0 00.33 1.42.76.76 0 00-.09.55.87.87 0 00.85.63h2.29a3.8 3.8 0 00.89-.11l1.42-.4h1.9c1.02-.04 1.29-4.64.03-4.64z"
                  fill="#d0e8ff"
                  fillRule="evenodd"
                ></path>
                <path
                  d="M7.43 6.43H4.11a.88.88 0 00-.88 1 .92.92 0 00.93.84h.16a.82.82 0 00-.55.24.77.77 0 00-.21.56.83.83 0 00.74.81.81.81 0 00-.31.63.81.81 0 00.65.8.78.78 0 00-.09.56.86.86 0 00.85.62h2.29a3.8 3.8 0 00.89-.11l1.42-.47h1.9c1 0 1.27-4.64 0-4.64a5 5 0 01-.55 0s-.15-.19-.4-.46h0c-.37-.4-.78-.91-1.07-1.19a7.08 7.08 0 01-1.7-2.25 2.14 2.14 0 00-.32-.52.83.83 0 00-1.16.09 1.39 1.39 0 00-.25.38 1.71 1.71 0 00-.09.3 2.38 2.38 0 00.07.84 4.12 4.12 0 00.27.84 6.65 6.65 0 00.66 1 .18.18 0 01.07.08"
                  fill="none"
                  stroke="#004182"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </g>
            </svg>
          </div>
          {showSolution && (
            <>
              <div className="flex flex-row -ml-1.5 rounded-full bg-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  id="interest-consumption-small"
                  data-supported-dps="16x16"
                >
                  <g>
                    <path
                      d="M8 0a8 8 0 018 8 8 8 0 01-8 8 8 8 0 01-8-8 8 8 0 018-8z"
                      fill="none"
                    ></path>
                    <circle cx="8" cy="8" r="7" fill="#f5bb5c"></circle>
                    <path
                      d="M8.82 13.4h-1.6a.54.54 0 01-.54-.54v-1.33h2.68v1.33a.54.54 0 01-.54.54z"
                      fill="#ffe1b2"
                      fillRule="evenodd"
                    ></path>
                    <path
                      d="M6.69 11.79v-.26a3.08 3.08 0 00-.16-1A3.46 3.46 0 006 9.75a3.24 3.24 0 01-1.19-2.49 3.21 3.21 0 016.42 0A3.38 3.38 0 0110 9.8c.07-.05-.08.06-.18.2a1.71 1.71 0 00-.23.47 3.37 3.37 0 00-.15 1v.26"
                      fill="#fcf0de"
                      fillRule="evenodd"
                    ></path>
                    <path
                      d="M7.46 4.78a2.21 2.21 0 00-1.22.65 2.43 2.43 0 00-.68 1.22"
                      fill="none"
                      stroke="#fff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                    <path
                      d="M8.82 13.4h-1.6a.54.54 0 01-.54-.54v-1.33h2.68v1.33a.54.54 0 01-.54.54z"
                      fill="none"
                      stroke="#5d3b01"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M6.68 11.79v-.26a3.37 3.37 0 00-.15-1 2 2 0 00-.26-.47 2.54 2.54 0 00-.37-.43 3.41 3.41 0 01-.37-.39 3.16 3.16 0 01-.72-2h0a3.21 3.21 0 016.42 0 3.25 3.25 0 01-.73 2 3.84 3.84 0 01-.57.57l-.2.21a1.68 1.68 0 00-.22.47 3.37 3.37 0 00-.15 1v.26M4.6 2.64l.61.79M11.42 2.63l-.61.8M8 1.5v1.26"
                      fill="none"
                      stroke="#5d3b01"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </g>
                </svg>
              </div>
              <div className="flex flex-row -ml-1.5 rounded-full bg-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  id="praise-consumption-small"
                  data-supported-dps="16x16"
                >
                  <defs>
                    <mask
                      id="reactions-praise-consumption-small-a"
                      x="0"
                      y="0"
                      width="16"
                      height="16"
                      maskUnits="userSpaceOnUse"
                    >
                      <path
                        d="M8 1a7 7 0 017 7 7 7 0 01-7 7 7 7 0 01-7-7 7 7 0 017-7z"
                        fill="#fff"
                        fillRule="evenodd"
                      ></path>
                    </mask>
                  </defs>
                  <g>
                    <path
                      d="M8 0a8 8 0 018 8 8 8 0 01-8 8 8 8 0 01-8-8 8 8 0 018-8z"
                      fill="none"
                    ></path>
                    <g>
                      <path
                        d="M8 1a7 7 0 017 7 7 7 0 01-7 7 7 7 0 01-7-7 7 7 0 017-7z"
                        fill="#d8d8d8"
                      ></path>
                    </g>
                    <g mask="url(#reactions-praise-consumption-small-a)">
                      <circle cx="8" cy="8" r="7" fill="#6dae4f"></circle>
                      <path
                        d="M8 1a7 7 0 11-7 7 7 7 0 017-7zm0-1a8 8 0 105.66 2.34A8 8 0 008 0z"
                        fill="#fff"
                      ></path>
                      <path
                        d="M12.13 9.22a9.19 9.19 0 00-.36-2.32A4.29 4.29 0 0110.44 5c-.16-.53-.27-.72-.74-.73a.74.74 0 00-.65.8c0 .24 0 .49.06.72a11.5 11.5 0 00.58 1.92l-4.5-3.38a.75.75 0 00-1.11.07.73.73 0 00.27 1L6.6 7.1l.59.56L3.62 5a.71.71 0 00-.75-.16.69.69 0 00-.46.61.71.71 0 00.36.67L5 7.77l1.35 1-2.9-2.19a.79.79 0 00-.57-.21.8.8 0 00-.54.28c-.31.4-.06.81.26 1.06L4.85 9.4l1.15.85-2.27-1.7a.74.74 0 00-1.09 0 .76.76 0 00.24 1.09l4.1 3c.6.45 2.07.84 2.72.27"
                        fill="none"
                        stroke="#165209"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                      ></path>
                      <path
                        d="M12.61 9.9l-.42-.37a6.69 6.69 0 00-.51-2.14A5.73 5.73 0 0110.47 5c-.16-.53-.27-.72-.74-.73a.74.74 0 00-.65.8c0 .24 0 .49.06.72a8.88 8.88 0 00.55 1.84l-.19-.1-4.31-3.31a.75.75 0 00-1.11.07.73.73 0 00-.1.59.71.71 0 00.37.47L6.55 7l.64.51-3.57-2.67a.74.74 0 00-.57-.21.77.77 0 00-.54.27.77.77 0 00-.1.59.74.74 0 00.36.51L5 7.66l1.35 1-2.9-2.18a.75.75 0 00-.57-.22.76.76 0 00-.54.28.73.73 0 00.26 1.06l2.25 1.69 1.15.85-2.27-1.69a.73.73 0 00-.54-.25.77.77 0 00-.55.25.74.74 0 00.24 1.08L7 12.64a2.68 2.68 0 002.08.51 1.15 1.15 0 001.41 0c.6-.46.41-.51.85-1.13a10.92 10.92 0 001.27-2.12z"
                        fill="#dcf0cb"
                        fillRule="evenodd"
                      ></path>
                      <path
                        d="M12.13 9.22a9.19 9.19 0 00-.36-2.32A4.29 4.29 0 0110.44 5c-.16-.53-.27-.72-.74-.73a.74.74 0 00-.65.8c0 .24 0 .49.06.72a11.5 11.5 0 00.58 1.92l-4.5-3.38a.75.75 0 00-1.11.07.73.73 0 00.27 1L6.6 7.1l.59.56L3.62 5a.71.71 0 00-.75-.16.69.69 0 00-.46.61.71.71 0 00.36.67L5 7.77l1.35 1-2.9-2.19a.79.79 0 00-.57-.21.8.8 0 00-.54.28c-.31.4-.06.81.26 1.06L4.85 9.4l1.15.85-2.27-1.7a.74.74 0 00-1.09 0 .76.76 0 00.24 1.09l4.1 3a4.48 4.48 0 002.72.62"
                        fill="none"
                        stroke="#165209"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth=".5"
                      ></path>
                      <path
                        d="M14.77 11.39a2.23 2.23 0 01-.46-.75 3.65 3.65 0 00-.1-.65 2.39 2.39 0 00-.36-1.08 5.85 5.85 0 01-1.21-2.38c-.16-.53-.27-.72-.74-.73a.74.74 0 00-.5.26.73.73 0 00-.15.54 4.37 4.37 0 00.06.72c.18.92.37 1.68.39 1.73L7.41 5.84a.76.76 0 00-.57-.22.72.72 0 00-.54.29.73.73 0 00.26 1l2.25 1.7.68.56-3.6-2.71a.76.76 0 00-.57-.22A.71.71 0 005 7.58l2.25 1.7 1.35 1-2.89-2.19a.73.73 0 00-1.1.08c-.31.4-.07.81.26 1.06l2.25 1.68 1.12.85L6 10.06a.72.72 0 00-1 0 .7.7 0 00-.14.58.74.74 0 00.34.49l4 3a2.74 2.74 0 001.13.5l.58.09a2.48 2.48 0 01.87.29.83.83 0 00.6 0 3.87 3.87 0 001.77-1.29 3.8 3.8 0 00.7-2 1 1 0 000-.42z"
                        fill="none"
                        stroke="#165209"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                      ></path>
                      <path
                        d="M14.81 11.34l-.45-.34a6.57 6.57 0 00-.51-2.14 5.85 5.85 0 01-1.21-2.38c-.16-.53-.27-.72-.74-.73a.74.74 0 00-.5.26.73.73 0 00-.15.54 4.37 4.37 0 00.06.72c.18.93.37 1.69.39 1.73L7.41 5.79a.75.75 0 00-1.11.07c-.31.41-.06.81.26 1.06l2.25 1.69.68.56-3.6-2.76a.75.75 0 00-1.11.07c-.31.4-.06.81.26 1.06l2.25 1.69 1.35 1L5.71 8a.72.72 0 00-.57-.21.7.7 0 00-.53.28.72.72 0 00-.12.59.74.74 0 00.38.47l2.25 1.69 1.12.85L6 10a.7.7 0 00-1 0 .71.71 0 00-.16.6.72.72 0 00.36.51l4 3a4.23 4.23 0 002 .59 6.68 6.68 0 00.8.41 3.23 3.23 0 002-1.26 4.93 4.93 0 00.86-2.57z"
                        fill="#ddf6d1"
                        fillRule="evenodd"
                      ></path>
                      <path
                        d="M5.14 10.32c.57.43 4.43 3.43 4.89 3.59a2.18 2.18 0 001.47 0 1.6 1.6 0 00.5-.31"
                        fill="none"
                      ></path>
                      <path
                        d="M14.77 11.39a2.23 2.23 0 01-.46-.75 3.65 3.65 0 00-.1-.65 2.39 2.39 0 00-.36-1.08 5.85 5.85 0 01-1.21-2.38c-.16-.53-.27-.72-.74-.73a.74.74 0 00-.5.26.73.73 0 00-.15.54 4.37 4.37 0 00.06.72c.18.92.37 1.68.39 1.73L7.41 5.84a.76.76 0 00-.57-.22.72.72 0 00-.54.29.73.73 0 00.26 1l2.25 1.7.68.56-3.6-2.71a.76.76 0 00-.57-.22A.71.71 0 005 7.58l2.25 1.7 1.35 1-2.89-2.19a.73.73 0 00-1.1.08c-.31.4-.07.81.26 1.06l2.25 1.68 1.12.85L6 10.06a.72.72 0 00-1 0 .7.7 0 00-.14.58.74.74 0 00.34.49l4 3a2.74 2.74 0 001.13.5l.58.09a2.48 2.48 0 01.87.29.83.83 0 00.6 0 3.87 3.87 0 001.77-1.29 3.8 3.8 0 00.7-2 1 1 0 000-.42z"
                        fill="none"
                        stroke="#165209"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth=".5"
                      ></path>
                      <path
                        d="M8.83 2.82l-.73.92"
                        fill="none"
                        stroke="#165209"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M5.49 1.62l.07 1.2"
                        fill="none"
                        stroke="#165209"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M7.54 1.63l-.65 1.56"
                        fill="none"
                        stroke="#165209"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </g>
                  </g>
                </svg>
              </div>
            </>
          )}
          <div className="text-[12px] leading-[14px] font-normal pl-[4px] text-black/60 hover:underline hover:text-blue-600 cursor-pointer">
            {likes}
          </div>
        </div>
        <div className="flex flex-row">
          <div className="text-[12px] leading-[14px] font-normal pl-[4px] text-black/60 hover:underline hover:text-blue-600 cursor-pointer">
            {comments} comments
          </div>
          <div className="text-[12px] leading-[14px] font-normal pl-[4px] text-black/60 hover:underline hover:text-blue-600 cursor-pointer">
            ·
          </div>
          <div className="text-[12px] leading-[14px] font-normal pl-[4px] text-black/60 hover:underline hover:text-blue-600 cursor-pointer">
            {shares} shares
          </div>
        </div>
      </div>
    </div>
  );
};
