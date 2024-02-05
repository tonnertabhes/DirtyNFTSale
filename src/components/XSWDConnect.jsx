import { Api, generateAppId } from "dero-xswd-api";
import React, { useContext, useState, useEffect } from "react";
import { LoginContext } from "../LoginContext";

export default function XSWDConnect() {
  const [state, setState] = useContext(LoginContext);
  const [connected, setConnected] = useState(false);

  const handleConnect = async () => {
    const name = "DirtyNFTSale";
    const appInfo = {
      id: await generateAppId(name),
      name,
      description: "Truly unstoppable",
    };
    const xswd = new Api(appInfo);
    xswd.config.ip = "127.0.0.1";
    console.log(xswd)
    await xswd.initialize();
    console.log(xswd)

    setState({ ...state, xswd: xswd });

    setConnected(true);
  };

  return (
    <button onClick={handleConnect}>
      {connected ? "Connected" : "Connect"}
    </button>
  );
}