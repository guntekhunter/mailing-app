import React, { useState, useCallback } from "react";
import TextColor from "../Text/TextColor";
import { HiUpload } from "react-icons/hi";
import { BsCheckCircleFill } from "react-icons/bs";
import { useDropzone } from "react-dropzone";
import { uploadImage } from "../../../Fetch/Fetch";

export default function ButtonUpload({ name, fileCallback, value }) {
  const [upload, setUpload] = useState(false);

  const { getRootProps, isDragActive } = useDropzone({
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      console.log(file[0]);
      const formData = new FormData();
      formData.append("file", file[0]);
      formData.append("upload_preset", "dzd169og");
      const res = await uploadImage(formData);
      console.log(res);
      fileCallback(name, res);
      setUpload(true);
    },
  });

  // console.log(data);
  // console.log(value);
  return (
    <div {...getRootProps()}>
      <div className="grid border-[1.5px] border-dashed rounded-[6px] place-content-around text-center px-3 py-4 space-y-1">
        <div className="flex place-content-around mx-3 my-3 p-0">
          {isDragActive ? (
            <BsCheckCircleFill className="place-content-center text-[#1975FF]" />
          ) : (
            <>
              {upload ? (
                <BsCheckCircleFill className="place-content-center text-[#1975FF]" />
              ) : (
                <HiUpload className="place-content-center text-[#1975FF]" />
              )}
            </>
          )}
        </div>
        <TextColor
          item="Ganti file"
          color="primary"
          className="font-bold text-[14px] flex justify-around"
        />
        <div className="flex">
          <TextColor
            item="Drop files disini atau "
            color="dark"
            className="text-[12px]"
          />
          <label className="text-[12px] mx-1 text-[#1975FF]">
            <u>pilih</u>
          </label>
          <TextColor item="dari device" color="dark" className="text-[12px]" />
        </div>
      </div>
    </div>
  );
}
