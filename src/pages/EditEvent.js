import React, {useState} from "react";
import { doc,updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";

function EditEvent() {
    var details = [];
    var l = localStorage.getItem("details");
    if (l !== null) {
      details = l.split(",");
    } else {
      window.location.pathname = "/";
    }

    const [eventName, setName] = useState(details[0]);
    const [text, setText] = useState(details[1]);
    const [location, setLocation] = useState(details[2]);
    const [time, setTime] = useState(details[3]);
    const [host, setHost] = useState(details[4]);
    const [compacity, setCompacity] = useState(details[5]);
    var guestList = details[6];
    const [inviteOnly, setInviteOnly] = useState(details[7]);
    
    const [listInvited, setListInvited] = useState(details[8]);

    const id = details[9]
    var list = [];
    const val = (listInvited.replaceAll('|', ','));

    function format() {
      console.log(listInvited);
      updateEvent();
    }

    const m = [1, 2];
      const task = async () => {
        for (const item of m) {
          await new Promise(r => setTimeout(r, 1000));
          console.log(item);
        }
        localStorage.removeItem("details");
        window.location.pathname = "/";
      }
  
    const updateEvent = async () => {
      const eventDoc = doc(db, "events", id);
      await updateDoc(eventDoc, {
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
      task();
    };

    
  
    return (
      <div className="createEventPage">
        <div className="Container">
          <h1>Edit Event</h1>
          <div className="inputGp">
            <label> Event Name:</label>
            <input
              value = {eventName}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
          <div className="inputGp">
            <label> Event Description:</label>
            <textarea
              value = {text}
              onChange={(event) => {
                setText(event.target.value);
              }}
            />
          </div>
          <div className="inputGp">
            <label> Event Location:</label>
            <input
              value = {location}
              onChange={(event) => {
                setLocation(event.target.value);
              }}
            />
          </div>
          <div className="inputGp">
            <label> Event Time:</label>
            <input
              value  = {time}
              onChange={(event) => {
                setTime(event.target.value);
              }}
            />
          </div>
          <div className="inputGp">
            <label> Host Email:</label>
            <input
              value = {host}
              onChange={(event) => {
                setHost(event.target.value);
              }}
            />
          </div>
          <div className="inputGp">
            <label> Event Compacity: </label>
            <input
              value = {compacity}
              onChange={(event) => {
                setCompacity(event.target.value);
              }}
            />
          </div>
          <div className="inputGp">
            <label> Remove guests by email (seperate by comma) </label>
            <input
              placeholder="Remove guest email.."
              onChange={(event) => {
                list = details[6].split("|");
                var emails = (event.target.value).split(",");
                emails.forEach((email) => {
                  if (list.includes(email)) {
                    const index = list.indexOf(email);
                    list.splice(index, 1)
                  }
                });
                guestList = list.toString();
                guestList = guestList.replaceAll(',', '|');
                if (event.guestList.substring(0,1) === '|') {
                  event.guestList = event.guestList.substring(1);
                }
              }}
            />
          </div>
          <div className="inputGp">
          <label>
          {(inviteOnly === false) ? (<input
              type="checkbox"
              checked={false}
              onChange={(event) => {
                setInviteOnly(true);
              }
              }
            />) :
            (<input
              type="checkbox"
              checked={true}
              onChange={(event) => {
                setInviteOnly(false);
              }
              }
            />)}
           Invite Only?
          </label>
          </div>
          {(inviteOnly) ? (<div className="inputGp">
            <label> Update People Invited: (seperate by comma) </label>
            <input
              value = {val}
              onChange={(event) => {
                setListInvited((event.target.value).replaceAll(',', '|'));
              }}
            />
          </div>): ""}
          <button onClick={format}> Publish Event</button>
        </div>
      </div>
    );
}

export default EditEvent;