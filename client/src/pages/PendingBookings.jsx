import React from "react";
import ContentHeader from "../components/ContentHeader";
import InputField from "../components/ui/InputField";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import BookingTable from "../components/BookingTable";
import FlashMessage from "../components/ui/FlashMessage";
import PaginationLinks from "../components/ui/PaginationLinks";
import loaderPicture from "/images/loading-3.gif";
import { pendingBookingContext } from "@/pages/Dashboard";

function PendingBookings() {
  const booking = useContext(pendingBookingContext);
  const navigate = useNavigate();

  // handle modals
  const [animation, setAnimation] = useState("animated fadeIn");
  const [clickedRow, setClickedRow] = useState(null);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openPhotosModal, setOpenPhotosModal] = useState(false);

  const handleModal = (index, typeOfModal) => {
    // get the targeted item id
    setClickedRow(index);

    if (typeOfModal == "edit") {
      setAnimation(openEditModal ? "animated fadeOut" : "animated fadeIn");
      setTimeout(() => {
        setOpenEditModal((oldModalState) => !oldModalState);
      }, 1000);
    } else if (typeOfModal == "delete") {
      setAnimation(openDeleteModal ? "animated fadeOut" : "animated fadeIn");
      setTimeout(() => {
        setOpenDeleteModal((oldModalState) => !oldModalState);
      }, 1000);
    } else {
      setAnimation(openPhotosModal ? "animated fadeOut" : "animated fadeIn");
      setTimeout(() => {
        setOpenPhotosModal((oldModalState) => !oldModalState);
      }, 1000);
    }
  };

  return (
    <div className="dashboard--content category">
      <ContentHeader />
      <div className="hr"></div>
      <div className="header--content">
        <span>List Pending Bookings</span>
      </div>
      <div className="view-category-header">
        <div className="search-btn">
          <InputField
            type="search"
            name="search"
            id="search"
            label="Search"
            icon="fa-solid fa-search"
            placeholder="Search ... "
            handleChange={(e) => booking.setSearch(e.target.value)}
          />
        </div>

        <i
          className="btn-icon fa fa-plus"
          onClick={() => navigate("/dashboard/pending-bookings")}
        ></i>
      </div>
      {booking.message && (
        <FlashMessage
          message={booking.message.message}
          isSuccess={booking.message.success}
          clearMessage={booking.clearMessage}
        />
      )}
      <BookingTable
        bookings={booking.data}
        openEditModal={handleModal}
        openDeleteModal={handleModal}
        openPhotosModal={handleModal}
      />
      {booking.isLoading && (
        <div className="loader">
          <img src={loaderPicture} width={100} height={100} />
        </div>
      )}

      <PaginationLinks
        count={booking.links.count}
        next={booking.links.next}
        previous={booking.links.previous}
        setPage={booking.setPage}
        page={booking.page}
      />
    </div>
  );
}

export default PendingBookings;
