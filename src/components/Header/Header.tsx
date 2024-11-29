"use client";

import styles from "./Header.module.scss"; 
import Image from "next/image";
import logo from '@/assets/Logo.svg';

export default function Header() {
  
  return (
    <div className={styles.container}>
      <Image
          className={styles.commonLogo}
          src={logo}
          alt='SamovarTime'
          width={200} 
          height={50} 
      />
    </div>
  );
}


