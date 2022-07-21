import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import Messagebox from './Messagebox';
import Ably from 'ably'

export default function PublicMessagesPage() {
  const [user, setUser] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    Axios.defaults.baseURL = 'http://localhost:8000/api'//process.env.REACT_APP_API_BASE_URL;

    var ably = new Ably.Realtime('xmsqXQ.aM6GXA:HALO5OzQ6VxaWxL3ClzWOZBEA1e-laZ9eey4UQ7euxQ');
      ably.connection.on('connected', function() {
        alert('Connected!');
      })
    var channel = ably.channels.get('public.room');
    channel.subscribe(function(message) {
      setMessages((prev) => [...prev, message.data])
      setMessage('')
    });
    channel.publish('example', 'olaa');

  }, []);

  async function handleSendMessage(e) {
    e.preventDefault();

    if (!user) {
      alert('Please add your username');
      return;
    }

    if (!message) {
      alert('Please add a message');
      return;
    }

    try {
      await Axios.post('/new-message', {
        user: user,
        message: message,
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <div>
        <div>
          <h1>CHAT</h1>
        </div>

        <div>
          {messages.map((message) => (
            <Messagebox key={message.id} message={message} />
          ))}
        </div>

        <div>
          <form onSubmit={(e) => handleSendMessage(e)}>
            <input
              type="text"
              placeholder="Set your username"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
            />
            <div>
              <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              <button onClick={(e) => handleSendMessage(e)}>Send</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
