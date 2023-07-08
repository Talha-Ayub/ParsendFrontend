import React from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import "./History.css";
import axios from "axios";
import { useEffect, useState } from "react";

const History = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("userId");

        const response = await axios.get(
          `http://localhost:3500/users/${user}/history`,
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

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);

    const localDate = date.toLocaleString("en-US", {
      timeZone: "Asia/Karachi",
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    return localDate;
  };
  console.log(data);

  return (
    <div>
      <Header />
      <main className="fc history__container">
        <table className="t1">
          <thead>
            <tr>
              <th>Title</th>
              <th>Destination</th>
              <th>Date and time</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((hist) => (
                <tr key={hist._id}>
                  <td>{hist.parcelTitle}</td>
                  <td>{hist.destinationAddress}</td>
                  <td>{formatDate(hist.createdAt)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </main>
      <Footer />
    </div>
  );
};

export default History;
