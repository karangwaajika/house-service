import React from "react";
import ContentHeader from "../components/ContentHeader";
import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import FlashMessage from "../components/ui/FlashMessage";
import useFetchPagination from "../hooks/useFetchPagination";
import PaginationLinks from "../components/ui/PaginationLinks";
import loaderPicture from "/images/loading-3.gif";
import ServiceTable from "../components/ServiceTable";
import Button from "@/components/ui/Button";

import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";

export const serviceContext = createContext();

function AllReports() {
  const navigate = useNavigate();
  const [search, setSearch] = useState(null);
  const [page, setPage] = useState(1);
  const [reload, setReload] = useState(false);

  const [value, setValue] = React.useState([
    dayjs("2022-04-17"),
    dayjs("2022-04-21"),
  ]);

  let url = "";
  if (search) {
    url = `/api/services/?search=${search}&page=${page}`;
  } else {
    url = `/api/services/?page=${page}`;
  }

  const {
    data,
    links,
    isLoading,
    message,
    setData,
    setLinks,
    setMessage,
    setIsLoading,
    clearMessage,
  } = useFetchPagination(url, reload, search);

  return (
    <div className="dashboard--content category reports">
      <ContentHeader />
      <div className="hr"></div>
      <div className="header--content">
        <span>List Service Category</span>
      </div>
      <div className="view-category-header">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateRangePicker"]}>
            <DateRangePicker
              value={value}
              onChange={(newValue) => setValue(newValue)}
              localeText={{ start: "From", end: "To" }}
              slotProps={{ textField: { size: "small" } }}
            />
          </DemoContainer>
        </LocalizationProvider>
        <i
          className="btn-icon fa fa-print report-icon"
          onClick={() => navigate("/dashboard/add-service")}
        ></i>
      </div>
      {message && (
        <FlashMessage
          message={message.message}
          isSuccess={message.success}
          clearMessage={clearMessage}
        />
      )}
      <ServiceTable services={data} />
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

export default AllReports;
