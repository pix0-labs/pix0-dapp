import { EntryView } from "./views/EntryView";
import { Provider } from "react-redux";
import { StateStore } from './sm/StateStore';
import './App.css';


function App() {

  return (
    <div className="App" style={{textAlign:"left"}}>
      <Provider store={StateStore}>
        <EntryView/>
      </Provider>
    </div>
  );
}

export default App;
