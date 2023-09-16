import { LoginContext } from "./LoginContext";
import { useContext } from "react";
import to from "await-to-js";

export function useGetSC() {
  const [state, setState] = useContext(LoginContext);
  async function getSC(scid) {
    const deroBridgeApi = state.deroBridgeApiRef.current;

    const [err, res] = await to(
      deroBridgeApi.daemon("get-sc", {
        scid: scid,
        variables: true,
      })
    );
    return res.data.result;

    /*  let data = JSON.stringify({
      jsonrpc: "2.0",
      id: "1",
      method: "DERO.GetSC",
      params: {
        scid: scid,
        code: false,
        variables: true,
      },
    });

    let res = await fetch(`https://dero-api.mysrv.cloud/json_rpc`, {
      method: "POST",

      body: data,
      headers: { "Content-Type": "application/json" },
    });
    let body = await res.json();
    let scData = body.result;
    console.log(`scData ${scid}`, scData);
    return scData; */
  }

  return [getSC];
}
