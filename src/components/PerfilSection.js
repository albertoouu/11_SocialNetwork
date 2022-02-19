import React from "react";

const PerfilSection = ({ correoUsuario, userInfo, photoGoogle, nombreGoogle }) => {
  return (
    <>
      <div key={userInfo.email}>
        <h3>{userInfo.email}</h3>
        {nombreGoogle == null ? (
          <div>
            <h4>{userInfo.nickname}</h4>
            <img src={userInfo.photo} alt={"perfilPhoto"} />
          </div>

        ) : (
          <div>
            <h4>{nombreGoogle}</h4>
            <img src={photoGoogle} alt={"perfilPhoto"} />
          </div>
        )}

        <hr />
      </div>
    </>
  );
};

export default PerfilSection;
