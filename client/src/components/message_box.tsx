import { useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { AiOutlineFile } from "react-icons/ai";

interface IProps {
  mine?: boolean;
  username: string;
  message: string;
  time: string;
  images?: string[];
}

export default function MessageBox({
  message,
  mine,
  time,
  username,
  images = []
}: IProps) {
  const [showCopied, setShowCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message);
    setShowCopied(true);
    setTimeout(() => {
      setShowCopied(false);
    }, 1000);
  };

  return (
    <div
      className={` flex flex-wrap flex-col whitespace-pre-wrap break-word p-4 bg-[#2b2e36] gap-4 max-w-[60%] mb-4 rounded-lg ${mine ? "ml-auto bg-[#8d988d]" : ""}`}
    >
      {!mine && <div className="text-sm">{username}</div>}
      {images.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {images.map((image, idx) => {
            if (image.startsWith("data:image")) {
              return (
                <img
                  key={idx}
                  src={image}
                  alt={`attachment-${idx}`}
                  className="max-w-64 max-h-64 object-cover rounded-lg"
                />
              );
            } else if (image.startsWith("data:")) {
              return (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2 bg-black bg-opacity-30 rounded-lg"
                >
                  <AiOutlineFile className="text-2xl" />
                  <span className="text-sm">{image.substring(5, 20)}...</span>
                </div>
              );
            }
          })}
        </div>
      )}
      <div className="flex items-baseline">
        <div>{message}</div>
        <div className="ml-auto">
          {showCopied ? (
            <IoCheckmarkDoneCircleOutline className="text-xs" />
          ) : (
            <FaRegCopy
              onClick={() => copyToClipboard()}
              className="text-xs cursor-pointer"
            />
          )}
        </div>
      </div>
      <div className="ml-auto text-xs">{time}</div>
    </div>
  );
}
