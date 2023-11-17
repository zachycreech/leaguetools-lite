import { ContextProviders } from "./context/context";
import { styled } from "styled-components";
import { Sidebar } from "./components";
import { MatchHistory } from "./screens/MatchHistory";

const Container = styled.div`
  background-color: #4b5563;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  user-select: none;
`;

function App() {
  return (
    <ContextProviders>
      <Container>
        <Sidebar />
        <MatchHistory />
      </Container>
    </ContextProviders>
  );
}

// function Test() {
//   const lolContext = useContext(LoLContext);

//   return (
//     <>
//       <h1>{lolContext.summoner?.displayName}</h1>
//       <div>
//         Connected: {String(lolContext.isConnected)}
//         <br />
//         State: {lolContext.state}
//         <br />
//         Gameflow phase: {lolContext.gameflowPhase}
//         <br />
//         Gamemode: {lolContext.lobby?.gameConfig.gameMode}
//       </div>
//     </>
//   );
// }

export default App;
