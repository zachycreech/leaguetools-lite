import { styled } from "styled-components";

const Container = styled.div`
  flex-direction: column;
  margin: 1.5rem;
`;
const StyledImage = styled.img`
  border: 1px solid #feb83e;
`;

type Props = {
  summonerSpells: {
    firstSummonerSpell: number;
    secondSummonerSpell: number;
  };
};

const SummonerSpells = ({
  summonerSpells: { firstSummonerSpell, secondSummonerSpell },
}: Props) => {
  return (
    <Container>
      <StyledImage
        src={`https://lolcdn.darkintaqt.com/cdn/spells/${firstSummonerSpell}`}
        alt="first Summoner Spell"
      />
      <StyledImage
        alt="second Summoner Spell"
        src={`https://lolcdn.darkintaqt.com/cdn/spells/${secondSummonerSpell}`}
      />
    </Container>
  );
};

export default SummonerSpells;
