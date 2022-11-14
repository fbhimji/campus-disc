import React, { useState} from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase-config";
import { useNavigate } from "react-router-dom";

function CreateEvent() {
    const [eventName, setName] = useState("");
    const [text, setText] = useState("");
    const [location, setLocation] = useState("");
    const [time, setTime] = useState("");
    const [host, setHost] = useState("");
    const [compacity, setCompacity] = useState("");
    const guestList = "";
    const [inviteOnly, setInviteOnly] = useState(false);
    //const [checked, setChecked] = useState(false);

    var listInvited = [];
  
    const eventsCollectionRef = collection(db, "events");
    let navigate = useNavigate();
  
    const createEvent = async () => {
      await addDoc(eventsCollectionRef, {
        eventName,
        text,
        location,
        time,
        host,
        compacity,
        guestList,
        inviteOnly,
        listInvited,
      });
      navigate("/");
    };
  
    return (
      <div className="createEventPage">
        <div className="Container">
          <h1>Create An Event</h1>
          <div className="inputGp">
            <label> Event Name:</label>
            <input
              placeholder="Event Name..."
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
          <div className="inputGp">
            <label> Event Description:</label>
            <textarea
              placeholder="Description..."
              onChange={(event) => {
                setText(event.target.value);
              }}
            />
          </div>
          <div className="inputGp">
            <label> Event Location:</label>
            <input
              placeholder="Location..."
              onChange={(event) => {
                setLocation(event.target.value);
              }}
            />
          </div>
          <div className="inputGp">
            <label> Event Time:</label>
            <input
              placeholder="Time..."
              onChange={(event) => {
                setTime(event.target.value);
              }}
            />
          </div>
          <div className="inputGp">
            <label> Host Email:</label>
            <input
              placeholder="Email..."
              onChange={(event) => {
                setHost(event.target.value);
              }}
            />
          </div>
          <div className="inputGp">
            <label> Event Compacity: </label>
            <input
              placeholder="Compacity..."
              onChange={(event) => {
                setCompacity(event.target.value);
              }}
            />
          </div>
          <div>
          <label>
            <input
              type="checkbox"
              checked={(inviteOnly === true)}
              onChange={(event) =>{
                setInviteOnly(!inviteOnly);
              }
              }
            />
           Invite Only?
          </label>
          </div>
          {(inviteOnly === true) ? (<div className="inputGp">
            <label> People Invited: (seperate by comma) </label>
            <input
              placeholder="list of people..."
              onChange={(event) => {
                listInvited = (event.target.value).split(",");
                listInvited = listInvited.toString();
                listInvited = listInvited.replaceAll(',', '|');
              }}
            />
          </div>): ""}
          <button onClick={createEvent}> Create Event</button>
        </div>
      </div>
    );
}

export default CreateEvent;