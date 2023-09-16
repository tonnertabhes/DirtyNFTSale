// Episode.js

import React, { useContext, useState } from "react";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useSendTransaction } from "../useSendTransaction";
import "./Episode.css";
import { Ratio } from "react-bootstrap";
import { LoginContext } from "../LoginContext";

export default function Episode({
  name,
  video,
  description,
  status,
  price,
  release,
  image,
  bigfoot,
  deepvoice,
  guests,
  scid,
}) {
  const [sendTransaction] = useSendTransaction();
  const [showModal, setShowModal] = useState(false);
  const [state, setState] = useContext(LoginContext);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const buy = () => {
    console.log("state", state);
    sendTransaction({
      scid: "d21b385d0dacea1637aa940f97421e93dabdaf864ad6bf6aef86985edccd1d83",
      transfers: [
        {
          destination: state.randomAddress,
          burn: price,
        },
      ],
      sc_rpc: [
        {
          name: "entrypoint",
          datatype: "S",
          value: "BuyNFT",
        },
        {
          name: "scid",
          datatype: "S",
          value: scid,
        },
        {
          name: "recipient",
          datatype: "S",
          value: state.walletList[0].address,
        },
      ],
    });
  };

  return (
    <>
      <Card
        style={{ width: "24rem", margin: "1rem", height: "36rem" }}
        bg="dark"
        text="white"
      >
        <Ratio aspectRatio="1x1">
          <Card.Img
            style={{ "object-fit": "cover" }}
            variant="top"
            src={image}
          />
        </Ratio>

        <Card.Body className="position-relative">
          <Card.Title>{name}</Card.Title>
          <Card.Link
            className="position-absolute bottom-0 end-o mb-3 me-3"
            href="#"
            onClick={handleShow}
          >
            See More
          </Card.Link>
          <div className="position-absolute bottom-0 end-0 mb-3 me-3">
            {status ? (
              "Already Purchased"
            ) : (
              <Button onClick={buy} variant="primary">
                Buy Now({price / 100000} Dero)
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe
            title="Video"
            width="560"
            height="315"
            src={`https://odysee.com/$/embed/${video}`}
            allowFullScreen
            loading="lazy"
          ></iframe>
          <p>{release}</p>
          <p>{description}</p>
          <p>Bigfoot: {bigfoot ? "True" : "False"}</p>
          <p>Deep Voice: {deepvoice ? "True" : "False"}</p>
          <p>Guests: {guests.map((x) => x + " ")}</p>
          <p>SCID:{scid}</p>

          {/* Add more content as needed */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={buy} variant="primary">
            Buy Now ({price / 100000} Dero)
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
