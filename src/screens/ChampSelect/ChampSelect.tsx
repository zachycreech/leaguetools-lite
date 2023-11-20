import { useContext, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { LoLContext } from "../../context/context";
import RuneApi from "../../context/api/runeGetter";

const Container = styled.div``;

const ChampSelect = () => {
  const lolContext = useContext(LoLContext);
  const runePageApi = useMemo(() => new RuneApi(), []);

  const shouldNavigateToMatchHistory = () => {
    if (
      lolContext.state === "PostGame" ||
      lolContext.state === "None" ||
      lolContext.state === "Lobby" ||
      lolContext.state === "InQueue"
    ) {
      return true;
    } else {
      return false;
    }
  };

  const selectedChampionId = lolContext.champSelectSession
    ?.getLocalPlayer()
    ?.championId.toString();

  console.log("selectedChampId", selectedChampionId);
  const championName =
    lolContext.champions?.find(
      //@ts-ignore
      (champion) => champion.key === selectedChampionId,
    )?.id ?? "error";

  console.log("championName", championName);

  // const championLane =
  //   lolContext.champSelectSession?.getLocalPlayer()?.assignedPosition;

  const isAram = lolContext.lobby?.gameConfig.gameMode;

  useEffect(() => {
    if (isAram) {
      console.log(runePageApi.getAramRunes(championName));
    }
  }, [selectedChampionId]);

  console.log(lolContext.champSelectSession?.localPlayerCellId);
  const navigate = useNavigate();
  useEffect(() => {
    if (shouldNavigateToMatchHistory()) {
      navigate("/");
    }
  }, [lolContext.state]);

  return <Container>Champ Select</Container>;
};

export default ChampSelect;
