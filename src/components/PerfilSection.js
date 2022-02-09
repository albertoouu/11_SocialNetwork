import React from "react";

const PerfilSection = ({ correoUsuario, userInfo }) => {
  return (
    <>
      {userInfo.map((obj) => {
        return (
          <div key={obj.email}>
            <h3>{obj.email}</h3>
            <h4>{obj.nickname}</h4>
            <img src={obj.photo} />
            <hr />
          </div>
        );
      })}
    </>
  );
};

export default PerfilSection;
