import { View } from './views/View';
import { Provider } from "react-redux";
import { StateStore } from './sm/StateStore';
import './App.css';

function App() {

  return (
    <div className="App" style={{textAlign:"left"}}>
      <Provider store={StateStore}>
        <View/>
      </Provider>
    </div>
  );
}

export default App;
