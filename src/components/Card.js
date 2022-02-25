import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import FormDialog from "./modal";

import firebaseApp from "../credenciales";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";

const firestore = getFirestore(firebaseApp);

export default function RecipeReviewCard({ obj, arrayPosts, setArrayPosts, correoUsuario }) {
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

  const letter = obj.author[0].toUpperCase()
  return (
    <Card sx={{ maxWidth: 1000 }} className='mb-3'>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {letter}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }

        title={obj.title}
        subheader={obj.author}
      />
      {obj.img ? (<CardMedia
        component="img"
        image={obj.img}
        alt="description Photo"
      />) : (null)}

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {obj.content}
        </Typography>
        <Typography variant='caption'>
          {obj.Date.toDate().toDateString()}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        {correoUsuario == obj.author ? (
          <>
            <FormDialog postId={obj.id} setArrayPosts={setArrayPosts} />
            <Button variant="contained" color="error" className='ms-3' onClick={() => eliminarPost(obj.id)}>
              delete
            </Button>
          </>
        ) : (null)}

      </CardActions>
    </Card>
  );
}
