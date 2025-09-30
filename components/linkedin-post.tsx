import { cn } from "../lib/utils";

export const LinkedinPost = ({
  className,
  title,
  comments = 0,
  likes = 0,
  shares = 0,
  avatar,
  name,
  profile,
  time = "1w",
  showSolution = true,
  children
}: {
  className?: string;
  title?: string;
  comments?: number;
  likes?: number;
  shares?: number;
  avatar: string;
  name: string;
  profile: string;
  time?: string;
  showSolution?: boolean;
  postUrl?: string;
  children?: React.ReactNode;
}) => {
  // Use children as content if title is not provided
  const content = title || children;
  return (
    <div
      className={cn(
        "relative flex bg-white flex-col shadow-sm border border-gray-200 transition-all duration-200 ease-linear rounded-2xl",
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
      </div>
      <div className="flex mr-[8px] w-full pb-[12px]">
        <div className="text-[14px] font-normal px-[16px] w-full">
          <div className="relative">
            <div className="text-[14px] whitespace-pre-line overflow-hidden leading-[20px] break-words line-clamp-10 [&>*]:text-[14px] [&>*]:leading-[20px] [&>*]:m-0">
              {content}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row px-[16px] py-[8px] justify-between">
        <div className="flex flex-row items-center">
          <div className="flex flex-row">
            <img src="/static/linkedin-icons/like.svg" width="16" height="16" alt="Like" className="w-4 h-4" />
          </div>
          {showSolution && (
            <>
              <div className="flex flex-row -ml-1.5 rounded-full bg-white">
                <img
                  src="/static/linkedin-icons/interest.svg"
                  width="16"
                  height="16"
                  alt="Interest"
                  className="w-4 h-4"
                />
              </div>
              <div className="flex flex-row -ml-1.5 rounded-full bg-white">
                <img src="/static/linkedin-icons/praise.svg" width="16" height="16" alt="Praise" className="w-4 h-4" />
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
