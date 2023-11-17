import styled from "styled-components";

const Container = styled.div`
  margin: 0.5rem;
  align-self: center;
  display: flex;
  grid-column-start: 11;
`;

const Stat = styled.h6<{ isRed?: boolean }>`
  margin: 0 0.25rem;
  color: ${({ isRed }) => (isRed ? "#e74c3c" : "#fff")};
`;

const PlayerStats = ({ player }: any) => {
  const {
    stats: { kills, deaths, assists },
  } = player;

  return (
    <Container>
      <Stat>{kills}</Stat>
      <Stat>/</Stat>
      <Stat isRed>{deaths}</Stat>
      <Stat>/</Stat>
      <Stat>{assists}</Stat>
    </Container>
  );
};

export default PlayerStats;
