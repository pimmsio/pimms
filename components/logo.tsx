import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-start flex-col space-y-2 z-10">
      <Image
        src="/static/logo.svg"
        alt="pim.ms"
        className="w-20 md:w-24"
        width={1000}
        height={179}
      />
    </div>
  );
}
