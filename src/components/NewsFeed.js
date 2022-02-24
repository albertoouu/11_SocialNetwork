import React from "react";
import firebaseApp from "../credenciales";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import FormDialog from "./modal";
import Card from "./Card"
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'


const firestore = getFirestore(firebaseApp);

const NewsFeed = ({ arrayPosts, correoUsuario, setArrayPosts, userPhoto, userNombre }) => {
  const sortedarray = arrayPosts.slice().sort((a, b) => b.Date - a.Date);
  let eliminarPost = async (id) => {
    //crear nuevo Array
    const nuevoArray = sortedarray.filter((obj) => obj.id !== id);
    console.log(id);
    console.log(nuevoArray);
    //Actualizar base de datos
    await deleteDoc(doc(firestore, "Post", id));
    //Actualizar state
    setArrayPosts(nuevoArray);
  };

  return (
    <>
      {sortedarray.map((obj) => {
        return (
          <div key={obj.Date} >
            <Card obj={obj} arrayPosts={arrayPosts} setArrayPosts={setArrayPosts} correoUsuario={correoUsuario} />
          </div>
        )
      })}
    </>
  );
};

export default NewsFeed;
