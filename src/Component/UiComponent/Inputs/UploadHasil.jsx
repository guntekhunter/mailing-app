import React, { useState, useCallback } from "react";
import TextColor from "../Text/TextColor";
import { HiUpload } from "react-icons/hi";
import { BsCheckCircleFill } from "react-icons/bs";
import { useDropzone } from "react-dropzone";

export default function UploadHasil() {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log(binaryStr);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div {...getRootProps()}>
      <div className="grid border-[1.5px] border-dashed rounded-[6px] place-content-around text-center px-3 py-4 space-y-1">
        <div className="flex place-content-around mx-3 my-3 p-0">
          {isDragActive ? (
            <BsCheckCircleFill className="place-content-center text-[#1975FF]" />
          ) : (
            <HiUpload className="place-content-center text-[#1975FF]" />
          )}
        </div>
        <TextColor
          item="Upload file"
          color="primary"
          className="font-bold text-[14px] flex justify-around"
        />
        <div className="flex">
          <TextColor
            item="Drop files disini or "
            color="dark"
            className="text-[12px]"
          />
          <label className="text-[12px] mx-1 text-[#1975FF]">
            <input
              {...getInputProps()}
              type="file"
              multiple
              className="sr-only"
            />
            <u>pilih</u>
          </label>
          <TextColor item="dari device" color="dark" className="text-[12px]" />
        </div>
      </div>
    </div>
  );
}
