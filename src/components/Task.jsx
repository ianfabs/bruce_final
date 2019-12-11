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
  getTheme,
  mergeStyleSets,
  FontWeights,
} from "office-ui-fabric-react";
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { FontSizes } from '@uifabric/styling';
import './Task.css';
import { useState } from "react";

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
  /* const [show, toggleShow] = React.useReducer((state, action)=>{
    console.log("state", state);
    console.log("action", action);
    return action ? action : !state;
  }, false); */

  const [show, setShow] = useState(false);
  const [name, setName] = useState(props.name);
  const [description, setDescription] = useState(props.description || "");

  const theme = getTheme();
  const contentStyles = mergeStyleSets({
    container: {
      display: 'flex',
      flexFlow: 'column nowrap',
      alignItems: 'stretch'
    },
    header: [
      theme.fonts.xLargePlus,
      {
        flex: '1 1 auto',
        borderTop: `4px solid ${theme.palette.themePrimary}`,
        color: theme.palette.neutralPrimary,
        display: 'flex',
        fontSize: FontSizes.xLarge,
        alignItems: 'center',
        fontWeight: FontWeights.semibold,
        padding: '12px 12px 14px 24px'
      }
    ],
    body: {
      flex: '4 4 auto',
      padding: '0 24px 24px 24px',
      overflowY: 'hidden',
      selectors: {
        p: {
          margin: '14px 0'
        },
        'p:first-child': {
          marginTop: 0
        },
        'p:last-child': {
          marginBottom: 0
        }
      }
    }
  });

  const handleSaveChanges = event => {
    let req = fetch(`https://free-todo-app.herokuapp.com/api/tasks/${props.id}/edit`, {
      method: "PUT",
      body: JSON.stringify({
        name,
        description,
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    props.onSave && props.onSave({...props});
  };

  const handleDelete = () => {
    let req = fetch(`https://free-todo-app.herokuapp.com/api/tasks/${props.id}/delete`, {method: "DELETE"});
  }

  return (
    <div title={`Created on ${props.created}`} className="Task">
      <div className="Line">
        <Checkbox
          onChange={(e) => { toggleDone(); }}
          checked={done}
        />
        <Text className={done && strikeOnDone}>{props.name}</Text>
        <IconButton
          iconProps={{ iconName: 'SingleColumnEdit' }}
          onClick={()=>{setShow(true)}}
        />
        <IconButton
          iconProps={{ iconName: 'Clear', color: 'Red10' }}
          onClick={handleDelete}
        />
        <Modal
          isOpen={show}
          onDismiss={() => { setShow(false) }}
          isModeless={false}
          dragOptions={{
            moveMenuItemText: 'Move',
            closeMenuItemText: 'Close',
            menu: ContextualMenu
          }}
          containerClassName={contentStyles.container}
        >
          <div className={contentStyles.header}>
            <span>Edit Task</span>
            <IconButton
              iconProps={{ iconName: 'Cancel' }}
              ariaLabel="Close popup modal"
              onClick={() =>{ setShow(false) }}
            />
          </div>
          <div className={contentStyles.body}>
            <p>
              <TextField
                label="Name"
                value={name}
                onChange={event=>{ setName(event.target.value) }}
              />
              <TextField
                label="Description"
                value={description}
                onChange={event => { setDescription(event.target.value) }}
              />
              <br/>
              <PrimaryButton
                text="Save Changes"
                onClick={handleSaveChanges}
              />
            </p>
          </div>
        </Modal>
      </div>
      {/*
      <Text>
        {props.description}
      </Text>
      */}
    </div>
  );
};

export const NewTask = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleClick = async (event) => {
    let req = await fetch("https://free-todo-app.herokuapp.com/api/tasks/new", {
      method: "POST",
      body: JSON.stringify({
        description,
        name,
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
  };

  return (
    <div title={`Created on ${props.created}`} className="Task">
      <div className="New">
      <TextField
        value={name}
        onChange={ event => { setName(event.target.value) }}
        placeholder="Task Name"
      />
      <PrimaryButton text="Create" onClick={handleClick} className={mergeStyles({marginLeft: "10px"})}/>
      </div>
    </div>
  );
};
