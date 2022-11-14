import React, {useState} from "react";
import { addDoc, collection, doc, deleteDoc} from "firebase/firestore";
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
    var list = [];
  
    const eventsCollectionRef = collection(db, "events");

    const deleteEvent = async (id) => {
      const eventDoc = doc(db, "events", id);
      await deleteDoc(eventDoc);
  };
  
    const editEvent = async () => {
      console.log(guestList);
      await addDoc(eventsCollectionRef, {
        eventName,
        text,
        location,
        time,
        host,
        compacity,
        guestList,
      });
      localStorage.removeItem("details");
      deleteEvent(details[7]);
      window.location.pathname = "/";
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
                list = details[6].split(",");
                var emails = (event.target.value).split(",");
                emails.forEach((email) => {
                  if (list.includes(email)) {
                    const index = list.indexOf(email);
                    delete list[index];
                  }
                });
                guestList = list.toString();
              }}
            />
          </div>
          <button onClick={editEvent}> Publish Event</button>
        </div>
      </div>
    );
}

export default EditEvent;