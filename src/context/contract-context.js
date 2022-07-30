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


  /**
   * useEffect/setup - Setup the contract and get user Address using the handler()
   * provided by the bunzz sdk
   * thus runs once
   */
  useEffect(() => {
    const setup = async () => {
        // console.log("ran setup");
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

  // check if contract is still connected once it changes state
  useEffect(() => {
    if (contract) {
      setConnected(true)
    }
  }, [contract])

  // console.log("balance", balance)
  // console.log("typeof balance", typeof balance)

  // get Contract Balance
  const getBalance = async () => {
    // console.log("getting balance")
    if (!!userAddress && !!contract && !balance) {
      let bo = await contract
        .balanceOf(userAddress)
        // .then((res) => {
        //   console.log("balance res", res)
        //   return res.data;
        // })
        // .catch((err) => {
        //   console.log(err);
        //   return balance;
        // });

        // console.log("bo", bo)
        if (!bo) {
          bo = balance
        }

      setBalance(bo);
    }
  };

  /**
   * useEffect/getBalanceFirst - Get Balance anytime the contract state changes
   */
  useEffect(() => {
    const getBalanceFirst = async () => {
      // console.log("getting balance");
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
