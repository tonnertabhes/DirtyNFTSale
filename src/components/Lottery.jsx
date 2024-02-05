import React, { useContext, useEffect, useState } from "react";
import { useGetSC } from "../useGetSC";
import { LoginContext } from "../LoginContext";
import { useSendTransaction } from "../useSendTransaction";
import Button from "react-bootstrap/Button";
import hex2a from "../hex2a";

export default function Lottery() {
  const [getSC] = useGetSC();
  const [sendTransaction] = useSendTransaction();
  const [state, setState] = useContext(LoginContext);
  const [contractData, setContractData] = useState({
    winner: {},
    treasury: {},
  });

  const claimWinnings = async (assetName) => {
    try {
      const assetParams = {
        scid: state.lottoSCID,
        ringsize: 2,
        transfers: [
          {
            burn: 1,
            scid: contractData.winner.scid,
          },
        ],
        sc_rpc: [
          {
            name: "entrypoint",
            datatype: "S",
            value: "Claim",
          },
          {
            name: "asset",
            datatype: "S",
            value: assetName !== "DERO" ? assetName : "",
          },
        ],
      };
      const assetResult = await sendTransaction(assetParams);
      console.log(assetResult);
    } catch (error) {
      console.error("Error claiming winnings:", error);
    }
  };

  useEffect(() => {
    if (state.xswd === undefined) return
    const fetchContractData = async () => {
      console.log("fetch");
      // Replace 'your-smart-contract-id' with the actual smart contract ID
      const contractData = await getSC(state.lottoSCID, false, true);

      // Log the contract data to the console for debugging
      console.log(contractData);

      // Extract the WINNER and TREASURY_* data
      const winnerId = contractData.stringkeys.WINNER;
      let winnerScid;
      if (winnerId)
        winnerScid = hex2a(contractData.stringkeys[`TICKET_${winnerId}`]);
      const winner = { id: winnerId, scid: winnerScid };

      const treasury = Object.keys(contractData.stringkeys)
        .filter((key) => key.startsWith("TREASURY_"))
        .reduce((obj, key) => {
          obj[key.substring("TREASURY_".length)] = contractData.stringkeys[key];
          return obj;
        }, {});
      console.log("treasury", treasury);
      console.log("winner", winner);
      setContractData({ winner, treasury });
    };

    fetchContractData();
  }, [state.deroBridgeApiRef]);

  return (
    <div className="container">
      <h1 className="text-center">LOTTO</h1>
      <p>
        "Step right up and behold the magnificent Dirty Dero Daily lottery!
        Brace yourself for the thrill of a lifetime as we draw the curtain on
        each episode. Behold, one of the illustrious Dirty Dero Daily NFTs shall
        emerge as the coveted winning lottery ticket. And if fortune favors you
        and you possess the winning NFT, prepare to revel in the glory of
        choice! Yes, dear participant, you shall have the honor of selecting a
        single prize from our treasure trove of wonders. And fear not, for your
        cherished NFT shall remain in your possession, a testament to your
        triumph! Join us now and let the games begin!"" --chatGPT (fact-checked
        by apollo)
      </p>
      <p className="text-center">
        Winning NFT: Dirty Dero Daily #{contractData.winner.id}
      </p>
      <h2 className="text-center">Prizes</h2>
      <div className="row justify-content-center">
        {Object.entries(contractData.treasury).map(([key, value]) => (
          <div className="col-6" key={key}>
            <div className="text-center">
              <p>
                {key}(atomic units): {value}
              </p>
              <Button onClick={() => claimWinnings(key)}>Claim {key}</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
