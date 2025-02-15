import React, { useState } from "react";
import picture from "/images/google.png";
import useFetchAll from "../hooks/useFetchAll";

function ServiceCategory() {
  const { data } = useFetchAll("/api/categories/no_pagination/");
  const [isClicked, setIsClicked] = useState({ id: null, status: false });
  const handleClicked = (id) => {
    setIsClicked({ id: id, status: true });
  };
  return (
    <div className="service-category">
      <div className="category-header">
        <i className="line"></i>
        <h3 className="category-h3">Service Category</h3>
        <i className="line"></i>
      </div>
      <div className="category-section">
        <div className="category-list">
          {data.length > 0 &&
            data.map((item, i) => {
              // let style = {
              //   backgroundImage: `url(${item.images[0].image})`,
              //   backgroundSize: "contain",
              //   backgroundRepeat: "no-repeat",
              //   backgroundPosition: "top",
              // };
              return (
                <div
                  className={
                    isClicked.id == item.id && isClicked.status
                      ? "grid active"
                      : "grid"
                  }
                  onClick={() => handleClicked(item.id)}
                  key={i}
                >
                  <img
                    src={item.images[0].image}
                    alt={`photo${i}`}
                    width={100}
                    height={100}
                  />
                  <span className="cate--text">{item.name}</span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default ServiceCategory;
