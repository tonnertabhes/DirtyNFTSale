import React, { useState } from "react";

const LoginContext = React.createContext([{}, () => {}]);
//const walletListCookie = Cookies.get('walletList');

function getWalletItemsFromLocalStorage() {
  const walletItems = [];
  const pattern = /^wallet-[\w\s]+$/;

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (pattern.test(key)) {
      const walletItem = JSON.parse(localStorage.getItem(key));
      walletItems.push(walletItem);
    }
  }

  return walletItems;
}

let walletList = [{ name: "RPC", open: true }];

walletList = walletList.concat(getWalletItemsFromLocalStorage());

const LoginProvider = (props) => {
  const [state, setState] = useState({
    activeWallet: 0,
    walletList: walletList,
    daemon: "rpc",
    saleSCID:
      "a5734183baaa1bd440febb933253cf02daf7c3c651577acbddc32d7d1c3ca9ef",
    lottoSCID:
      "89940f899cd7a358421e68d23abf96641f25009a143eb8ee0b13c6411d70d4ab",
  });
  return (
    <LoginContext.Provider value={[state, setState]}>
      {props.children}
    </LoginContext.Provider>
  );
};

export { LoginContext, LoginProvider };
