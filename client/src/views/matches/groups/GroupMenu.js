import React from "react";
import { Button, ButtonGroup, Container, Row, Col } from "reactstrap";

const GroupMenu = ({ categories, onCategorySelect }) => {
  return (
    <Container className="my-3 d-flex justify-content-center">
      <Row>
        <Col>
          <ButtonGroup className="flex-wrap d-flex justify-content-center">
            {categories.map((category, index) => (
              <Button
                key={index}
                color="warning"
                className="mb-2 mx-1"
                onClick={() => onCategorySelect(category)}
              >
                {category}
              </Button>
            ))}
          </ButtonGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default GroupMenu;
