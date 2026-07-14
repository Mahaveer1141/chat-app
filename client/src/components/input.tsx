import { ChangeEvent, useRef } from "react";
import { MdClose } from "react-icons/md";
import { AiOutlineFile } from "react-icons/ai";

interface IProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onFilesSelected?: (files: File[]) => void;
  selectedFiles?: File[];
  onRemoveFile?: (index: number) => void;
  placeholder?: string;
}

export default function Input({
  value,
  onChange,
  onFilesSelected,
  selectedFiles = [],
  onRemoveFile,
  placeholder
}: IProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (onFilesSelected) {
      onFilesSelected(files);
    }
    e.target.value = "";
  };

  const isImageFile = (file: File) => file.type.startsWith("image/");

  return (
    <div className="flex flex-col gap-2">
      {selectedFiles.length > 0 && (
        <div className="flex flex-wrap gap-3 p-2 bg-[#1f1f1f] rounded-lg">
          {selectedFiles.map((file, index) => (
            <div
              key={index}
              className="relative group flex flex-col items-center gap-1"
            >
              {isImageFile(file) ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
              ) : (
                <div className="w-16 h-16 bg-gray-600 rounded-lg flex items-center justify-center">
                  <AiOutlineFile className="text-2xl" />
                </div>
              )}
              <button
                type="button"
                onClick={() => onRemoveFile?.(index)}
                className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MdClose className="text-white text-sm" />
              </button>
              <span className="text-xs text-gray-300 max-w-16 truncate">
                {file.name}
              </span>
            </div>
          ))}
        </div>
      )}
      <div className="flex gap-2">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
          className="hidden"
          accept="*/*"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="px-3 py-3 bg-blue-500 text-white rounded-[20px] text-sm font-medium hover:bg-blue-600 transition-colors"
        >
          +
        </button>
        <input
          className="flex-1 border-none rounded-[20px] px-4 py-3 text-sm leading-4 text-black"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
