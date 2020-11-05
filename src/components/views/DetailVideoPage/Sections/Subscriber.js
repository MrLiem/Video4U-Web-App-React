import React, { useEffect, useState } from "react";
import axios from "axios";

const Subscriber = ({ userTo, userFrom }) => {
  const [subscriberNumber, setSubscribeNumber] = useState(0);
  const [subscribed, setSubscribed] = useState(false);

  const onSubscribe = async () => {
    let subscribeVariables = {
      userTo: userTo,
      userFrom: userFrom,
    };
    if (subscribed) {
      //When we are already subscribed
      const response = await axios.post(
        "/api/subscribe/unSubscribe",
        subscribeVariables
      );
      if (response.data.success) {
        setSubscribeNumber(subscriberNumber - 1);
        setSubscribed(!subscribed);
      } else {
        alert("Failed to unsubscribe!!!");
      }
    } else {
      // When we are not subscribed yet
      const response = await axios.post(
        "/api/subscribe/subscribe",
        subscribeVariables
      );
      if (response.data.success) {
        setSubscribeNumber(subscriberNumber + 1);
        setSubscribed(!subscribed);
      } else {
        alert("Failed to subscribe");
      }
    }
  };
  useEffect(() => {
    const subscribeNumberVariables = { userTo, userFrom };
    const getSubscriber = async () => {
      const response = await axios.post(
        "/api/subscribe/subscribeNumber",
        subscribeNumberVariables
      );
      if (response.data.success) {
        console.log(response.data.subscribeNumber);
        setSubscribeNumber(response.data.subscribeNumber);
      } else {
        alert("Failed to get subscriber number!!!");
      }
    };
    const getSubscribed = async () => {
      const response = await axios.post(
        "/api/subscribe/subscribed",
        subscribeNumberVariables
      );
      if (response.data.success) {
        console.log(response.data.subscribed);
        setSubscribed(response.data.subscribed);
      } else {
        alert("Failed to get subscribed or not!!!");
      }
    };
    getSubscriber();
    getSubscribed();
  }, []);
  return (
    <div>
      <button
        onClick={onSubscribe}
        style={{
          marginRight: "-8px",
          backgroundColor: `${subscribed ? "#AAAAAA" : "#CC0000"} `,
          borderRadius: "4px",
          color: "white",
          padding: "10px 16px",
          fontWeight: "500",
          fontSize: "1rem",
          textTransform: "uppercase",
          outline: "none",
        }}
      >
        {subscriberNumber} <span>&nbsp;</span>
        {subscribed ? "Subscribed" : "Subscribe"}
      </button>
    </div>
  );
};

export default Subscriber;
