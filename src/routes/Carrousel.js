import { Container, Row, Col, Nav, Tab, Carousel, Card } from "react-bootstrap";
import imagen from "../assets/user.png";
import viaje1 from "../assets/viaje1.png";
import viaje2 from "../assets/viaje2.png";
import viaje3 from "../assets/viaje3.png";

export default function Carrousel(){
    return(
        <div className="container-carrousel">
        <Container>
          <Row>
            <Col>
              <h1 className="section-title">Viajes y Turismo</h1>
              <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                  <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                      <Nav.Item>
                        <Nav.Link eventKey="first">Destino 1</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">Destino 2</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="third">Destino 3</Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col sm={9}>
                    <Tab.Content>
                      <Tab.Pane eventKey="first">
                        <Carousel>
                          <Carousel.Item>
                            <img
                              className="d-block w-100"
                              src={viaje1}
                              alt="Destino 1"
                            />
                            <Card.Text className="text-center">
                              <span className="rating">4.3</span> pts
                            </Card.Text>
                          </Carousel.Item>
                          <Carousel.Item>
                            <img
                              className="d-block w-100"
                              src={viaje2}
                              alt="Destino 1"
                            />
                            <Card.Text className="text-center">
                              <span className="rating">4.3</span> pts
                            </Card.Text>
                          </Carousel.Item>
                          <Carousel.Item>
                            <img
                              className="d-block w-100"
                              src={viaje3}
                              alt="Destino 1"
                            />
                            <Card.Text className="text-center">
                              <span className="rating">4.3</span> pts
                            </Card.Text>
                          </Carousel.Item>
                          {/* Agrega más elementos del carrusel aquí */}
                        </Carousel>
                      </Tab.Pane>
                      {/* Agrega más pestañas de destino aquí */}
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </Col>
            <Col>
              <h1 className="section-title">Hoteles</h1>
              <Tab.Container id="right-tabs-example" defaultActiveKey="first">
                <Row>
                  <Col sm={9}>
                    <Tab.Content>
                      <Tab.Pane eventKey="first">
                        <Carousel>
                          <Carousel.Item>
                            <img
                              className="d-block w-100 imagen-viaje"
                              src={viaje1}
                              alt="Hotel 1"
                            />
                            <Card.Text className="text-center">
                              <span className="rating">4.5</span> pts
                            </Card.Text>
                          </Carousel.Item>
                          <Carousel.Item>
                            <img
                              className="d-block w-100 imagen-viaje"
                              src={viaje2}
                              alt="Hotel 1"
                            />
                            <Card.Text className="text-center">
                              <span className="rating">4.5</span> pts
                            </Card.Text>
                          </Carousel.Item>
                          <Carousel.Item>
                            <img
                              className="d-block w-100 imagen-viaje"
                              src={viaje3}
                              alt="Hotel 1"
                            />
                            <Card.Text className="text-center">
                              <span className="rating">4.5</span> pts
                            </Card.Text>
                          </Carousel.Item>
                          {/* Agrega más elementos del carrusel aquí */}
                        </Carousel>
                      </Tab.Pane>
                      {/* Agrega más pestañas de hoteles aquí */}
                    </Tab.Content>
                  </Col>
                  <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                      <Nav.Item>
                        <Nav.Link eventKey="first">Hotel 1</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">Hotel 2</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="third">Hotel 3</Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                </Row>
              </Tab.Container>
            </Col>
          </Row>
        </Container>
        </div>
    )
}