import './App.css';
import './componentsCss/SignIn.css';
import Navbar from "./components/Navbar";
import Routing from './Routing';
import { useReducer } from 'react';
import { initialState, UserReducer } from './reducers/UserReducer';
import { UserContext } from './contexts';


function App() {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  return (
    <div className="App">
      <UserContext.Provider value={{ state, dispatch }} >
        <Navbar />
        <Routing />
      </UserContext.Provider>
    </div>
  );
}

export default App;
