import React from "react";
import CardComponent from "./CardComponent";
import styles from "@/styles/CardComponent.module.css";


const TeamComponent = () => {
  return (
    <div className="bg-[url('/images/bg/bg1.jpg')]" id="team">
      <div className="text-white text-6xl text-center pt-20">Our team</div>
      <div className="sm:flex items-center justify-around sm:h-screen py-8">
        <div className={`${styles.phone} m-auto`}>
          <CardComponent
            name="Nitesh Kumar"
            email="nkumar35101@gmail.com"
            twitter="nkumar35101"
          />
        </div>
        <div className={`${styles.phone} m-auto`}>
          <CardComponent
            name="Deependu Jha"
            email="deependujha21@gmail.com"
            twitter="deependu__"
          />
        </div>
      </div>
    </div>
  );
};

export default TeamComponent;
