import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header";
import Footer from "../../components/footer";
import "./ChatBox.css";

const ChatBox = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const user = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("userId");

        const response = await axios.get(
          `http://localhost:3500/users/${user}/chatbox`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleClick = (sen, rec) => {
    let para;
    if (rec === user) {
      navigate(`/chats/${sen}`);
    } else if (sen === user) {
      navigate(`/chats/${rec}`);
    }
  };

  return (
    <div>
      <Header />
      <div className="chatbox-conatiner">
        {!data ? (
          <div>No Chats found</div>
        ) : (
          data.map((chat) => (
            <div key={chat._id}>
              <div onClick={() => handleClick(chat.sender, chat.recipient)}>
                {" "}
                {chat.recipient === user ? chat.senderName : chat.recipientName}
              </div>
            </div>
          ))
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ChatBox;
