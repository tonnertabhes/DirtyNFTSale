import React, { useContext } from "react";
import Episode from "./Episode";
import { useGetSC } from "../useGetSC";
import { LoginContext } from "../LoginContext";
import hex2a from "../hex2a";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import dateString from "../dateString";

export default function EpisodeGrid() {
  const [getSC] = useGetSC();
  const [collection, setCollection] = React.useState([]);
  const [state, setState] = useContext(LoginContext);
  const [loading, setLoading] = React.useState(true);
  const [filterByAnimated, setFilterByAnimated] = React.useState(false);
  const [filterByMusic, setFilterByMusic] = React.useState(false);
  const [filterByBigfoot, setFilterByBigfoot] = React.useState(false);
  const [filterByDeepvoice, setFilterByDeepvoice] = React.useState(false);
  const [filterByGuests, setFilterByGuests] = React.useState([]);

  React.useEffect(() => {
    if (state.xswd === undefined) return
    async function get() {
      let c = await getSC(state.saleSCID, false, true);
      console.log("c", c);
      let epTest = new RegExp(`.*_sold`);
      let epkeys = Object.keys(c.stringkeys).filter((key) => epTest.test(key));
      let episodeList = [];
      for (var i = 0; i < epkeys.length; i++) {
        let scid = epkeys[i].substring(0, 64);
        let status = c.stringkeys[epkeys[i]];
        let price = c.stringkeys[`${scid}_price`];
        let e = await getSC(scid, false, true);
        let metadata = e.stringkeys.metadata;
        metadata = hex2a(metadata);

        let metadataobj = JSON.parse(metadata);
        episodeList.push({
          scid: scid,
          price: price,
          status: status,
          metadata: metadataobj,
        });
      }
      episodeList.sort((a, b) => a.metadata.id - b.metadata.id);
      setCollection(episodeList);
      setLoading(false); // Set loading to false once data is loaded
    }
    get();
  }, [state]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="mb-3">
        <Button
          variant={filterByAnimated ? "primary" : "outline-primary"}
          onClick={() => setFilterByAnimated(!filterByAnimated)}
        >
          Animated
        </Button>{" "}
        <Button
          variant={filterByMusic ? "primary" : "outline-primary"}
          onClick={() => setFilterByMusic(!filterByMusic)}
        >
          Music
        </Button>{" "}
        <Button
          variant={filterByBigfoot ? "primary" : "outline-primary"}
          onClick={() => setFilterByBigfoot(!filterByBigfoot)}
        >
          Bigfoot
        </Button>{" "}
        <Button
          variant={filterByDeepvoice ? "primary" : "outline-primary"}
          onClick={() => setFilterByDeepvoice(!filterByDeepvoice)}
        >
          Deepvoice
        </Button>{" "}
        <Button
          variant={
            filterByGuests.includes("SixOfClubs")
              ? "primary"
              : "outline-primary"
          }
          onClick={() => {
            if (filterByGuests.includes("SixOfClubs")) {
              setFilterByGuests(
                filterByGuests.filter((guest) => guest !== "SixOfClubs")
              );
            } else {
              setFilterByGuests([...filterByGuests, "SixOfClubs"]);
            }
          }}
        >
          Guests: SixOfClubs
        </Button>{" "}
        <Button
          variant={
            filterByGuests.includes("Hermes") ? "primary" : "outline-primary"
          }
          onClick={() => {
            if (filterByGuests.includes("Hermes")) {
              setFilterByGuests(
                filterByGuests.filter((guest) => guest !== "Hermes")
              );
            } else {
              setFilterByGuests([...filterByGuests, "Hermes"]);
            }
          }}
        >
          Guests: Hermes
        </Button>{" "}
        <Button
          variant={
            filterByGuests.includes("Azylem") ? "primary" : "outline-primary"
          }
          onClick={() => {
            if (filterByGuests.includes("Azylem")) {
              setFilterByGuests(
                filterByGuests.filter((guest) => guest !== "Azylem")
              );
            } else {
              setFilterByGuests([...filterByGuests, "Azylem"]);
            }
          }}
        >
          Guests: Azylem
        </Button>
        <Button
          variant={
            filterByGuests.includes("Bisounours")
              ? "primary"
              : "outline-primary"
          }
          onClick={() => {
            if (filterByGuests.includes("Bisounours")) {
              setFilterByGuests(
                filterByGuests.filter((guest) => guest !== "Bisounours")
              );
            } else {
              setFilterByGuests([...filterByGuests, "Bisounours"]);
            }
          }}
        >
          Guests: Bisounours
        </Button>{" "}
        <Button
          variant={
            filterByGuests.includes("G Desperado")
              ? "primary"
              : "outline-primary"
          }
          onClick={() => {
            if (filterByGuests.includes("G Desperado")) {
              setFilterByGuests(
                filterByGuests.filter((guest) => guest !== "G Desperado")
              );
            } else {
              setFilterByGuests([...filterByGuests, "G Desperado"]);
            }
          }}
        >
          Guests: G Desperado
        </Button>{" "}
        <Button
          variant={
            filterByGuests.includes("Little Duck")
              ? "primary"
              : "outline-primary"
          }
          onClick={() => {
            if (filterByGuests.includes("Little Duck")) {
              setFilterByGuests(
                filterByGuests.filter((guest) => guest !== "Little Duck")
              );
            } else {
              setFilterByGuests([...filterByGuests, "Little Duck"]);
            }
          }}
        >
          Guests: Little Duck
        </Button>{" "}
        <Button
          variant={
            filterByGuests.includes("CryptoJimi")
              ? "primary"
              : "outline-primary"
          }
          onClick={() => {
            if (filterByGuests.includes("CryptoJimi")) {
              setFilterByGuests(
                filterByGuests.filter((guest) => guest !== "CryptoJimi")
              );
            } else {
              setFilterByGuests([...filterByGuests, "CryptoJimi"]);
            }
          }}
        >
          Guests: CryptoJimi
        </Button>{" "}
        <Button
          variant={
            filterByGuests.includes("clapclap") ? "primary" : "outline-primary"
          }
          onClick={() => {
            if (filterByGuests.includes("clapclap")) {
              setFilterByGuests(
                filterByGuests.filter((guest) => guest !== "clapclap")
              );
            } else {
              setFilterByGuests([...filterByGuests, "clapclap"]);
            }
          }}
        >
          Guests: clapclap
        </Button>{" "}
        <Button
          variant={
            filterByGuests.includes("Kalina Lux")
              ? "primary"
              : "outline-primary"
          }
          onClick={() => {
            if (filterByGuests.includes("Kalina Lux")) {
              setFilterByGuests(
                filterByGuests.filter((guest) => guest !== "Kalina Lux")
              );
            } else {
              setFilterByGuests([...filterByGuests, "Kalina Lux"]);
            }
          }}
        >
          Guests: Kalina Lux
        </Button>{" "}
        <Button
          variant={
            filterByGuests.includes("secretnamebasis")
              ? "primary"
              : "outline-primary"
          }
          onClick={() => {
            if (filterByGuests.includes("secretnamebasis")) {
              setFilterByGuests(
                filterByGuests.filter((guest) => guest !== "secretnamebasis")
              );
            } else {
              setFilterByGuests([...filterByGuests, "secretnamebasis"]);
            }
          }}
        >
          Guests: secretnamebasis
        </Button>{" "}
        <Button
          variant={
            filterByGuests.includes("apple") ? "primary" : "outline-primary"
          }
          onClick={() => {
            if (filterByGuests.includes("apple")) {
              setFilterByGuests(
                filterByGuests.filter((guest) => guest !== "apple")
              );
            } else {
              setFilterByGuests([...filterByGuests, "apple"]);
            }
          }}
        >
          Guests: apple
        </Button>{" "}
        <Button
          variant={
            filterByGuests.includes("Labyrinth") ? "primary" : "outline-primary"
          }
          onClick={() => {
            if (filterByGuests.includes("Labyrinth")) {
              setFilterByGuests(
                filterByGuests.filter((guest) => guest !== "Labyrinth")
              );
            } else {
              setFilterByGuests([...filterByGuests, "Labyrinth"]);
            }
          }}
        >
          Guests: Labyrinth
        </Button>{" "}
        <Button
          variant={
            filterByGuests.includes("Yashnik") ? "primary" : "outline-primary"
          }
          onClick={() => {
            if (filterByGuests.includes("Yashnik")) {
              setFilterByGuests(
                filterByGuests.filter((guest) => guest !== "Yashnik")
              );
            } else {
              setFilterByGuests([...filterByGuests, "Yashnik"]);
            }
          }}
        >
          Guests: Yashnik
        </Button>{" "}
        <Button
          variant={
            filterByGuests.includes("CrypticNico")
              ? "primary"
              : "outline-primary"
          }
          onClick={() => {
            if (filterByGuests.includes("CrypticNico")) {
              setFilterByGuests(
                filterByGuests.filter((guest) => guest !== "CrypticNico")
              );
            } else {
              setFilterByGuests([...filterByGuests, "CrypticNico"]);
            }
          }}
        >
          Guests: CrypticNico
        </Button>{" "}
        <Button
          variant={
            filterByGuests.includes("hansen33") ? "primary" : "outline-primary"
          }
          onClick={() => {
            if (filterByGuests.includes("hansen33")) {
              setFilterByGuests(
                filterByGuests.filter((guest) => guest !== "hansen33")
              );
            } else {
              setFilterByGuests([...filterByGuests, "hansen33"]);
            }
          }}
        >
          Guests: hansen33
        </Button>{" "}
        <Button
          variant={
            filterByGuests.includes("JoyRaptor") ? "primary" : "outline-primary"
          }
          onClick={() => {
            if (filterByGuests.includes("JoyRaptor")) {
              setFilterByGuests(
                filterByGuests.filter((guest) => guest !== "JoyRaptor")
              );
            } else {
              setFilterByGuests([...filterByGuests, "JoyRaptor"]);
            }
          }}
        >
          Guests: JoyRaptor
        </Button>{" "}
        <Button
          variant={
            filterByGuests.includes("High Strangness")
              ? "primary"
              : "outline-primary"
          }
          onClick={() => {
            if (filterByGuests.includes("High Strangness")) {
              setFilterByGuests(
                filterByGuests.filter((guest) => guest !== "High Strangness")
              );
            } else {
              setFilterByGuests([...filterByGuests, "High Strangness"]);
            }
          }}
        >
          Guests: High Strangness
        </Button>{" "}
        <Button
          variant={
            filterByGuests.includes("The Objective Alpha")
              ? "primary"
              : "outline-primary"
          }
          onClick={() => {
            if (filterByGuests.includes("The Objective Alpha")) {
              setFilterByGuests(
                filterByGuests.filter(
                  (guest) => guest !== "The Objective Alpha"
                )
              );
            } else {
              setFilterByGuests([...filterByGuests, "The Objective Alpha"]);
            }
          }}
        >
          Guests: The Objective Alpha
        </Button>
      </div>
      <Container>
        <Row>
          {collection
            .filter(
              (x) =>
                x.scid !==
                  "dc4af325190db919f2d28c758a8e5df1365f8f2782c9b755f13501c2e113648e" &&
                x.scid !==
                  "f455a9e668d84e781474f78016a940a03024b9478a0b3595469441487a006597" &&
                x.scid !==
                  "9e7cf53c9c06402459457106b247020c5d13a50f2e63ffc2f2321aee70b537de"
            )
            .filter((x) => !filterByAnimated || x.metadata.attributes.animated)
            .filter((x) => !filterByMusic || x.metadata.attributes.music)
            .filter((x) => !filterByBigfoot || x.metadata.attributes.bigfoot)
            .filter(
              (x) => !filterByDeepvoice || x.metadata.attributes[`deep voice`]
            )
            .filter(
              (x) =>
                !filterByGuests.length ||
                filterByGuests.every((guest) =>
                  x.metadata.attributes.guests.includes(guest)
                )
            )
            .map((x) => (
              <Col key={x.scid}>
                <Episode
                  name={x.metadata.name}
                  price={x.price}
                  video={x.metadata.video}
                  description={x.metadata.description}
                  release={dateString(x.metadata.attributes.release)}
                  status={x.status}
                  image={x.metadata.image}
                  bigfoot={x.metadata.attributes.bigfoot}
                  deepvoice={x.metadata.attributes[`deep voice`]}
                  guests={x.metadata.attributes.guests}
                  scid={x.scid}
                  music={x.metadata.attributes.music}
                  animated={x.metadata.attributes.animated}
                />
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
}
