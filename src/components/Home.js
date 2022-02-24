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

import AgregarPost from "./AgregarPost";
import NewsFeed from "./NewsFeed";
import PerfilSection from "./PerfilSection";
import ResponsiveAppBar from "./AppBar"
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

const Home = ({ correoUsuario, userPhoto, userNombre }) => {
  const [arrayPosts, setArrayPosts] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const fakeData = {
    email: "albertoouu@gmail.com",
    nickname: "albertoouu",
    photo: "http://picsum.photos/200",
  };

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
        email: idDocumento,
        nickname: "por defecto", // arreglar que cuando sea usuario de google se guarde su foto
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
      const infoUser = await buscarDocumentoOCrearDocumento(correoUsuario);
      setUserInfo(infoUser);
      console.log(infoUser);
    }
    traerColl();
  }, []);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (

    <Container>
      <ResponsiveAppBar />
      <Grid container spacing={2} className="mt-5" >
        <Grid item xs={2}>
        </Grid>
        <Grid item xs={7}>
          <AgregarPost
            arrayPosts={arrayPosts}
            correoUsuario={correoUsuario}
            setArrayPosts={setArrayPosts}
          />
          {arrayPosts ? (
            <NewsFeed
              arrayPosts={arrayPosts}
              correoUsuario={correoUsuario}
              setArrayPosts={setArrayPosts}
              userPhoto={userPhoto}
              userNombre={userNombre}
            />
          ) : null}
        </Grid>
        <Grid item xs={3}>
          {userInfo ? (
            <PerfilSection
              correoUsuario={correoUsuario}
              userInfo={userInfo}
              userPhoto={userPhoto}
              userNombre={userNombre}
            />
          ) : null}
        </Grid>
      </Grid>



    </Container>
  );
};

export default Home;