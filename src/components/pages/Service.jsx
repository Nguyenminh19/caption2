import React from "react";
import avatar from "../../assets/img/avatar.jpg";

const Service = () => {
  return (
    <section className="section" id="section-members">
      <div className="container">
        <h3>Team member</h3>
        <div className="row">
          <div className="col-3">
            <div className="card member">
              <img src={avatar} alt="" className="card-img" />
              <p className="member-name">LE HUY AN</p>
            </div>
          </div>
          <div className="col-3">
            <div className="card member">
              <img src={avatar} alt="" className="card-img" />
              <p className="member-name">PHAM MINH NGOC</p>
            </div>
          </div>
          <div className="col-3">
            <div className="card member">
              <img src={avatar} alt="" className="card-img" />
              <p className="member-name">NGUYEN KIM DAT</p>
            </div>
          </div>
          <div className="col-3">
            <div className="card member">
              <img src={avatar} alt="" className="card-img" />
              <p className="member-name">NGUYEN MINH</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Service;
