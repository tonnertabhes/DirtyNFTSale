import { useContext, useRef, useEffect } from "react";
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

function App() {
  const [state, setState] = useContext(LoginContext);
  const deroBridgeApiRef = useRef();
  const [walletInfo, isLoading, error, fetchWalletInfo] = useRPCWallet();

  useEffect(() => {
    const load = async () => {
      deroBridgeApiRef.current = new DeroBridgeApi();
      const deroBridgeApi = deroBridgeApiRef.current;

      const [err] = await to(deroBridgeApi.init());
      if (err) {
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
        <Row>
          <h1>The Dirty Dero Daily NFT Collection</h1>
        </Row>
        <Row>
          <h2>Welcome to the Official Dirty Dero Daily NFT Minting Page!</h2>
          <p>
            Once season 1 (52 episodes) is complete, I will apply to list on
            DeroNFTS.com
          </p>
          <h3>Perks for Holders</h3>
          <ul>
            <li>
              Holders of these NFTs will be entered in the Official Dirty Dero
              Daily Christmas Card Recipient List! (yes I'm serious)
            </li>
            <li>Holders gain access to private club</li>
          </ul>

          <h3>Proceeds will:</h3>
          <ul>
            <li>help apollo evade homelessness</li>
            <li>
              improve the quality of the show thereby making you a millionaire
            </li>
            <li>be shared with guests</li>
          </ul>
        </Row>
      </Container>

      <EpisodeGrid />
    </>
  );
}

export default App;
