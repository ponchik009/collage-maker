import React from "react";

import { FileUpload } from "../FileUpload/FileUpload";
import { ButtonUpload } from "../ButtonUpload/ButtonUpload";

import { ReactComponent as IconAdd } from "../../assets/icons/IconAdd.svg";

let prevMouseX: number | null = null;
let prevMouseY: number | null = null;

interface IUploadCopmonentProps {
  anchor?: React.RefObject<HTMLElement>;
}

export const UploadComponent: React.FC<IUploadCopmonentProps> = ({
  anchor,
}) => {
  const [picture, setPicture] = React.useState<File | null>(null);

  const [uploadDisabled, _setUploadDisabled] = React.useState(false);
  const uploadDisabledRef = React.useRef(uploadDisabled);
  const setUploadDisabled = (data: boolean) => {
    uploadDisabledRef.current = data;
    _setUploadDisabled(data);
  };

  const [moveStarted, _setMoveStarted] = React.useState(false);
  const moveStartedRef = React.useRef(moveStarted);
  const setMoveStarted = (data: boolean) => {
    moveStartedRef.current = data;
    _setMoveStarted(data);
  };

  const [[imgX, imgY], _setImgPosition] = React.useState<[string, string]>([
    "0px",
    "0px",
  ]);
  const imgPositionRef = React.useRef([imgX, imgY]);
  const setImgPosition = (data: [string, string]) => {
    imgPositionRef.current = data;
    _setImgPosition(data);
  };

  const imgRef = React.useRef<HTMLImageElement | null>();

  React.useEffect(() => {
    const onMouseUp = (e: MouseEvent) => {
      prevMouseX = null;
      prevMouseY = null;
      setMoveStarted(false);
    };
    document.documentElement.addEventListener("mouseup", onMouseUp);

    const onMouseOverImg = (e: MouseEvent) => {
      if (!moveStartedRef.current || !imgRef.current) return;
      setUploadDisabled(true);

      const speed = 0.7;

      const currentMouseX = e.clientX;
      const currentMouseY = e.clientY;
      let newImgX = Number.parseInt(imgPositionRef.current[0]);
      let newImgY = Number.parseInt(imgPositionRef.current[1]);

      const ratio = imgRef.current.naturalHeight / imgRef.current.naturalWidth;
      const imgRatio = imgRef.current.height / imgRef.current.width;

      if (ratio > imgRatio) {
        const newHeight = imgRef.current.width * ratio;

        if (prevMouseY) {
          newImgY += (currentMouseY - prevMouseY) * speed;

          if (newImgY > 0) {
            newImgY = 0;
          }

          if (newImgY < imgRef.current.height - newHeight) {
            newImgY = imgRef.current.height - newHeight;
          }
        }

        prevMouseY = currentMouseY;
      } else {
        const ratio =
          imgRef.current.naturalWidth / imgRef.current.naturalHeight;
        const newWidth = imgRef.current.height * ratio;

        if (prevMouseX) {
          newImgX += (currentMouseX - prevMouseX) * speed;

          if (newImgX > 0) {
            newImgX = 0;
          }

          if (newImgX < imgRef.current.width - newWidth) {
            newImgX = imgRef.current.width - newWidth;
          }
        }

        prevMouseX = currentMouseX;
      }

      setImgPosition([`${newImgX}px`, `${newImgY}px`]);
    };
    document.documentElement.addEventListener("mousemove", onMouseOverImg);

    return () => {
      document.documentElement.removeEventListener("mouseup", onMouseUp);
      document.documentElement.removeEventListener("mousemove", onMouseOverImg);
    };
  }, []);

  React.useEffect(() => {
    if (picture) {
      const fr = new FileReader();

      fr.onload = function () {
        if (!!imgRef.current) {
          imgRef.current.src = fr.result as string;
        }
      };

      fr.readAsDataURL(picture);
    }
  }, [picture, imgRef]);

  const onMouseDown = (e: React.MouseEvent) => {
    setMoveStarted(true);
    return false;
  };

  const onImageChange = (file: File | null) => {
    setPicture(file);
    setImgPosition(["0", "0"]);
  };

  const onMouseClick = (e: React.MouseEvent) => {
    if (uploadDisabledRef.current) {
      e.stopPropagation();
    }
    setUploadDisabled(false);
  };

  return (
    <FileUpload setFile={onImageChange} accept="image/*" className="Upload">
      {!picture ? (
        <ButtonUpload className="ButtonUpload">
          <IconAdd />
        </ButtonUpload>
      ) : (
        <img
          ref={(el) => (imgRef.current = el)}
          className="ImageUpload"
          style={{ objectPosition: `${imgX} ${imgY}` }}
          onMouseDown={onMouseDown}
          draggable={false}
          onClick={onMouseClick}
        />
      )}
    </FileUpload>
  );
};
