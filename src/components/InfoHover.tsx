import { Info } from "lucide-react";

interface InfoHoverProps {
  info: string
}


export default function InfoHover(props: InfoHoverProps) {
  return (
    <div className="relative inline-block">
      <div className="group inline-block">
        <Info className="text-blue-500 text-xl cursor-pointer" />
        <div className="absolute left-1/2 -translate-x-1/2 top-8 w-52 p-2 text-sm text-white bg-gray-800 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 pointer-events-none">
          {props.info}
        </div>
      </div>
    </div>
  );
}