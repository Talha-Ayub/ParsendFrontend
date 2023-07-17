import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header";
import Footer from "../../components/footer";
import "./ChatBox.css";
import Chat from "../Chat/Chat";

const ChatBox = () => {
  const [data, setData] = useState(null);
  const [click, setClick] = useState(false);
  const [reciever, setReceiver] = useState(false);
  const navigate = useNavigate();
  const user = localStorage.getItem("userId");
  // const clicked = false;

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
    setClick(click === false);
    if (rec === user) {
      setReceiver(sen);
      // navigate(`/chats/${sen}`);
    } else if (sen === user) {
      setReceiver(rec);
      // navigate(`/chats/${rec}`);
    }
  };

  console.log(data);

  return (
    <div>
      <Header />
      <div className="chat-box">
        <div className="chatbox-conatiner">
          {!data ? (
            <div className="fc" style={{ padding: "50px" }}>
              No Chats found
            </div>
          ) : (
            data.map((chat) => (
              <div key={chat._id}>
                <h2
                  className="chatbox__h2"
                  onClick={() => handleClick(chat.sender, chat.recipient)}
                >
                  {chat.recipient === user
                    ? chat.senderName
                    : chat.recipientName}
                </h2>
              </div>
            ))
          )}
        </div>

        {click && <Chat id={reciever} />}
      </div>
      <Footer />
    </div>
  );
};

export default ChatBox;
