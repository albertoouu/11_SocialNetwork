import React from "react";
import { Stack, Container, Row, Col, Button } from "react-bootstrap";

const NewsFeed = ({ arrayPosts }) => {
  return (
    <Container>
      <Stack>
        {arrayPosts.map((obj) => {
          return (
            <>
              <h1>{obj.title}</h1>
              <h2>{obj.subheader}</h2>
              <h3>{obj.author}</h3>
              <p>{obj.content}</p>
              <p>{obj.cardcontent}</p>
            </>
          );
        })}
      </Stack>
    </Container>
  );
};

export default NewsFeed;
