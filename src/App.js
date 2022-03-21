import "./App.css";
import FirstComponent from "./components/FirstComponent";
import SecondComponent from "./components/SecondComponent";
import { GlobalProvider } from "./context/GlobalState";

function App() {
  return (
    <div className="App">
      <h1>Component</h1>
      <GlobalProvider>
        <FirstComponent />
        <SecondComponent />
      </GlobalProvider>
    </div>
  );
}

export default App;
