"use client";
import { useState } from "react";

export default function Bulb() {
  //let isBulbOn = false; // a local variable, not a state variable
  //let isBulbOn = false; // a local variable, not a state variable
  const [isBulbOn, setIsBulbOn] = useState(false);

  return (
    <>
      <img
        style={{ height: "300px" }}
        src={isBulbOn ? "images/bulb-on.png" : "images/bulb-off.png"}
        onMouseOver={() => setIsBulbOn(true)}
        onMouseOut={() => setIsBulbOn(false)}
      />
      <br />
      <input
        type="button"
        value={isBulbOn ? "Turn off" : "Turn on"}
        onClick={() => setIsBulbOn(!isBulbOn)}
      />
    </>
  );
}
