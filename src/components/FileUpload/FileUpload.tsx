import React from "react";

interface FileUploadProps extends React.HTMLAttributes<HTMLDivElement> {
  setFile: (file: File | null) => void;
  accept: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  setFile,
  accept,
  children,
  className,
  ...props
}) => {
  const ref = React.createRef<HTMLInputElement>();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFile(file);
  };

  return (
    <div onClick={() => ref.current?.click()} className={className} {...props}>
      <input
        type="file"
        accept={accept}
        style={{ display: "none" }}
        ref={ref}
        onChange={onChange}
      />
      {children}
    </div>
  );
};
