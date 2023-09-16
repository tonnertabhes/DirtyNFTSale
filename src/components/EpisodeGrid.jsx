import React, { useContext } from "react";
import Episode from "./Episode";
import { useGetSC } from "../useGetSC";
import { LoginContext } from "../LoginContext";
import hex2a from "../hex2a";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import dateString from "../dateString";

export default function EpisodeGrid() {
  const [getSC] = useGetSC();
  const [collection, setCollection] = React.useState([]);
  const [state, setState] = useContext(LoginContext);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!state.deroBridgeApiRef) return;
    async function get() {
      if (!state.deroBridgeApiRef) return;
      let c = await getSC(
        "a5734183baaa1bd440febb933253cf02daf7c3c651577acbddc32d7d1c3ca9ef"
      );
      console.log("c", c);
      let epTest = new RegExp(`.*_sold`);
      let epkeys = Object.keys(c.stringkeys).filter((key) => epTest.test(key));
      let episodeList = [];
      for (var i = 0; i < epkeys.length; i++) {
        let scid = epkeys[i].substring(0, 64);
        let status = c.stringkeys[epkeys[i]];
        let price = c.stringkeys[`${scid}_price`];
        let e = await getSC(scid);
        let metadata = e.stringkeys.metadata;
        metadata = hex2a(metadata);
        console.log("metadata ", scid, metadata);
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
  }, [state.deroBridgeApiRef]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Container>
        <Row>
          {collection.map((x) => (
            <Col>
              <Episode
                key={x.scid} // Add a unique key prop
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
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
