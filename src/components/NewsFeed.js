import React from "react";
import { Stack, Container, Row, Col, Button } from "react-bootstrap";

const NewsFeed = ({ arrayPosts }) => {
  const sortedarray = arrayPosts.slice().sort((a, b) => b.Date - a.Date);
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
            </div>
          );
        })}
      </Stack>
    </Container>
  );
};

export default NewsFeed;
