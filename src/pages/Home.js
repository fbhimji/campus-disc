import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc, updateDoc} from "firebase/firestore";
import { auth, db } from "../firebase-config";

function Home({ isAuth }) {
        
        const [eventsLists, setEventsList] = useState([]);
        const eventsCollectionRef = collection(db, "events");
        var details = []; 
        var x = [];
        
      
        useEffect(() => {
          const getEvents = async () => {
            const data = await getDocs(eventsCollectionRef);
            setEventsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          };
      
          getEvents();
        });

        const deleteEvent = async (id) => {
            const eventDoc = doc(db, "events", id);
            await deleteDoc(eventDoc);
        };

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
                return (
                  <div className="event">
                    <div className="eventHeader">
                      <div className="deleteEvent">
                        {isAuth && ((event.host === auth.currentUser.email) || auth.currentUser.email === "admin@gmail.com") && (
                          <button
                            onClick={() => {
                              deleteEvent(event.id);
                            }}
                          >
                            {" "}
                            &#128465;
                          </button>
                        )}
                      </div>
                      <div className="editEvent">
                      {isAuth && ((event.host === auth.currentUser.email) || auth.currentUser.email === "admin@gmail.com") && (
                          <button
                          onClick={() => {
                            console.log(event.listInvited);
                            details.push(event.eventName, event.text, event.location, event.time, event.host, event.compacity, event.guestList, event.inviteOnly, event.listInvited, event.id);
                            localStorage.setItem("details", details);
                            window.location.pathname = "/edit-event";
                          }}
                        >
                          {"Edit Event"}
                        </button>
                        )}
                      </div>
                      <div className="rsvpEvent">
                      {(isAuth && (event.inviteOnly === false || (event.listInvited.indexOf(auth.currentUser.email) !== -1)) && (event.guestList.includes(auth.currentUser.email))) ? ( <button
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
                        </button>): ((isAuth && (event.inviteOnly === false || ((event.listInvited).indexOf(auth.currentUser.email) !== -1))) ? (<button
                            onClick={() => {
                              event.guestList = ((event.guestList).concat((auth.currentUser.email), "|"));
                              x.push(event.eventName, event.text, event.location, event.time, event.host, event.compacity, event.guestList, event.inviteOnly, event.listInvited, event.id);
                              updateEvent();
                            }}
                            >
                            {"RSVP to Event"}
                            </button>) : "")
                        }
                      </div>
                    </div>
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
              })}
            </div>
          );
}

export default Home;