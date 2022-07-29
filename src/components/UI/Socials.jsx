import React from "react";
import { FaDiscord, FaTwitter, FaEthereum, FaGithubAlt } from "react-icons/fa";
import classes from "./Socials.module.css";

const Socials = ({ className }) => {
  return (
    <div className={`${classes.socials} ${className || ""}`}>
      <div>
        <a href="https://goerli.etherscan.io/address/0xb27d522c0251ca702058178625747b2481a9de3e" rel="noreferrer" target={"_blank"}>
          <FaEthereum />
        </a>
      </div>
      <div>
        <a href="https://github.com/preciousnwaoha/hupay" rel="noreferrer" target={"_blank"}>
          <FaGithubAlt />
        </a>
      </div>
      <div>
        <a href="https://discord.gg/CCqC4VAfK5" rel="noreferrer" target={"_blank"}>
          <FaDiscord />
        </a>
      </div>

      <div>
        <a href="https://twitter.com/_preciousnwaoha" rel="noreferrer" target={"_blank"}>
          <FaTwitter />
        </a>
      </div>
    </div>
  );
};

export default Socials;
