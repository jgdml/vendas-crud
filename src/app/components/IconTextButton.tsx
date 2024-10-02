"use client";
import React from "react";
import styles from "./IconTextButton.module.css";
import Link from "next/link";

interface IconTextButtonProps {
  icon: string;
  text: string;
  href?: string;
  onclick?: (event?: any) => void;
  isSubmit?: boolean;
}

const IconTextButton = (props: IconTextButtonProps) => {
  if (props.href) {
    return (
      <Link href={props.href} className={styles.iconTextButton}>
        <i className="material-symbols-outlined">{props.icon}</i>
        {props.text}
      </Link>
    );
  }
  return (
    <button
      onClick={props.onclick}
      className={styles.iconTextButton}
      type={props.isSubmit ? "submit" : "button"}
    >
      <i className="material-symbols-outlined">{props.icon}</i>
      {props.text}
    </button>
  );
};

export default IconTextButton;
