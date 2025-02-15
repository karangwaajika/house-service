import React from "react";
import picture from "/images/google.png";
import useFetchAll from "../hooks/useFetchAll";

function ServiceCategory() {
  const { data } = useFetchAll("/api/categories/no_pagination/");
  return (
    <div className="service-category">
      <div className="category-header">
        <i className="line"></i>
        <h3 className="category-h3">Service Category</h3>
        <i className="line"></i>
      </div>
      <div className="category-section">
        <div className="category-list">
          {data.length > 0 && data.map((item, i) => {
            return (
              <div className="grid">
                <img src={item.images[0]["image"]} alt="good" width={100} height={100} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ServiceCategory;
