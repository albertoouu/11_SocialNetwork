import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import Box from "@mui/material/Box";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import firebaseApp from '../credenciales';
import { getFirestore, doc, getDoc, updateDoc, getDocs, collection } from "firebase/firestore";

const firestore = getFirestore(firebaseApp)

export default function FormDialog({ postId, setArrayPosts }) {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState(null);
  const [subheader, setSubheader] = React.useState(null);
  const [content, setContent] = React.useState(null);
  const [cardcontent, setcardcontent] = React.useState(null);

  const handleClickOpen = async () => {
    await fetchPost(postId)
    setOpen(true);
  };

  const handleClose = async () => {
    //await updatePost()
    setOpen(false);
  };

  let fetchPost = async (postId) => {
    console.log(postId)
    const docRef = doc(firestore, `Post/${postId}`)
    const consulta = await getDoc(docRef)
    const info = consulta.data()
    console.log(info.title)
    setTitle(info.title)
    setSubheader(info.subheader)
    setContent(info.content)
    setcardcontent(info.cardcontent)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const title = e.target.title.value
    const subheader = e.target.subheader.value
    const content = e.target.content.value
    const cardcontent = e.target.cardcontent.value
    let DocRef = doc(firestore, "Post", postId)
    await updateDoc(DocRef, {
      title,
      subheader,
      content,
      cardcontent
    })
    const coleccRef = collection(firestore, "Post");
    const posts = [];
    const querySnapshot = await getDocs(coleccRef);
    querySnapshot.forEach((doc) => {
      let post = doc.data();
      post.id = doc.id;
      posts.push(post);
    });
    setArrayPosts(posts)
    setOpen(false);
  }
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose} onSubmit={handleSubmit}>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 1 }}
        >
          <DialogTitle>Edita tu post</DialogTitle>
          <DialogContent>
            <DialogContentText>
            </DialogContentText>

            <TextField
              autoFocus
              margin="dense"
              id="title"
              name="title"
              label="Texto"
              type="text"
              fullWidth
              variant="standard"
              defaultValue={title}
            />
            <TextField
              margin="dense"
              id="subheader"
              name="subheader"
              label="Texto"
              type="text"
              fullWidth
              variant="standard"
              defaultValue={subheader}
            />
            <TextField
              margin="dense"
              id="content"
              name="content"
              label="Texto"
              type="text"
              multiline
              rows={4}
              fullWidth
              variant="standard"
              defaultValue={content}
            />
            <TextField
              margin="dense"
              id="cardcontent"
              name="cardcontent"
              label="Texto"
              type="text"
              multiline
              rows={4}
              fullWidth
              variant="standard"
              defaultValue={cardcontent}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Edit</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}
