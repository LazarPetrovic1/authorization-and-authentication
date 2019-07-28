import React, { useEffect, useState } from "react";

function Private(props) {
  const [message, setMessage] = useState("");
  const { getAccessToken } = props.auth;
  useEffect(() => {
    fetch(
      "/private",
      {
        headers: { Authorization: `Bearer ${getAccessToken()}` }
      },
      [getAccessToken]
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Network error.");
        }
      })
      .then(res => setMessage(res.message))
      .catch(err => setMessage(err.message));
  }, []);
  return <p>{message}</p>;
}

export default Private;
