import React, { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { IoMdCopy } from "react-icons/io";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import SendMe from "../components/Actions/SendMe";
import Modal from "../components/UI/Modal";
import classes from "./SendMeHu.module.css";
import {
  formatAddress,
  formatAmountToBalance,
  linkToText,
} from "../utils/walletUtils";
import Error404 from "../components/Errors/Error404";

const SendMeHu = ({ withAmount = false }) => {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [action, setAction] = useState("");

  const paramDesc = searchParams.get("desc");

  const beneficiaryAddress = params.shareId;

  const beneficiaryName = params.name || "Anonymous";

  const desc = paramDesc ? linkToText(paramDesc) : "";

  const amount = params.amount;

  console.log("AmounttoSend", amount);
  console.log("Typeof AmounttoSend", typeof amount);

  const showModalHandler = () => {
    setAction("send-me");
  };

  const exitModalHandler = () => {
    setAction("");
  };

  if (!(!Number(amount) || amount.trim() !== "") || Number(amount) <= 0 || !beneficiaryAddress ) {
    return (
      <div>
        <Header />
        <div className={classes["send-me-hu-main"]}>
          <Error404 />
        </div>
        <Footer />
      </div>
    );
  }

  // if ((Number(amount) <= formatAmountToBalance(balance))) {

  // }

  return (
    <section className={classes["send-me-hu"]}>
      <Header />
      <div className={classes["send-me-hu-main"]}>
        <h1 className={classes.title}>
          Send <span>{beneficiaryName}</span> Hu
        </h1>
        <h3 className={classes.desc}>{desc || "No Description"}</h3>
        <div className={classes["pub-address"]}>
          <p className={classes["pub-address-text"]}>
            {formatAddress(beneficiaryAddress)}
          </p>
          <div className={classes["pub-address-copy"]}>
            <IoMdCopy />
          </div>
        </div>

        {amount && (
          <div className={classes.amount}>
            {formatAmountToBalance(amount)} HUC
          </div>
        )}

        <button className={classes["alright"]} onClick={showModalHandler}>
          Alright
        </button>

        {!!action && (
          <Modal>
            <div className={classes["exit-modal"]} onClick={exitModalHandler}>
              &times;
            </div>
            <SendMe
              withAmount={withAmount}
              beneficiaryAddress={beneficiaryAddress}
              beneficiaryName={beneficiaryName}
              desc={desc}
              amount={amount}
              onExitModal={exitModalHandler}
            />
          </Modal>
        )}
      </div>

      <Footer />
    </section>
  );
};

export default SendMeHu;
