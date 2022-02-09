import React from "react";

const PerfilSection = ({ correoUsuario, userInfo }) => {
  return (
    <>
      <div key={userInfo.email}>
        <h3>{userInfo.email}</h3>
        <h4>{userInfo.nickname}</h4>
        <img src={userInfo.photo} alt={"perfilPhoto"} />
        <hr />
      </div>
    </>
  );
};

export default PerfilSection;
