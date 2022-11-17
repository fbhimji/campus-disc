import React, { useEffect, useState } from "react";
import { getDocs, collection, doc, updateDoc} from "firebase/firestore";
import { auth, db } from "../firebase-config";

function EventsRSVPD({ isAuth }) {
        
        const [eventsLists, setEventsList] = useState([]);
        const eventsCollectionRef = collection(db, "events");
        var x = [];
        var conflict = "";
        const names = [];
        const times = [];

        useEffect(() => {
            const getEvents = async () => {
              const data = await getDocs(eventsCollectionRef);
              setEventsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            };
        
            getEvents();
          });

          const updateEvent = async () => {
            const eventDoc = doc(db, "events", x[9]);
            await updateDoc(eventDoc, {
              eventName: x[0],
              text: x[1],
              location: x[2],
              time: x[3],
              host: x[4],
              compacity: x[5],
              guestList: x[6],
              inviteOnly: x[7],
              listInvited: x[8],
            });
            x =[];
          };

          return (
            <div className="homePage">
              {eventsLists.map((event) => {
                if (typeof(event.guestList) !== "string") {
                  event.guestList = "";
                }
                if ((event.guestList.includes(auth.currentUser.email))) {
                    if ((names.includes(event.eventName)) === false) {
                        if (names.length === 0) {
                            names.push(event.eventName);
                            times.push(event.time);
                        } else {
                            if (times.includes(event.time)) {
                                const namePlace = times.lastIndexOf(event.time);
                                if (conflict.indexOf(names[namePlace]) !== -1) {
                                    conflict += event.eventName + ",";
                                } else {
                                    conflict += names[namePlace] + ",";
                                    conflict += event.eventName + ",";
                                }
                                names.push(event.eventName);
                                times.push(0);
                            } else {
                                names.push(event.eventName);
                                times.push(event.time);
                            }
                        }
                    }
                    return (
                    <div className="event">
                        <button
                          onClick={() => {
                            var list = event.guestList.split("|");
                            const email = auth.currentUser.email;
                              if (list.includes(email)) {
                                const index = list.indexOf(email);
                                list.splice(index,1);
                              }
                            event.guestList = (list.toString()).replaceAll(',', '|');
                            if (event.guestList.substring(0,1) === '|') {
                                event.guestList = event.guestList.substring(1);
                            }
                            x.push(event.eventName, event.text, event.location, event.time, event.host, event.compacity, event.guestList, event.inviteOnly, event.listInvited, event.id);
                            updateEvent();
                          }}
                        >
                          {"Remove RSVP"}
                        </button>
                    <div className="title">
                        <h1> Name: {event.eventName}</h1>
                    </div>
                    <div className="eventTextContainer"> 
                    <h1>Description: {event.text} </h1>
                    <div className="location">
                        <h1> Location: {event.location}</h1>
                      </div>
                      <div className="time">
                        <h1> Time: {event.time}</h1>
                      </div>
                    </div>
                    <h3>Host: {event.host}</h3>
                    <h3>Event Compacity: {((event.guestList.match(/@/g) || []).length)}  / {event.compacity}</h3>
                    <h3>Event List: {event.guestList}</h3>
                  </div>
                );
                }
              })}
                <h1> Events with Conflicts: {(conflict === "") ? "None" : conflict}</h1>
            </div>
          );
}

export default EventsRSVPD;