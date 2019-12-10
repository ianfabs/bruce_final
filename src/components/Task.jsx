import React from "react";
import {
  Checkbox,
  Text,
  TextField,
  PrimaryButton,
  DefaultButton,
  Modal,
  ContextualMenu,
  IconButton,
} from "office-ui-fabric-react";
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import './Task.css';

const indentTextClass = mergeStyles({
  // marginLeft: '29px'
  marginTop: '8px'
});

const strikeOnDone = mergeStyles({
  textDecoration: 'line-through'
});


// TODO: Make an editable option for this one.
// Maybe one of those modal thingys.
// https://developer.microsoft.com/en-us/fabric#/controls/web/modal
/* Task ~ The logical layout for a task */
export default (props) => {
  const [done, toggleDone] = React.useReducer((state)=>!state, props.done);

  return (
    <div title={`Created on ${props.created}`} className="Task">
      <div className="Line">
        <Checkbox
          onChange={(e) => { toggleDone(); }}
          checked={done}
        />
        <Text className={done && strikeOnDone}>{props.name}</Text>
      </div>
      <Text className={indentTextClass}>
        {props.description}
      </Text>
    </div>
  );
};

export const NewTask = (props) => {
  return (
    <div title={`Created on ${props.created}`} className="Task">
      <Text variant="large">Create New Task</Text>
      <TextField
        label="Task Name"
      />
      <TextField
        label="Task Description"
      />
      <br/>
      <PrimaryButton text="Create"/>
    </div>
  );
};
