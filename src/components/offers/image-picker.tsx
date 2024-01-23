import { Dispatch, SetStateAction, useCallback } from "react";
import Dropzone from "react-dropzone";

const ImagePicker = ({
  setImage,
}: {
  setImage: Dispatch<SetStateAction<string>>;
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();

        reader.onload = () => {
          const binaryStr = reader.result;
          if (typeof binaryStr === "string") setImage(binaryStr);
        };
        reader.readAsDataURL(file);
      });
    },
    [setImage],
  );

  return (
    <Dropzone
      onDrop={onDrop}
      accept={{
        "image/jpeg": [],
        "image/png": [],
        "image/webp": [],
      }}
      multiple={false}
    >
      {({ getRootProps, getInputProps, isDragActive }) => (
        <div
          className={`${
            isDragActive ? "border-blue-500" : "border-gray-300"
          } aspect-video w-full rounded-lg border-2 border-dashed bg-gray-100 dark:bg-zinc-800/50`}
        >
          <div
            {...getRootProps({
              className:
                "flex h-full items-center justify-center p-5 text-center",
              onDrop: (event) => event.stopPropagation(),
            })}
          >
            <input {...getInputProps()} />
            <div className="flex h-full cursor-default items-center justify-center p-5 text-center">
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>
                  Drag &apos;n&apos; drop images here, or click to select files
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </Dropzone>
  );
};

export default ImagePicker;
