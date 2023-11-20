import { Route, Routes } from "react-router-dom";
import { ChampSelect } from "../screens/ChampSelect";
import { MatchHistory } from "../screens/MatchHistory";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MatchHistory />} />
      <Route path="/champ-select" element={<ChampSelect />} />
    </Routes>
  );
};

export default AllRoutes;
