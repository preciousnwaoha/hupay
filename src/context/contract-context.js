import React, { useState, useEffect } from "react";
import init from "../bunzz";

const ContractContext = React.createContext({
  contract: undefined,
  userAddress: "",
});

export const ContractContextProvider = ({ children }) => {
  const [contract, setContract] = useState();
  const [userAddress, setUserAddress] = useState("");

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

  //   console.log(contract, typeof contract)

  // npx browserslist@latest --update-db
  return (
    <ContractContext.Provider
      value={{ contract: contract, userAddress: userAddress }}
    >
      {children}
    </ContractContext.Provider>
  );
};

export default ContractContext;
