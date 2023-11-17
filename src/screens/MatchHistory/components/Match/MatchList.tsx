import { useContext } from "react";
import { styled } from "styled-components";
import { MatchItem } from "./MatchItem";
import { LoLContext } from "../../../../context/context";

const Wrapper = styled.div`
  grid-column-start: 2;
  grid-column-end: 13;
  max-height: 100vh;
  overflow: hidden;
  scroll-behavior: smooth;
`;

const SummonerName = styled.h6`
  color: white;
  font-size: 20px;
  margin: 12px;
`;

const MatchWrapper = styled.div`
  height: 95%;
  overflow: auto;
  scroll-behavior: smooth;
`;

const MatchList = () => {
  const lolContext = useContext(LoLContext);
  const { matches, summoner } = lolContext;

  const summonerName = summoner?.displayName ?? "";

  const renderMatches = () => {
    const items = matches?.games?.games?.map((match) => {
      return <MatchItem key={match.gameId} match={match} />;
    });
    return items;
  };

  return (
    <Wrapper>
      <SummonerName>{summonerName}</SummonerName>
      <MatchWrapper>{renderMatches()}</MatchWrapper>
    </Wrapper>
  );
};

export default MatchList;
