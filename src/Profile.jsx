import React, { useState, useEffect } from "react";

const Profile = props => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const { auth } = props;

  useEffect(
    () => {
      loadUserProfile();
    },
    [loadUserProfile]
  );

  function loadUserProfile() {
    auth.getProfile((profile, err) => {
      setProfile(profile);
      setError(err);
    });
  }

  if (!profile) return null;

  return (
    <>
      <h2 style={{ color: "red" }}>Profile</h2>
      <p>{profile.nickname}</p>
      <img
        src={profile.picture}
        style={{ maxWidth: 50, maxHeight: 50 }}
        alt="Profile pic"
      />
      <pre>{JSON.stringify(profile, null, 2)}</pre>
    </>
  );
};

export default Profile;
