import React, { useState } from "react";

function BookCategory({ data }) {
  console.log(data);
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

      <div className="right"></div>
    </div>
  );
}

export default BookCategory;
