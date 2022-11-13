import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc} from "firebase/firestore";
import { auth, db } from "../firebase-config";

function Home({ isAuth }) {
        
        const [eventsLists, setEventsList] = useState([]);
        const eventsCollectionRef = collection(db, "events");
        const details = []; 
        
      
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

          return (
            <div className="homePage">
              {eventsLists.map((event) => {
                return (
                  <div className="event">
                    <div className="eventHeader">
                      <div className="title">
                        <h1> Name: {event.eventName}</h1>
                      </div>
                      <div className="deleteEvent">
                        {isAuth && ((event.host === auth.currentUser.email) || auth.currentUser.uid === "pFZs7C1pw1fknCOh7ULNbUlXi3U2") && (
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
                      {isAuth && ((event.host === auth.currentUser.email) || auth.currentUser.uid === "pFZs7C1pw1fknCOh7ULNbUlXi3U2") && (
                          <button
                          onClick={() => {
                            details.push(event.eventName, event.text, event.location, event.time, event.host, event.id);
                            localStorage.setItem("details", details);
                            window.location.pathname = "/edit-event";
                          }}
                        >
                          {"Edit Event"}
                        </button>
                        )}
                      </div>
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
                  </div>
                );
              })}
            </div>
          );
}

export default Home;