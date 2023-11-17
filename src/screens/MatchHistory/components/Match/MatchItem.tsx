import { LCUTypes } from "@hasagi/core";
import { useContext } from "react";
import { styled } from "styled-components";
import { LoLContext } from "../../../../context/context";
import SummonerSpells from "./SummonerSpells";
import GameInfo from "./GameInfo";
import ItemList from "./ItemList";
import PlayerStats from "./PlayerStats";

const Container = styled.div<{ result: boolean }>`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  border-radius: 0.375rem;
  margin: 0.5rem;
  background-color: ${({ result }) => (result ? "#1E2B5E" : "#3E223B")};

  &:hover {
    background-color: ${({ result }) => (result ? "#1C234B" : "#311F3A")};
  }
`;
const Image = styled.img`
  margin: 1rem;
  col-start: 1;
  align-self: center;
`;

type Props = {
  match: LCUTypes.LolMatchHistoryMatchHistoryGame;
};

export const MatchItem = ({ match }: Props) => {
  const player = match.participants[0];
  const result: boolean = player.stats.win;
  const championId = player.championId.toString();
  const lolContext = useContext(LoLContext);
  const champions = lolContext.champions;

  const summonerSpells = {
    firstSummonerSpell: player.spell1Id,
    secondSummonerSpell: player.spell2Id,
  };

  const championName = champions?.find(
    //@ts-ignore
    (champion) => champion.key === championId,
  )?.id;

  if (!champions) return null;

  return (
    <Container result={result}>
      <Image
        src={`https://raw.githubusercontent.com/Infinity54/LoL_DDragon/master/latest/img/champion/${championName}.png`}
        alt={championName}
        width={100}
        height={100}
      />
      <SummonerSpells summonerSpells={summonerSpells} />
      <GameInfo
        player={player}
        gameMode={match.gameMode}
        gameDuration={match.gameDuration}
        gameDate={match.gameCreationDate}
      />
      <ItemList player={player} />
      <PlayerStats player={player} />
    </Container>
  );
};
