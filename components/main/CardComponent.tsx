import React from 'react'
import { Card, Grid, Row, Text } from "@nextui-org/react";

const CardComponent = () => {
  const list = [
    {
      title: "Orange",
      price: "$5.50",
    },
  ];


  return (
    <Grid.Container gap={2}>
      {list.map((item, index) => (
        <Grid sm={3} key={index}>
          <Card isPressable>
            <Card.Body css={{ p: 0 }}>
              <Card.Image
                src={"/images/team/nitesh.jpeg" }
                objectFit="cover"
                width="100%"
                height={140}
                alt={item.title}
              />
            </Card.Body>
            <Card.Footer css={{ justifyItems: "flex-start" }}>
              <Row wrap="wrap" justify="space-between" align="center">
                <Text b>{item.title}</Text>
                
              </Row>
            </Card.Footer>
          </Card>
        </Grid>
      ))}
    </Grid.Container>
  );
};

export default CardComponent;