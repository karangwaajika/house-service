import React, { useContext } from "react";
import { pendingBookingContext } from "@/pages/Dashboard";

function ContentHeader() {
  const booking = useContext(pendingBookingContext);
  return (
    <div className="content--header">
      <h1 className="header--title">Dashboard</h1>
      <div className="header--activity">
        <div className="search-box">
          <input type="text" placeholder="Search anything..." />
          <i className="fa fa-search icon"></i>
        </div>
        <div className="notify">
          <i className="fa fa-bell">
            <span className="bell-notify">
              {booking.data && booking.data.length}
            </span>
          </i>
        </div>
      </div>
    </div>
  );
}

export default ContentHeader;
