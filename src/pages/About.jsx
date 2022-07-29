import React, {useState} from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import classes from "./About.module.css";
import { formatAddress } from "../utils/walletUtils";

const About = () => {
  const [copiedEth, setCopiedEth] = useState(false);
  const [copiedBtc, setCopiedBtc] = useState(false);


  const copyHandler = (type) => {

    if (type === "eth") {
      navigator.clipboard.writeText("0x5a89D7585EE663c2CE410eEb7070C0749CEA7CA5");


        setCopiedEth(true)

        setTimeout(() => {
                  setCopiedEth(false)
        }, 3000);
    }

    if (type === "btc") {
      navigator.clipboard.writeText("bc1qlh2ry98c3an84vzugqm0r50wf24q9f2n4l0s3c");


        setCopiedBtc(true)

        setTimeout(() => {
                  setCopiedBtc(false)
        }, 3000);
    }
  }
  return (
    <div className={classes.about}>
      <Header />
      <h1 className={classes.title}>What&apos;s Hu</h1>
      <h3 className={classes.subtitle}>
        Hu is the only crypto wallet that allows you to make Unanonymous Transactions on the
        Blockchain and Create Payments Links to recieve Crypto for yourself,
        your brand, or your business
      </h3>

      <div className={classes.analogies}>
        <div className={classes.text}>
          <h2>The Restaurant</h2>
          <p>
           Say you had a restaurant, and business is booming! You&apos;ve got lots of customers coming in and out and a lot of them orther the same food. Now You want to add crypto payments to your business. <span>How do you know who paid you when all you see is a long list Crypto Addresses.</span> Would you go and ask each customer one by one? No need, Use Hupay for Sender Names.
          </p>
          </div>
          <div className={classes["img"]}>
            <img
              src={"restaurant.jpg"}
              alt={"A Restaurant filled witn people"}
            />
          </div>
        
      </div>

      <div className={classes.analogies}>
          <div className={classes.text}>
          <h2>
            Grandma
          </h2>
          <p>
            What if it's A friend you're sending crypto to, or a family member, hhhhaa or maybe Grandma. <span>You surely don't want Grandma trying to track your Crypto Public Address to decode which of her GrandChildren loves her most.</span> Right,  that's why you should use Hupay.
          </p>
          
          </div>
          <div className={classes["img"]}>
            <img src={"grandma.jpg"} alt={"A Grandma smiling"} />
          </div>
        </div>

      <div className={classes["how-to-use"]}>
        <h2>How To Use Hupay</h2>
        <p>
          Get then MetaMask browser extension, Connect to the <span>Goerli Network</span>, and Import <b>HUC Token</b> with Contract Address of <b>0xB27D522C0251CA702058178625747B2481A9De3E</b>. That&apos; it, Thanks for using Hupay.
        </p>
      </div>

      <div className={classes["creator"]}>
        <h2>Creator</h2>
        <h4>Hi there, I'm <b>Precious Nwaoha</b> and this is my first ever blockchain related project. I built this project in 4 days and just a day before starting I knew nothing about blockchain dev (Not even what minting was).</h4>
        <p className={classes.glad}>Im so glad i joined the bunzz hackathon. It pushed  me to learn so much.</p>

        <div className={classes.donate}>
        <h3>Buy me a coffee?</h3>
        <div className={classes.address}>
            <p>My Ethereum: {formatAddress("0x5a89D7585EE663c2CE410eEb7070C0749CEA7CA5")}</p>
            <button onClick={() => copyHandler("eth")}>
              {copiedEth ? "Copied" : "Copy"}
            </button>
        </div>
        <div className={classes.address}>
            <p>My Bitcoin: {formatAddress("bc1qlh2ry98c3an84vzugqm0r50wf24q9f2n4l0s3c")}</p>
            <button onClick={() => copyHandler("btc")}>
            {copiedBtc ? "Copied" : "Copy"}
            </button>
        </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
