import React, { useEffect } from "react";
import { useROS } from "./ROS";
import "./App.css";

function App() {
  const {
    isConnected,
    topics,
    url,
    changeUrl,
    toggleConnection,
    toggleAutoconnect,
  } = useROS();

  console.log(topics);

  const defaultURL = "ws://0.0.0.0:9090";

  useEffect(() => {
    console.log("Toggle Connect is first ");
    if (url !== defaultURL) {
      changeUrl(defaultURL);
    }

    if (!isConnected) {
      toggleAutoconnect();
    }
  }, []);

  return (
    <div className="App">
      <p>
        <b>Simple connect: </b>
        <button onClick={toggleConnection}>Toggle Connect</button> <br />
        <b>ROS url input: </b>
        <input
          name="urlInput"
          defaultValue={url}
          onChange={(event) => changeUrl(event.target.value)}
        />
        <br />
        <b>ROS url to connect to: </b> {url} <br />
        <b>Status of ROS:</b> {isConnected ? "connected" : "not connected"}
        <br />
        <b>Topics detected:</b>
        <br />
      </p>
    </div>
  );
}

export default App;
