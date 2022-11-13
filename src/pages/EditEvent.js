import React, {useState} from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase-config";

function EditEvent() {

    var l = [];
    l = localStorage.getItem("details");
    const details = l.split(",");

    const [eventName, setName] = useState(details[0]);
    const [text, setText] = useState(details[1]);
    const [location, setLocation] = useState(details[2]);
    const [time, setTime] = useState(details[3]);
    const [host, setHost] = useState(details[4]);
  
    const eventsCollectionRef = collection(db, "events");
  
    const editEvent = async () => {
      await addDoc(eventsCollectionRef, {
        eventName,
        text,
        location,
        time,
        host,
      });
      localStorage.clear();
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
          <button onClick={editEvent}> Publish Event</button>
        </div>
      </div>
    );
}

export default EditEvent;