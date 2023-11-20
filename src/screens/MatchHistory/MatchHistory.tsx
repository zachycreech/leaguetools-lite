import MatchList from "./components/Match/MatchList";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { LoLContext } from "../../context/context";

const MatchHistory = () => {
  const navigate = useNavigate();
  const lolContext = useContext(LoLContext);

  useEffect(() => {
    if (lolContext.state === "ChampSelect") {
      navigate("/champ-select");
    }
  }, [lolContext.state]);

  return <MatchList />;
};

export default MatchHistory;
