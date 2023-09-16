import React from "react";

import styles from "./ButtonUpload.module.css";
import classNames from "classnames";

interface IButtonUploadProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const ButtonUpload: React.FC<IButtonUploadProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button className={classNames(styles.buttonUpload, className)} {...props}>
      {children}
    </button>
  );
};
