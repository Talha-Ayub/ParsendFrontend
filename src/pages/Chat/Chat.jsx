import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Chat.css";

const Chat = ({ id }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = localStorage.getItem("userId");
  const [click, setClick] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.post(
          `http://localhost:3500/get-chats`,
          {
            sender: user,
            recipient: id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessages(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [click]);

  const handleSendMessage = (event) => {
    event.preventDefault();

    if (newMessage.trim() !== "") {
      const fetchData = async () => {
        try {
          const token = localStorage.getItem("token");

          const response = await axios.post(
            `http://localhost:3500/chats/${id}`,
            {
              sender: user,
              recipient: id,
              text: newMessage,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setNewMessage(response.data);
          setMessages((prevMessages) => [...prevMessages, newMessage]);
          setNewMessage("");
          setClick(click === false);
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    }
  };

  return (
    <div className="fcc chat__container">
      <form onSubmit={handleSendMessage}>
        <input
          placeholder="Enter message"
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit">Send message</button>
      </form>
      <div style={{ marginTop: "15px" }}>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.senderName}: </strong>
            {message.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;
