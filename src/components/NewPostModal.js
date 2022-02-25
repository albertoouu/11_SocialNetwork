import * as React from 'react';
import firebaseApp from "../credenciales";
import { getFirestore, addDoc, collection, getDocs } from "firebase/firestore";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp)

const Input = styled('input')({
  display: 'none',
});
let urlDescarga = ""

export default function NewPost({ sx, content, arrayPosts, correoUsuario, setArrayPosts, userPhoto, userNombre }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function newPost(e) {
    e.preventDefault();
    const title = e.target.title.value;
    const author = correoUsuario;
    const content = e.target.content.value;
    const collecRef = collection(firestore, "Post");
    try {
      const docRef = await addDoc(collecRef, {
        title,
        author,
        content,
        Date: new Date(),
        img: urlDescarga
      });
    } catch (e) {
      console.log("Error adding document", e);
    }
    const posts = [];
    const querySnapshot = await getDocs(collecRef);
    querySnapshot.forEach((doc) => {
      posts.push(doc.data());
    });
    setOpen(false);
    setArrayPosts(posts);
    e.target.reset();
  }

  async function fileHandler(e) {
    console.log("subir archivo")
    //detectar archivo
    const archivoLocal = e.target.files[0]
    //cargarlo a firebase storage
    const archivoRef = ref(storage, `documentos/${archivoLocal.name}`)
    console.log(archivoLocal)
    console.log(archivoRef)
    await uploadBytes(archivoRef, archivoLocal).then((snapshot) => {
      console.log('uploaded a blob or file')
    })
    //obtener url de descarga
    urlDescarga = await getDownloadURL(archivoRef)
    console.log(urlDescarga)
  }

  return (
    <div>
      <Button onClick={handleClickOpen} sx={sx} endIcon={<AddCircleOutlineIcon fontSize="large" />}>
        {content}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          onSubmit={newPost}
          autoComplete="off"
        >
          <div>
            <TextField
              required
              id="title"
              label="Title"
            />
          </div>
          <div>
            <TextField
              required
              id="content"
              label="Content"
              multiline
              rows={4}
            />
          </div>

          <Stack direction="row" alignItems="center" spacing={2}>
            <label htmlFor="icon-button-file">
              <Input accept="image/*" id="icon-button-file" type="file" onChange={fileHandler} />
              <IconButton color="primary" aria-label="upload picture" component="span">
                <PhotoCamera />
              </IconButton>
            </label>
            <Button type="submit">New Post</Button>
          </Stack>
        </Box>
      </Dialog>
    </div>
  );
}