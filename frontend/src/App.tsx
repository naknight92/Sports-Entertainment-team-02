import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
// import { GetMessageInput } from './models/get-message-input';
import { Event } from './models/event';
import { getAllEventsFunction, getEventByIdFunction } from './functions';

function App() {
  const [eventContent, setEventContent] = useState('');
  const [eventIdtextBox, setEventIdTextBox] = useState('');
  const [eventsContents, setEventsContents] = useState(['']);

  const handleTextChange = (event: any) => {
    setEventIdTextBox(event.target.value);
  };

  const handleTextChange2 = (event: any) => {};
  const getEventByIdButtonClickHandler = async () => {
    // const messageInput: GetMessageInput = { messageId: 'OONGorWwY81YXhKL0FGL' };
    try {
      const { data: message }: { data: Event } = await getEventByIdFunction({ eventId: eventIdtextBox });
      console.log(`message content is: ${message.content}`);
      setEventContent(message.content);
    } catch (error) {
      console.log(`error: ${JSON.stringify(error)}`);
    }
  };

  const getAllEventsButtonClickHandler = async () => {
    try {
      const result = await getAllEventsFunction();
      console.log(`Result: ${JSON.stringify(result)}`);
      const messages: Event[] = result.data;
      console.log(`Messages: ${JSON.stringify(messages)}`);
      setEventsContents(
        messages.map((message) => {
          return message.content;
        })
      );
    } catch (error) {
      console.log(`error: ${JSON.stringify(error)}`);
    }
  };

  const postEventByButtonClick = async () => {
    try {
      const { data: message }: { data: Event } = await getEventByIdFunction({ eventId: eventIdtextBox });
      console.log(`message content is: ${message.content}`);
      setEventContent(message.content);
    } catch (error) {
      console.log(`error: ${JSON.stringify(error)}`);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <a>Learn React</a>
        <input name="eventIdtextBox" onChange={handleTextChange} placeholder="id"></input>
        <button onClick={getEventByIdButtonClickHandler}>Get Event By ID</button>
        <a>{eventContent}</a>
        <button onClick={getAllEventsButtonClickHandler}>Get All Events</button>
        <input name="eventTextBox" onChange={handleTextChange2}></input>
        <button onClick={postEventByButtonClick}>Post event</button>
        <a>{eventContent}</a>
        <ul>
          {eventsContents.map((event, index) => {
            return <p key={`ulChildKey-${index}`}>{event}</p>;
          })}
        </ul>
      </header>
    </div>
  );
}

export default App;
