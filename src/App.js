import { createContext } from "react";

import GraphNetwork from "./components/graphNetwork";
import infrastructure from "./static/infrastructure.json";

const InfrastructureContext = createContext(null);

const App = () => {
  return (
    <div className="App">
      <InfrastructureContext.Provider value={infrastructure}>
        <GraphNetwork />
      </InfrastructureContext.Provider>
    </div>
  );
};

export default App;
export { InfrastructureContext };
