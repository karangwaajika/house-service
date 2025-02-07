import React from "react";
const course = [
  {
    title: "web Development",
    icon: <i className="fa fa-user"></i>,
    duration: "2 hous",
  },
  {
    title: "web Development",
    icon: <i className="fa fa-user"></i>,
    duration: "2 hous",
  },
  {
    title: "web Development",
    icon: <i className="fa fa-user"></i>,
    duration: "2 hous",
  },
  
 
];
function Card() {
  return (
    <div className="card-home--container">
      {course.map((item, key) => {
        return (
          <div className="card-home" key={key}>
            <div className="card--cover">{item.icon}</div>
            <div className="card--title">
              <h2>{item.title}</h2>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Card;
