import { useState, useContext } from "react";
// import init from "./bunzz";
import ContractContext from "./context/contract-context";
import "./App.css";
import SendFundsForm from "./components/SendFunds/SendFundsForm";
import TrxHistory from "./components/History/TrxHistory";



const App = () => {
  const contractCtx = useContext(ContractContext);
  const [value, setValue] = useState(0);
  
  const contract = contractCtx.contract;
  const userAddress = contractCtx.userAddress;


  const handleChange = (e) => setValue(e.target.value);

  const submit = async () => {
    await contract.mint(userAddress, value)
      .then(data => {
        console.log(data);
        alert("Transaction was sent in success🎉");
      })
      .catch(err => console.log(err));
    

    const ts = await contract.totalSupply()
    const sym = await contract.symbol()
    const dec = await contract.decimals()
    const bo = await contract.balanceOf(userAddress);

    console.log(userAddress, ts, sym, dec, bo);
  };

  console.log(userAddress, value);

 
  

  return (
    <div className="App App-header">
      <p>You can mint your ERC20 if you're the owner</p>
      <input placeholder="0" onChange={handleChange} type="text" />
      <button onClick={submit}>mint</button>
      <SendFundsForm />
      <TrxHistory />
    </div>
  );
};

export default App;
