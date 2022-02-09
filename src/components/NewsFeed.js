import React from "react";
import { Stack, Container, Button } from "react-bootstrap";
import firebaseApp from "../credenciales";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";

const firestore = getFirestore(firebaseApp);

const NewsFeed = ({ arrayPosts, correoUsuario, setArrayPosts }) => {
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
    <Container>
      <Stack>
        {sortedarray.map((obj) => {
          return (
            <div key={obj.Date}>
              <h1>{obj.title}</h1>
              <h2>{obj.subheader}</h2>
              <h3>{obj.author}</h3>
              <p>{obj.content}</p>
              <p>{obj.cardcontent}</p>
              {correoUsuario === obj.author ? (
                <Button onClick={() => eliminarPost(obj.id)}>
                  Eliminar Post
                </Button>
              ) : (
                <div>"no es su correo"</div>
              )}
            </div>
          );
        })}
      </Stack>
    </Container>
  );
};

export default NewsFeed;
