import React, { useEffect, useState } from "react";

function Courses(props) {
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState("");
  const { getAccessToken } = props.auth;
  useEffect(() => {
    fetch(
      "/courses",
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
      .then(res => setCourses(res.courses))
      .catch(err => setCourses(err.message));
    fetch(
      "/admin",
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
      .catch(err => console.log(err));
  }, []);
  return (
    <>
      <ul style={{ display: "block" }}>
        {courses.map(c => (
          <li key={c.id}>{c.title}</li>
        ))}
      </ul>
      <p>{message}</p>
    </>
  );
}

export default Courses;
