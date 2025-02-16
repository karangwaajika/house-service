import React from "react";
import picture from "/images/download (1).jpeg";
import Button from "../components/ui/Button";
import loaderPicture from "/images/loading-3.gif";

function ServicesList({ data, isLoading, category_name }) {
  return (
    <div className="services-list">
      <div className="services--header">
        <span>
          {category_name ? category_name : "All services"} ({data.length}):
        </span>
      </div>
      <div className="services--list">
        {isLoading && (
          <div className="loader--category">
            <img src={loaderPicture} width={100} height={100} />
          </div>
        )}
        {data.length > 0 ? (
          data.map((item, i) => {
            //  swing  bounceIn bouceInDown biLeft, Right1
            // bouceInUp2 fadeInDown3 fadeInDownBig1a rotateIn rotateInDownLeft1aa
            let style = {
              backgroundImage: `url(${item.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            };
            return (
              <div className="grid--service animated rotateInDownLeft" key={i}>
                <div className="grid-image" style={style}>
                  <div className="grid-mask"></div>
                </div>
                {/* <img src={item.image} alt="home" width={100} height={100} /> */}
                <div className="grid-service-body">
                  <div className="category-header">
                    <i className="line-grid"></i>
                    <span> {item.category_name}</span>
                    <i className="line-grid"></i>
                  </div>
                  <div className="grid-header">{item.name}</div>
                  {item.workers.length > 0 ? (
                    <ul>
                      <li>
                        <i className="fa fa-user"></i>{" "}
                        <span>{item.workers[0].name}</span>
                      </li>
                      <li>
                        <i className="fa fa-envelope"></i>
                        <span>{item.workers[0].email}</span>
                      </li>
                      <li>
                        <i className="fa fa-location-dot"></i>
                        <span>{item.workers[0].address}</span>
                      </li>
                    </ul>
                  ) : (
                    <div style={{ fontSize: "12px" }}>
                      No worker set for this service. we are looking for a
                      proffesional for this domain. Sorry for any incovenience
                    </div>
                  )}

                  <div className="btn-grid">Book Now</div>
                </div>
              </div>
            );
          })
        ) : (
          <div style={{ color: "red", textAlign: "center" }}>
            No services for the {category_name}
          </div>
        )}
      </div>
    </div>
  );
}

export default ServicesList;
