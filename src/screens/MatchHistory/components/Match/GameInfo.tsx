import { styled } from "styled-components";
import moment from "moment";

const Container = styled.div`
  col-start: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const InfoText = styled.p<{ result: boolean }>`
  font-size: 12px;
  font-weight: bold;
  white-space: nowrap;
  color: ${({ result }) => (result ? "#3498db" : "#e74c3c")};
`;

const PlainText = styled.p`
  font-size: 12px;
  font-weight: bold;
  color: white;
`;

type Props = {
  player: any;
  gameMode: string;
  gameDuration: number;
  gameDate: string;
};

const GameInfo = ({ player, gameMode, gameDuration, gameDate }: Props) => {
  const result: boolean = player.stats.win;

  const getGameModeText = (type: string): string => {
    if (type === "NEXUSBLITZ") return "NEXUS BLITZ";
    if (type === "PRACTICETOOL") return "PRACTICE TOOL";
    return type;
  };

  const minutes = Math.floor(gameDuration / 60);
  const seconds = gameDuration - minutes * 60;
  const gameDurationText = `${minutes}min ${seconds}s`;
  const gameDateText = moment(gameDate).fromNow();

  return (
    <Container>
      <InfoText result={result}>{getGameModeText(gameMode)}</InfoText>
      <PlainText>{gameDurationText}</PlainText>
      <InfoText result={result}>{result ? "VICTORY" : "DEFEAT"}</InfoText>
      <PlainText>{gameDateText}</PlainText>
    </Container>
  );
};

export default GameInfo;
