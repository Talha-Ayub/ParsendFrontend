import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../../components/header";
import Footer from "../../components/footer";
import "./Chat.css";

const Chat = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = localStorage.getItem("userId");

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
  }, [messages]);

  //   useEffect(() => {}, []);

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
          console.log(response.data);
          setNewMessage("");
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
      // Emit the message to the server

      // Clear the input field
    }
  };

  console.log(messages);

  return (
    <>
      <Header />
      <div className="fcc chat__container">
        <div>
          {messages.map((message, index) => (
            <div key={index}>
              <strong>{message.senderName}: </strong>
              {message.text}
            </div>
          ))}
        </div>
        <form onSubmit={handleSendMessage}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Chat;
