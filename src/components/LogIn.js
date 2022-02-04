import React, { useState } from "react";
import { Stack, Container, Form, Button } from "react-bootstrap";
import firebaseApp from "../credenciales";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

const LogIn = () => {
  const [estaRegistrandose, setEstaRegistrandose] = useState(false);

  async function submitHandler(e) {
    e.preventDefault();
    const correo = e.target.formBasicEmail.value;
    const passw = e.target.formBasicPassword.value;

    if (estaRegistrandose) {
      const usuario = await createUserWithEmailAndPassword(auth, correo, passw);
    } else {
      signInWithEmailAndPassword(auth, correo, passw);
    }
  }

  return (
    <Container>
      <Stack gap={3}>
        <h1>{estaRegistrandose ? "Regisrate" : "Inicia sesión"}</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Button variant="primary" type="submit">
            {estaRegistrandose ? "Regisrate" : "Inicia sesión"}
          </Button>
        </Form>

        <Button
          variant="primary"
          type="submit"
          style={{ width: "300px" }}
          onClick={() => signInWithRedirect(auth, googleProvider)}
        >
          Acceder con Google
        </Button>
        <Button
          style={{ width: "300px" }}
          variant="primary"
          type="submit"
          onClick={() => setEstaRegistrandose(!estaRegistrandose)}
        >
          {estaRegistrandose
            ? "Ya tienes cuenta? Inicia sesion"
            : "No tienes cuenta? Registrate"}
        </Button>
      </Stack>
    </Container>
  );
};

export default LogIn;
