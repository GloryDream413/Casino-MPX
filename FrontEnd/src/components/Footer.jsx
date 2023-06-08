import { useNavigate } from "react-router-dom";
import twitterSVG from "../assets/twitter-svgrepo-com.svg";
import discordSVG from "../assets/discord-icon-svgrepo-com.svg";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="footer mt-5 md:mt-0 relative md:absolute md:bottom-0 flex  md:justify-between items-center  pb-10">
      <div className="mx-0">
        <img
          src="/images/logo.png"
          alt="logo"
          className="hidden sm:block ml-1 md:ml-6 cursor-pointer w-[90px] h-[90px]"
          onClick={() => navigate("/")}
        />
      </div>
      <div className="flex items-center ">
        <a
          href="https://twitter.com/syndicatespanda"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={twitterSVG}
            className=" md:hidden w-[32px] h-[32px] ml-3 md:ml-6 cursor-pointer"
            alt="twitter"
          />
        </a>
        <a
          href="https://discord.gg/vkMctx3PEd"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={discordSVG}
            className=" md:hidden w-[32px] h-[32px] ml-3 md:ml-6 cursor-pointer"
            alt="twitter"
          />
        </a>
      </div>
    </div>
  );
};

export default Footer;
