import React, { useState } from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Button from "../ui/Button";

function BookModal({ animate, handleCloseModal }) {
  const [value, setValue] = useState(dayjs(Date.now()));
  console.log(value.format("YYYY-MM-DD"));
  const closeModal = (e) => {
    if (e.target.className == `modal-house ${animate}`) {
      handleCloseModal();
    }
  };
  const timeSlot = [
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 AM",
    "12:30 PM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
    "05:00 PM",
  ];
  const [clicked, setClicked] = useState({ status: false, id: null });
  const handleClicked = (index) => {
    setClicked({ status: true, id: index });
  };
  return (
    <div className={`modal-house ${animate}`} onClick={closeModal}>
      <div className="modal-house-contents">
        <div className="modal-header">
          <h3>Book a service </h3>
          <div className="modal-close-button" onClick={handleCloseModal}>
            <i className="fa fa-rectangle-xmark"></i>
          </div>
        </div>
        <span>Select Date and Time slot to book a service</span>
        <h5>Select Date</h5>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateCalendar", "DateCalendar"]}>
            <DemoItem>
              <DateCalendar
                value={value}
                onChange={(newValue) => setValue(newValue)}
                sx={{ border: 1, borderColor: "black", borderRadius: 3 }}
              />
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider>
        <h5>Select Time</h5>
        <div className="time--container">
          {timeSlot.map((item, i) => {
            let className = "time--slot";
            if (item == "03:00 PM") {
              className = "time--slot active";
            }
            if (clicked.status && i == clicked.id) {
              className = "time--slot clicked";
            }
            return (
              <div
                className={className}
                key={i}
                onClick={() => handleClicked(i)}
              >
                <span>{item}</span>
              </div>
            );
          })}
        </div>
        <div className="buttons">
          <Button
            className="btn-danger"
            text="Cancel"
            height={30}
            width={100}
            onClick={handleCloseModal}
          />
          <Button
            className="btn-primary-book"
            text="Book"
            height={30}
            width={100}
          />
        </div>
      </div>
    </div>
  );
}

export default BookModal;
