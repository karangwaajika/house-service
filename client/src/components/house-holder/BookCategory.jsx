import React, { useState } from "react";
import picture from "/images/book2.png";
import { useNavigate } from "react-router-dom";

function BookCategory({ data, services, service_id }) {
  const navigate = useNavigate();
  return (
    <div className="book--category">
      <div className="left">
        <h3>Description</h3>
        <span>{data.description}</span>
        <h3>Galery</h3>
        <div className="categories-photos">
          {data.images &&
            data.images.map((item, i) => {
              return (
                <img
                  src={item.image}
                  alt={`photo ${i}`}
                  width={100}
                  height={100}
                />
              );
            })}
        </div>
      </div>

      <div className="right">
        <button type="button" className="btn-booking">
          <img
            src={picture}
            alt="Google icon"
            className="booking-icon"
            height={100}
            width={100}
          />{" "}
          <span>Book Appointment</span>
        </button>
        <h3>Similar Services</h3>
        <div className="similar-services">
          {services.length > 0 &&
            services.map((service, i) => {
              return (
                <div
                  onClick={() =>
                    navigate(
                      `/house-holder/service/?category_id=${service.category}&category_name=${service.category_name}&service_id=${service.id}`
                    )
                  }
                  className={
                    service.id == service_id
                      ? "similar-service active"
                      : "similar-service"
                  }
                  key={i}
                >
                  <img
                    src={service.image}
                    alt="profile-pic"
                    width={200}
                    height={200}
                  />
                  <ul className="">
                    <li>
                      <span className="similar-title">{service.name}</span>
                    </li>
                    <li>
                      <i className="fa fa-user"></i>{" "}
                      <span>{service.workers && service.workers[0].name}</span>
                    </li>
                    <li>
                      <i className="fa fa-envelope"></i>
                      <span>{service.workers && service.workers[0].email}</span>
                    </li>
                    <li>
                      <i className="fa fa-location-dot"></i>
                      <span>
                        {service.workers && service.workers[0].address}
                      </span>
                    </li>
                  </ul>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default BookCategory;
