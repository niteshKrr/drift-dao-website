import React from "react";
import CardComponent from "./CardComponent";

const TeamComponent = () => {
  return (
    <div className="bg-[url('/images/bg/bg1.jpg')]" id="team">
      <div className="text-white text-6xl text-center pt-20">Our team</div>
      <div className="sm:flex items-center justify-around sm:h-screen py-10">
        <div>
          <CardComponent
            name="Nitesh Kumar"
            email="nkumar35101@gmail.com"
            twitter="nkumar35101"
          />
        </div>
        <div>
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
