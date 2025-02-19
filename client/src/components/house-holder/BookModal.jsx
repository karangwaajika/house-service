import React, { useState } from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

function BookModal({ animate, handleCloseModal }) {
  const [value, setValue] = useState(dayjs(Date.now()));
  console.log(value.format("YYYY-MM-DD"));
  const closeModal = (e) => {
    if (e.target.className == `modal ${animate}`) {
      handleCloseModal();
    }
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
            <DemoItem >
              <DateCalendar
                value={value}
                onChange={(newValue) => setValue(newValue)}
                sx={{ border: 1, borderColor: "black", borderRadius: 3 }}
              />
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider>
      </div>
    </div>
  );
}

export default BookModal;
