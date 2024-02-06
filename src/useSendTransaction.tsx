import React, { useState, useContext } from "react";
import { LoginContext } from "./LoginContext";
import to from "await-to-js";

export function useSendTransaction() {
  const [state, setState] = useContext(LoginContext);

  if (state.xswd === undefined) return [null]

  async function sendTransaction(data) {
    console.log(data);
    const response = await state.xswd.wallet.transfer(data);
    console.log("response", response);
    return response.result.txid;
  }

  return [sendTransaction];
}