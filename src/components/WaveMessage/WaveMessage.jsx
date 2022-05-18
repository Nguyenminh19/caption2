import React from "react";
import "./WaveMessage.css";

const WaveMessage = () => {
  return (
    <div className="message message--bot">
      <div class="is-typing">
        <div class="jump1"></div>
        <div class="jump2"></div>
        <div class="jump3"></div>
        <div class="jump4"></div>
        <div class="jump5"></div>
      </div>
    </div>
  );
};

export default WaveMessage;
