import React, { useContext } from "react";
import { useSendTransaction } from "../useSendTransaction";
import { LoginContext } from "../LoginContext";

export default function ListEpisode() {
  const [sendTransaction] = useSendTransaction();
  const [state, setState] = useContext(LoginContext);
  const list = (e) => {
    e.preventDefault();
    console.log(e.target.scid.value);
    console.log(state);
    sendTransaction({
      scid: "bca031c16218c8cf649b7bb9c3edba8f737972f721e11c20d7fe1c7d1d9faca1",
      transfers: [
        {
          scid: e.target.scid.value,
          burn: 1,
        },
      ],
      sc_rpc: [
        {
          name: "entrypoint",
          datatype: "S",
          value: "ListNFT",
        },
        {
          name: "scid",
          datatype: "S",
          value: e.target.scid.value,
        },
        {
          name: "price",
          datatype: "U",
          value: parseInt(e.target.price.value * 100000),
        },
      ],
    });
  };

  return (
    <form onSubmit={list}>
      <input id="scid" placeholder="scid" />
      <input id="price" type="number" placeholder="price" />
      <button type="submit">list</button>
    </form>
  );
}
