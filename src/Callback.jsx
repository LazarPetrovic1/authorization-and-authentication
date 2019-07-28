import React, { useEffect } from "react";

function Callback(props) {
  console.log(props);
  useEffect(() => {
    // Handle authentication if expected values are in the URL
    if (/access_token|id_token|error/.test(props.location.hash)) {
      props.auth.handleAuthentication();
    } else {
      throw new Error("Invalid callback URL. Make sure the path is correct.");
    }
  });
  return <div>Hello</div>;
}

export default Callback;
