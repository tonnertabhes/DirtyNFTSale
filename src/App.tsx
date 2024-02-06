import { useContext, useRef, useEffect, useState } from "react";
import "./App.css";
import Episode from "./components/Episode";
import EpisodeGrid from "./components/EpisodeGrid";
import ListEpisode from "./components/ListEpisode";
import { LoginContext } from "./LoginContext";
import DeroBridgeApi from "dero-rpc-bridge-api";
import to from "await-to-js";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useRPCWallet } from "./useRPCWallet";
import { Tab, Tabs } from "react-bootstrap";
import Lottery from "./components/Lottery";
import XSWDConnect from "./components/xswdconnect";

function App() {
  const [state, setState] = useContext(LoginContext);
  const deroBridgeApiRef = useRef();
  const [walletInfo, isLoading, error, fetchWalletInfo] = useRPCWallet();
  const [key, setKey] = useState("buy");

  useEffect(() => {
    const load = async () => {
      deroBridgeApiRef.current = new DeroBridgeApi();
      const deroBridgeApi = deroBridgeApiRef.current;

      const [err] = await to(deroBridgeApi.init());
      if (err) {
        return;
      } else {
        setState((state) => ({ ...state, deroBridgeApiRef: deroBridgeApiRef }));
      }
    };

    window.addEventListener("load", load);
    return () => window.removeEventListener("load", load);
  }, []);

  useEffect(() => {
    fetchWalletInfo();
  }, [state.deroBridgeApiRef]);

  const assetArray = [
    {
      name: "Dirty Dero Daily #25 -- Slixe",
      video:
        "@apollo5ever:1/dirty_dero_daily_E01:5?r=HWkqSMMXFY8ojKTyy7N9xPX5gSa36B9d",
      price: 3500000,
    },
  ];

  const url =
    "https://odysee.com/@apollo5ever:1/DDD_24_Slixe:8?r=HWkqSMMXFY8ojKTyy7N9xPX5gSa36B9d";

  return (
    <>
      <Container>
        <XSWDConnect />
        <Row>
          <h1>The Dirty Dero Daily NFT Collection</h1>
        </Row>
        <Row>
          <h2>Welcome to the Official Dirty Dero Daily NFT Minting Page!</h2>
          <p>
            Once season 1 (52 episodes) is complete, I will apply to list on
            DeroNFTS.com
          </p>
          <h3>How the NFT Changes Your Life</h3>
          <ul>
            <li>You will receive a Christmas card</li>
            <li>You will be invited to a discord server</li>
            <li>
              Your favorite podcast will have more resources with which to win
              the hearts and minds
            </li>
            <li>Your experience of the podcast will vastly improve</li>
            <li>Your orientation will shift closer to the highest good</li>
            <li>When we interview Joe Rogan your NFT will 100x</li>
            <li>Your favorite guests will get a little gift from you &lt;3</li>
            <li>apollo will keep thinking of new ways to thank you forever</li>
            <li>
              You are entered into a lottery every time there's a new episode
            </li>
          </ul>
        </Row>
      </Container>

      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="buy" title="Buy">
          <div style={{ marginTop: "20px" }}>
            <EpisodeGrid />
          </div>
        </Tab>
        <Tab eventKey="lottery" title="Lottery">
          <div style={{ marginTop: "20px" }}>
            <Lottery />
          </div>
        </Tab>
      </Tabs>
    </>
  );
}

export default App;
