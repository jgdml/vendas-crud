import React from "react";
import styles from "./Card.module.css";

interface CardProps {
  title: string;
  children: any;
}

const Card: React.FC<CardProps> = (props) => {
  return (
    <div className="w-full h-full flex justify-center">
      <div className={styles.container}>
        <div className="mt-48 shadow">
          <div className={styles.title}>
            <h1>{props.title}</h1>
          </div>

          <div className={styles.content}>{props.children}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
