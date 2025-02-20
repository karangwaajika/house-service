import React, { useState } from "react";
import { addComma } from "@/utils/addComma.mjs";

function WorkerProfile({ data }) {
  // const [workers, setWorkers] = useState(data.workers)
  let price = data ? data[0].price : "";
  return (
    <div className="worker-profile">
      <div className="left">
        <article>
          <div className="toggle-btn-dashboard"></div>
          <figure>
            <img
              src={data && data[0].image}
              alt="profile-pic"
              width={200}
              height={200}
            />
          </figure>
        </article>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <ul className="house-ul">
            <li>
              <i className="fa fa-user"></i> <span>{data && data[0].name}</span>
            </li>
            <li>
              <i className="fa fa-envelope"></i>
              <span>{data && data[0].email}</span>
            </li>
            <li>
              <i className="fa fa-location-dot"></i>
              <span>{data && data[0].address}</span>
            </li>
            <li>
              <i className="fa fa-phone"></i>
              <span>{data && data[0].phone}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="house-h3">
        <h3>{data && data[0].service_name}</h3>
      </div>
      <div className="right">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            textAlign: "right",
          }}
        >
          <ul className="house-right">
            <li>
              <i className="fa fa-clock"></i>Available 9h:00 am to 5h:00 pm
            </li>
            <li>
              <i className="fa fa-money-bill-wave"></i> <span>Amount/hour</span>
              <span className="service-list--left">
                <i className="green">{addComma(price)} Rwf</i>
              </span>
            </li>
            <li>
              <i className="fa fa-location-dot"></i>
              <span>{data && data[0].address}</span>
            </li>
            <li>
              <i className="fa fa-phone"></i>
              <span>{data && data[0].phone}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default WorkerProfile;
