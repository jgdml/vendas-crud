"use client";
import React from "react";
import styles from "./ActionTable.module.css";
import Link from "next/link";

interface ActionTableProps {
  headers: string[];
  displayValues: string[];
  items: any[];
  editLink?: string;
  deleteAction?: (id?: any) => void;
  returnIndex?: boolean;
  keepElement?: boolean;
}

const ActionTable = (props: ActionTableProps) => {
  return (
    <table className={styles.displayTable}>
      <thead>
        <tr>
          {props.headers.map((h) => (
            <th>{h}</th>
          ))}
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {props.items.map((item, index) => {
          return (
            <tr>
              {props.displayValues.map((name) => (
                <td>{item[name]}</td>
              ))}
              <td>
                {props.editLink != null ? (
                  <Link
                    className={styles.iconButton}
                    href={props.editLink + "?id=" + item["id"]}
                  >
                    <i className="material-symbols-outlined">edit</i>
                  </Link>
                ) : null}

                {props.deleteAction != null ? (
                  <button
                    className={styles.iconButton}
                    onClick={(e) => {
                      if (!props.keepElement) {
                        e.currentTarget.parentElement?.parentElement?.remove();
                      }
                      props.deleteAction!(
                        props.returnIndex ? index : props.items[index]["id"]
                      );
                    }}
                  >
                    <i className="material-symbols-outlined">delete</i>
                  </button>
                ) : null}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ActionTable;
