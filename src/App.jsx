import React from 'react';
import logo from './logo.svg';
import './App.css';
import Task, {NewTask} from './components/Task';
import { useEffect } from 'react';


function App() {
  const [state, setState] = React.useState(null);


  useEffect(()=>{
    let req = fetch("https://free-todo-app.herokuapp.com/api/tasks").then(
      res => res.json()
    )
      .then(res => { setState(res) });
  }, ['componentDidMount']);

  console.log(state);


  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header> */}
      {state && state.map( it => <Task {...it} key={it.name}/> )}
      <NewTask />
    </div>
  );
}

export default App;
