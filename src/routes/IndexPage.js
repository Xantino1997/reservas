import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./stylesPages/IndexPage.css";
import { Container, Row, Col, Nav, Tab, Carousel, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import HeaderVideo from "./HeaderVideo";
import LikesDislikes from "./LikesDislikes";
import Footer from "../Footer";

import viaje1 from "../assets/viaje1.png";
import viaje2 from "../assets/viaje2.png";
import viaje3 from "../assets/viaje3.png";
import Secondviaje1 from "../assets/SecondViaje1.png";
import Secondviaje2 from "../assets/SecondViaje2.png";
import Secondviaje3 from "../assets/SecondViaje3.png";

import hotel1 from "../assets/hotel1.png";
import hotel2 from "../assets/hotel2.png";
import hotel3 from "../assets/hotel3.png";
import Secondhotel1 from "../assets/Secondhotel1.png";
import Secondhotel2 from "../assets/Secondhotel2.png";
import Secondhotel3 from "../assets/Secondhotel3.png";


function IndexPage() {
  // Función para generar las estrellas en función del puntaje
  function renderStars(rating) {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
  
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FontAwesomeIcon icon={faStar} className="star" key={i} />
      );
    }
  
    if (halfStar) {
      stars.push(
        <FontAwesomeIcon icon={faStarHalf} className="star half-blue" key="half" />
      );
    }
  
    const emptyStars = 5 - (fullStars + (halfStar ? 1 : 0));
  
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FontAwesomeIcon icon={faStar} className="star empty-star" key={`empty-${i}`} />
      );
    }
  
    return <div className="star-rating">{stars}</div>;
  }
  

  function renderCarouselItems(images, ratings) {
    return images.map((image, index) => (
      <Carousel.Item key={index}>
        <img className="d-block w-100" src={image.src} alt={image.alt} />
        <Card.Text className="text-center rating">
          {renderStars(ratings[index])}
        </Card.Text>
      </Carousel.Item>
    ));
  }

  // Datos de ejemplo para destinos y hoteles
  const destinosImages = [
    { src: viaje1, alt: "Destino 1" },
    { src: viaje2, alt: "Destino 2" },
    { src: viaje3, alt: "Destino 3" },
  ];

  const destinosRatings = [4.5, 5, 4];
  
  const hotelesImages = [
    { src: hotel1, alt: "Hotel 1" },
    { src: hotel2, alt: "Hotel 2" },
    { src: hotel3, alt: "Hotel 3" },
  ];

  const hotelesRatings = [4.5, 5, 3.5]; 

  const destinosImages2 = [
    { src: Secondviaje1, alt: "Destino 1" },
    { src: Secondviaje2, alt: "Destino 2" },
    { src: Secondviaje3, alt: "Destino 3" },
  ];

  const destinosRatings2 = [4.5, 5, 4.5];
  
  const hotelesImages2 = [
    { src: Secondhotel1, alt: "Hotel 1" },
    { src: Secondhotel2, alt: "Hotel 2" },
    { src: Secondhotel3, alt: "Hotel 3" },
  ];

  const hotelesRatings2 = [4.0, 5, 4.5];

  return (
    <>
      <div className="container-viajes">
        <div className="overlay">
          <div className="content">
            <div className="header-video">
              {/* <HeaderVideo /> */}
            </div>
            <h1 className="main-title"><q>Tu viaje empieza hoy</q></h1>
          </div>
        </div>
        <div className="container-carrousel">
          <Container>
            <Row>
              <Col>
                <h1 className="section-title">Viajes y Turismo</h1>
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                  <Row className="columna-1">
                    <Col className="columna-2" sm={3}>
                      <Nav variant="pills">
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
                          <div className="container-carrousel">
                            <Carousel>
                              {renderCarouselItems(
                                destinosImages,
                                destinosRatings,

                              )}
                            </Carousel>
                            <LikesDislikes/>

                          </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                          <div className="container-carrousel">
                            <Carousel>
                              {renderCarouselItems(
                                destinosImages2,
                                destinosRatings2
                              )}
                            </Carousel>
                            <LikesDislikes/>
                          </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="third">
                          <div className="container-carrousel">
                            <Carousel>
                              {renderCarouselItems(
                                destinosImages,
                                destinosRatings
                              )}
                            </Carousel>
                            <LikesDislikes/>
                          </div>
                        </Tab.Pane>
                        {/* ... Otras pestañas de destino ... */}
                      </Tab.Content>
                    </Col>
                  </Row>
                </Tab.Container>
              </Col>
              <Col>
                <Tab.Container id="right-tabs-example" defaultActiveKey="first">
                  <Row className="columna-1">
                    <h1 className="section-title">Hoteles</h1>
                    <Col className="columna-2" sm={3}>
                      <Nav variant="pills">
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
                    <Col sm={9}>
                      <Tab.Content>
                        <Tab.Pane eventKey="first">
                          <div className="container-carrousel">
                            <Carousel>
                              {renderCarouselItems(
                                hotelesImages,
                                hotelesRatings
                              )}
                            </Carousel>
                            <LikesDislikes/>
                          </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                          <div className="container-carrousel">
                            <Carousel>
                              {renderCarouselItems(
                                hotelesImages2,
                                hotelesRatings2
                              )}
                            </Carousel>
                            <LikesDislikes/>
                          </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="third">
                          <div className="container-carrousel">
                            <Carousel>
                              {renderCarouselItems(
                                hotelesImages,
                                hotelesRatings
                              )}
                            </Carousel>
                            <LikesDislikes/>
                          </div>
                        </Tab.Pane>
                        {/* ... Otras pestañas de hoteles ... */}
                      </Tab.Content>
                    </Col>
                  </Row>
                </Tab.Container>
              </Col>
            </Row>
          </Container>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default IndexPage;
