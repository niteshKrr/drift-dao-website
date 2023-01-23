import React from "react";

const Footer = () => {
  return (
    <div className="w-full text-center py-8 px-10">
      <hr
        style={{
          borderWidth: "1px",
          borderColor: "white",
          borderStyle: "solid",
        }}
      ></hr>
      <div className="mt-8 text-slate-300">&copy; 2022 Drift-DAO™</div>
    </div>
  );
};

export default Footer;
