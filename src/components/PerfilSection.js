import React from "react";

const PerfilSection = ({ correoUsuario, userInfo, userPhoto, userNombre }) => {
  return (
    <>
      <div key={userInfo.email}>
        <h3>{userInfo.email}</h3>
        {userNombre == null ? (
          <div>
            <h4>{userInfo.nickname}</h4>
            <img src={userInfo.photo} alt={"perfilPhoto"} />
          </div>

        ) : (
          <div>
            <h4>{userNombre}</h4>
            <img src={userPhoto} alt={"perfilPhoto"} />
          </div>
        )}

        <hr />
      </div>
    </>
  );
};

export default PerfilSection;
