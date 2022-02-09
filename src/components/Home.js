import React, { useState, useEffect } from "react";

import firebaseApp from "../credenciales";
import { getAuth, signOut } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

import { Button, Container } from "react-bootstrap";
import AgregarPost from "./AgregarPost";
import NewsFeed from "./NewsFeed";
import PerfilSection from "./PerfilSection";

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

const Home = ({ correoUsuario }) => {
  const [arrayPosts, setArrayPosts] = useState(null);

  const fakeData = [
    {
      email: "albertoouu@gmail.com",
      nickname: "albertoouu",
      photo: "http://picsum.photos/200",
    },
  ];

  async function buscarDocumentoOCrearDocumento(idDocumento) {
    //crear refernecia al documento
    const docuRef = doc(firestore, `Users/${idDocumento}`);
    //Buscar documento
    const consulta = await getDoc(docuRef);
    //revisar si existe
    if (consulta.exists()) {
      //si si existe
      const infoDocu = consulta.data();
      return infoDocu;
    } else {
      //si no existe
      await setDoc(docuRef, {
        email: "por defecto",
        nickname: "por defecto",
        photo: "http://picsum.photos/200",
      });
      const consulta = await getDoc(docuRef);
      const infoDocu = consulta.data();
      return infoDocu;
    }
  }

  async function traerPosts() {
    //crea una referencia a la coleccion
    const coleccRef = collection(firestore, "Post");
    const posts = [];
    const querySnapshot = await getDocs(coleccRef);
    querySnapshot.forEach((doc) => {
      let post = doc.data();
      post.id = doc.id;
      posts.push(post);
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
      <PerfilSection correoUsuario={correoUsuario} userInfo={fakeData} />
      {arrayPosts ? (
        <NewsFeed
          arrayPosts={arrayPosts}
          correoUsuario={correoUsuario}
          setArrayPosts={setArrayPosts}
        />
      ) : null}
    </Container>
  );
};

export default Home;
