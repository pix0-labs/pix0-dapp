import { HomeView } from "./views/HomeView";
import { Provider } from "react-redux";
import { StateStore } from './sm/StateStore';
import './App.css';

function App() {

  return (
    <div className="App" style={{textAlign:"left"}}>
      <Provider store={StateStore}>
        <HomeView/>
      </Provider>
    </div>
  );
}

export default App;
