import React from "react";
import ContentHeader from "../components/ContentHeader";
import InputField from "../components/ui/InputField";
import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import BookTable from "../components/BookTable";
import FlashMessage from "../components/ui/FlashMessage";
import useFetchPagination from "../hooks/useFetchPagination";
import PaginationLinks from "../components/ui/PaginationLinks";
import loaderPicture from "/images/loading-3.gif";

function DenyBooking() {
  const navigate = useNavigate();
  const [search, setSearch] = useState(null);
  const [page, setPage] = useState(1);
  const [reload, setReload] = useState(false);

  let url = "";
  if (search) {
    url = `/api/booking/?status=3&search=${search}&page=${page}`;
  } else {
    url = `/api/booking/?status=3&page=${page}`;
  }

  const { data, links, isLoading, message, clearMessage } = useFetchPagination(
    url,
    reload
  );

  return (
    <div className="dashboard--content category">
      <ContentHeader />
      <div className="hr"></div>
      <div className="header--content">
        <span>List Desapproval Bookings</span>
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
            handleChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <i
          className="btn-icon fa fa-eye"
          onClick={() => navigate("/dashboard/approve-bookings")}
        ></i>
      </div>
      {message && (
        <FlashMessage
          message={message.message}
          isSuccess={message.success}
          clearMessage={clearMessage}
        />
      )}
      <BookTable bookings={data} page="denied" />
      {isLoading && (
        <div className="loader">
          <img src={loaderPicture} width={100} height={100} />
        </div>
      )}

      <PaginationLinks
        count={links.count}
        next={links.next}
        previous={links.previous}
        setPage={setPage}
        page={page}
      />
    </div>
  );
}

export default DenyBooking;
