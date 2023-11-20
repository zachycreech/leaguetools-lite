import { ContextProviders } from "./context/context";
import { styled } from "styled-components";
import { Sidebar } from "./components";
import { HashRouter } from "react-router-dom";
import { AllRoutes } from "./routes";

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
      <HashRouter>
        <Container>
          <Sidebar />
          <AllRoutes />
        </Container>
      </HashRouter>
    </ContextProviders>
  );
}

export default App;
