import React from "react";
import Link from "next/link";
import styles from "./Sidebar.module.css";
import "../globalicons.css";
import "../globals.css";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Link className={styles.sidebarHome} href="/">
        <i className="material-symbols-outlined">storefront</i>
      </Link>

      <Link className={styles.sidebarLink} href="/produtos">
        <span className="material-symbols-outlined">package</span>
        Produtos
      </Link>
      <Link className={styles.sidebarLink} href="/vendas">
        <span className="material-symbols-outlined">sell</span>
        Vendas
      </Link>
      <Link className={styles.sidebarLink} href="/pessoas">
        <span className="material-symbols-outlined">person</span>
        Pessoas
      </Link>
      <Link className={styles.sidebarLink} href="/cidades">
        <span className="material-symbols-outlined">location_city</span>
        Cidades
      </Link>
      <Link className={styles.sidebarLink} href="/bairros">
        <span className="material-symbols-outlined">location_on</span>
        Bairros
      </Link>
    </div>
  );
};

export default Sidebar;
