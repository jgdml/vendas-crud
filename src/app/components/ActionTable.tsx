"use client";
import React from "react";
import styles from "./ActionTable.module.css";
import Link from "next/link";

interface ActionTableProps {
  headers: string[];
  displayValues: string[];
  items: any[];
  editLink: string;
  deleteAction: (id?: any) => Promise<void>;
}

const ActionTable = (props: ActionTableProps) => {
  return (
    <table className={styles.displayTable}>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Valor de Venda</th>
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
                <Link
                  className={styles.iconButton}
                  href={props.editLink + "?id=" + item["id"]}
                >
                  <i className="material-symbols-outlined">edit</i>
                </Link>

                <button
                  className={styles.iconButton}
                  onClick={(e) => {
                    props.deleteAction(props.items[index]["id"]);
                    e.currentTarget.parentElement?.parentElement?.remove();
                  }}
                >
                  <i className="material-symbols-outlined">delete</i>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ActionTable;
