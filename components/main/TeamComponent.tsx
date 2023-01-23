import React from "react";
import CardComponent from "./CardComponent";

const TeamComponent = () => {
  return (
    <div className="bg-[url('/images/bg/bg1.jpg')]" id="team">
      <div className="text-white text-6xl text-center pt-20">Our team</div>
      <div className="sm:flex items-center justify-around sm:h-screen py-10">
        <div className="mx-3">
          <CardComponent />
        </div>
        <div className="mx-3">
          <CardComponent />
        </div>
      </div>
    </div>
  );
};

export default TeamComponent;
