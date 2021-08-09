import React, { useEffect } from "react";
import { useROS } from "./ROS";
import "./App.css";

function App() {
  const {
    isConnected,
    url,
    topics,
    changeUrl,
    toggleConnection,
    toggleAutoconnect,
    createListener,
  } = useROS();

  const defaultURL = "ws://localhost:9090";
  console.log("topics", topics);

  // const dataGetTopics = getTopics();
  // console.log("dataGetTopics", dataGetTopics);
  const velocityListener = createListener(
    "/vehicle/status/velocity",
    "autoware_debug_msgs/msg/Float32Stamped",
    0
  );
  console.log("velocity", velocityListener, velocityListener.subscribe());

  const Subscribe = () => {
    const velocityListener = createListener(
      "/vehicle/status/velocity",
      "autoware_debug_msgs/msg/Float32Stamped",
      0
    );
    velocityListener.subscribe((messgae)=>{
      console.log("velocity", messgae)
    });

    return;
  };
  console.log("SUb", Subscribe());

  useEffect(() => {
    if (url !== defaultURL) {
      changeUrl(defaultURL);
    }

    if (!isConnected) {
      toggleAutoconnect();
    }
  }, [changeUrl, toggleAutoconnect, isConnected, url]);

  return (
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
  );
}

export default App;
