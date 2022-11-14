import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc, addDoc} from "firebase/firestore";
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

        const createEvent = async () => {
          console.log(x);
          deleteEvent(x[7]);
          await addDoc(eventsCollectionRef, {
            eventName: x[0],
            text: x[1],
            location: x[2],
            time: x[3],
            host: x[4],
            compacity: x[5],
            guestList: x[6],
          });
        };



          return (
            <div className="homePage">
              {eventsLists.map((event) => {
                return (
                  <div className="event">
                    <div className="eventHeader">
                      <div className="deleteEvent">
                        {isAuth && ((event.host === auth.currentUser.email) || auth.currentUser.uid === "AObFEP85hge51YBgJmYBTSZKDAU2") && (
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
                      {isAuth && ((event.host === auth.currentUser.email) || auth.currentUser.uid === "AObFEP85hge51YBgJmYBTSZKDAU2") && ( //pFZs7C1pw1fknCOh7ULNbUlXi3U2
                          <button
                          onClick={() => {
                            details.push(event.eventName, event.text, event.location, event.time, event.host, event.compacity, event.guestList, event.id);
                            localStorage.setItem("details", details);
                            window.location.pathname = "/edit-event";
                          }}
                        >
                          {"Edit Event"}
                        </button>
                        )}
                      </div>
                      <div className="rsvpEvent">
                      {isAuth && (typeof(event.guestList) !== "string" || !event.guestList.includes(auth.currentUser.email)) ? (
                          <button
                          onClick={() => {
                            if (typeof(event.guestList) !== "string") {
                              event.guestList = "";
                            }
                            event.guestList = ((event.guestList).concat((auth.currentUser.email), ","));
                            x.push(event.eventName, event.text, event.location, event.time, event.host, event.compacity, event.guestList, event.id);
                            createEvent();
                          }}
                        >
                          {"RSVP to Event"}
                        </button>) : <button
                          onClick={() => {
                            var list = event.guestList.split(",");
                            const email = auth.currentUser.email;
                              if (list.includes(email)) {
                                const index = list.indexOf(email);
                                delete list[index];
                              }
                            event.guestList = list.toString();
                            x.push(event.eventName, event.text, event.location, event.time, event.host, event.compacity, event.guestList, event.id);
                            deleteEvent(event.id);
                            createEvent();
                          }}
                        >
                          {"Remove RSVP"}
                        </button>
                        }
                      </div>
                    </div>
                    <container>
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
                    <h3>Event Compacity:  / {event.compacity}</h3>
                    <h3>Event List: {event.guestList}</h3>
                    </container>
                  </div>
                );
              })}
            </div>
          );
}

export default Home;