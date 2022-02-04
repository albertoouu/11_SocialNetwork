import React, { useState, useEffect } from "react";

import firebaseApp from "../credenciales";
import { getAuth, signOut } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";

import { Button, Container } from "react-bootstrap";
import AgregarPost from "./AgregarTarea";
import NewsFeed from "./NewsFeed";

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

const Home = ({ correoUsuario }) => {
  const [arrayPosts, setArrayPosts] = useState(null);

  const fakeData = [
    { id: 1, description: "tarea falsa 1", url: "http://picsum.photos/420" },
    { id: 2, description: "tarea falsa 2", url: "http://picsum.photos/420" },
    { id: 3, description: "tarea falsa 3", url: "http://picsum.photos/420" },
  ];

  async function traerPosts() {
    //crea una referencia a la coleccion
    const coleccRef = collection(firestore, "Post");
    const posts = [];
    const querySnapshot = await getDocs(coleccRef);
    querySnapshot.forEach((doc) => {
      posts.push(doc.data());
    });
    return posts;
  }

  useEffect(() => {
    async function traerColl() {
      const postsObtenidos = await traerPosts();
      setArrayPosts(postsObtenidos);
    }
    traerColl();
  }, []);

  return (
    <Container>
      <h4>Hola, sesión iniciada</h4>
      <Button onClick={() => signOut(auth)}>Cerrar sesion</Button>
      <hr />
      <AgregarPost
        arrayPosts={arrayPosts}
        correoUsuario={correoUsuario}
        setArrayPosts={setArrayPosts}
      />
      {arrayPosts ? <NewsFeed arrayPosts={arrayPosts} /> : null}
    </Container>
  );
};

export default Home;
