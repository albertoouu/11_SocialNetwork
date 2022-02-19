import React from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import firebaseApp from "../credenciales";
import { getFirestore, addDoc, collection, getDocs } from "firebase/firestore";
const firestore = getFirestore(firebaseApp);

const AgregarPost = ({ correoUsuario, arrayPosts, setArrayPosts }) => {
  async function newPost(e) {
    e.preventDefault();
    const title = e.target.formTitle.value;
    const subheader = e.target.formSubheader.value;
    const author = correoUsuario;
    const content = e.target.formContent.value;
    const cardcontent = e.target.formCardcontent.value;
    const collecRef = collection(firestore, "Post");
    try {
      const docRef = await addDoc(collecRef, {
        title,
        subheader,
        author,
        content,
        cardcontent,
        Date: new Date(),
      });
    } catch (e) {
      console.log("Error adding document", e);
    }
    const posts = [];
    const querySnapshot = await getDocs(collecRef);
    querySnapshot.forEach((doc) => {
      posts.push(doc.data());
    });
    setArrayPosts(posts);
    e.target.reset();
  }

  return (
    <Container className="mt-5">
      <Form onSubmit={newPost} id="formre">
        <Form.Control
          className="mb-3"
          type="text"
          placeholder="Titulo"
          id="formTitle"
        />
        <Form.Control
          className="mb-3"
          type="text"
          placeholder="Subtitulo"
          id="formSubheader"
        />
        <Form.Control
          className="mb-3"
          as="textarea"
          rows={3}
          placeholder="Content"
          id="formContent"
        />
        <Form.Control
          className="mb-3"
          as="textarea"
          rows={3}
          placeholder="Cardcontent"
          id="formCardcontent"
        />

        <Button type="submit">New Post</Button>

        <hr />
      </Form>
    </Container>
  );
};

export default AgregarPost;
