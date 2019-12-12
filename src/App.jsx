import React from 'react';
import logo from './logo.svg';
import './App.css';
import Task, {NewTask} from './components/Task';
import { useEffect } from 'react';
import {Text} from "office-ui-fabric-react";


function App() {
  const [state, setState] = React.useState([]);

  let request = new Request("https://free-todo-app.herokuapp.com/api/tasks");
  let apiCall = () => fetch(request).then(res => res.json()).then(res => { setState(res); return res; });

  // useEffect(()=>{apiCall();}, ['componentDidMount', 'state']);
  apiCall();
  
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header> */}
      <Text variant="mega">Welcome to Todoist</Text>
      <br/>
      <br/>
      <div className="list">
        {state.map(it => <Task {...it} key={it.name} onSave={apiCall}/> )}
      </div>
      <NewTask />
    </div>
  );
}

export default App;
