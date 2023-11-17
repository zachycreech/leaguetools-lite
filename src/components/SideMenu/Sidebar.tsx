import { useContext, useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import { LoLContext } from "../../context/context";
import { faCheck, faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const growShrink = keyframes`
0% {
  transform: scale(.2);
}
20% {
  transform: scale(.3);
}
40% {
  transform: scale(.4);
}
60% {
  transform: scale(.5);
}
80% {
  transform: scale(.4);
}

100% {
  transform: scale(.3);
}
`;

const Container = styled.div`
  background-color: #000;
  height: 100vh;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
`;

const Item = styled.div`
  title: ${({ title }) => title};
  padding: 0.5rem 0.5rem;
  color: #fff;
  font-size: 2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

const StyledIcon = styled(FontAwesomeIcon)<{ isConnected?: boolean }>`
  color: ${({ isConnected }) => (isConnected ? "green" : "yellow")};
  transform: scale(0.7);
  animation: ${({ isConnected }) =>
    !isConnected
      ? css`
          ${growShrink} 1s ease-in-out infinite
        `
      : "none"};
`;

const Text = styled.p`
  font-size: 12px;
  text-align: center;
  margin: 0;
`;

const Sidebar = () => {
  const [connectionSecured, setConnectionSecured] = useState<boolean>(false);
  const lolContext = useContext(LoLContext);
  const { isConnected, lobby, gameflowPhase } = lolContext;

  useEffect(() => {
    if (isConnected) {
      setTimeout(() => setConnectionSecured(true), 5000);
    }
  }, [isConnected]);

  return (
    <Container>
      <Item title={isConnected ? "Connected" : "Attempting to Connect"}>
        <StyledIcon
          isConnected={isConnected}
          icon={
            !isConnected ? faCircle : connectionSecured ? faCircle : faCheck
          }
        />
      </Item>
      <Item title={lobby?.gameConfig.gameMode ?? "Not In lobby"}>
        <Text>Game Mode: {lobby?.gameConfig.gameMode}</Text>
      </Item>
      <Item>
        <Text>{gameflowPhase === "None" ? "In menus" : gameflowPhase}</Text>
      </Item>
    </Container>
  );
};

export default Sidebar;
