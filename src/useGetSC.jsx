import { LoginContext } from "./LoginContext";
import { useContext } from "react";
import to from "await-to-js";

export function useGetSC() {
  const [state, setState] = useContext(LoginContext);
  if (state.xswd === undefined) return [null]
  async function getSC(
    scid,
    code,
    variables,
    topoheight,
    keysuint64,
    keysstring,
    keysbytes
  ) {
    const response = await state.xswd.node.GetSC({
      scid: scid,
      code: code,
      variables: variables,
      topoheight: topoheight,
      keysuint64: keysuint64,
      keysstring: keysstring,
      keysbytes: keysbytes,
    });
    console.log(response);
    return response.result;}

  return [getSC];
}

