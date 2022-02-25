import React from "react";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";



const PerfilSection = ({ correoUsuario, userInfo, userPhoto, userNombre }) => {
  return (
    <>
      <div key={userInfo.email}>
        {userNombre == null ? (
          <Stack direction="row" spacing={2}>
            <Typography sx={{ my: 2, display: 'block', mr: 2 }} variant="body2" color="initial">{userInfo.nickname}</Typography>
            <Avatar
              alt="Remy Sharp"
              src={userInfo.photo}
              sx={{ width: 56, height: 56 }}
            />
          </Stack>
        ) : (
          <Stack direction="row" >
            <Typography sx={{ my: 2, display: 'block', mr: 2 }} variant="body2" color="initial">{userNombre}</Typography>
            <Avatar
              alt="Remy Sharp"
              src={userPhoto}
              sx={{ width: 56, height: 56 }}
            />
          </Stack>
        )}

        <hr />
      </div>
    </>
  );
};

export default PerfilSection;
