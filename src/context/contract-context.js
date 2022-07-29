import React, { useState, useEffect } from "react";
import init from "../bunzz";

const ContractContext = React.createContext({
  contract: undefined,
  userAddress: "",
  connected: false,
  balance: "",
  getBalance: () => {},
});

export const ContractContextProvider = ({ children }) => {
  const [contract, setContract] = useState();
  const [userAddress, setUserAddress] = useState("");
  const [connected, setConnected] = useState(false);
  const [balance, setBalance] = useState("");

  useEffect(() => {
    const setup = async () => {
        console.log("ran setup");
      try {
        const handler = await init();

        const MODULE_NAME = "Token (ERC20)";
        const userAddress = await handler.getSignerAddress();
        const contract = await handler.getContract(MODULE_NAME);

        setUserAddress(userAddress);
        setContract(contract);
      } catch (error) {
        console.error(error);
      }
    };

    setup();
  }, []);

  useEffect(() => {
    if (contract) {
      setConnected(true)
    }
  }, [contract])

  const getBalance = async () => {
    if (!!userAddress && !!contract && !balance) {
      const bo = await contract
        .balanceOf(userAddress)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.log(err);
          return balance;
        });

      setBalance(bo);
    }
  };

  useEffect(() => {
    const getBalanceFirst = async () => {
      console.log("getting balance");
      const bo = await contract
        .balanceOf(userAddress)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.log(err);
          return balance;
        });

      setBalance(bo);
    };

    // get balance on page load
    if (!!userAddress && !!contract && !balance) {
      getBalanceFirst();
    }
  }, [userAddress, contract]);

  //   console.log(contract, typeof contract)

  // npx browserslist@latest --update-db
  return (
    <ContractContext.Provider
      value={{ contract: contract, userAddress: userAddress, balance: balance, connected: connected, getBalance: getBalance, }}
    >
      {children}
    </ContractContext.Provider>
  );
};

export default ContractContext;
