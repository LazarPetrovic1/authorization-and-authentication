import React, { useEffect, useState } from "react";

function Public() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    fetch("/public")
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

export default Public;
