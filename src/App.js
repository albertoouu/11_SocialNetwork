import React, { useState, useEffect } from "react";
import Home from "./components/Home";
import LogIn from "./components/LogIn";

import firebaseApp from "./credenciales";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth(firebaseApp);

function App() {
  const [usuarioGlobal, setUsuarioGlobal] = useState(null);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUsuarioGlobal(user);
    } else {
      setUsuarioGlobal(null);
    }
  });
  return (
    <>
      {usuarioGlobal ? <Home correoUsuario={usuarioGlobal.email} /> : <LogIn />}
    </>
  );
}

export default App;
