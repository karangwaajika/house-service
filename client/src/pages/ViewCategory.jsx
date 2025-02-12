import React from "react";
import ContentHeader from "../components/ContentHeader";
import InputField from "../components/ui/InputField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoyTable from "../components/CategoryTable";
import useFetchAutoComplete from "../hooks/useFetchAutoComplete";
import FlashMessage from "../components/ui/FlashMessage";
import useFetchPagination from "../hooks/useFetchPagination";
import { use } from "react";
import PaginationLinks from "../components/ui/PaginationLinks";

function ViewCategory() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  console.log("myPAge",page)
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
  } = useFetchPagination("/api/categories/"+`?page=${page}`, page);
  return (
    <div className="dashboard--content category">
      <ContentHeader />
      <div className="hr"></div>
      <div className="header--content">
        <span>List Serice Category</span>
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
          className="btn-icon fa fa-plus"
          onClick={() => navigate("/dashboard/add-category")}
        ></i>
      </div>
      {message && (
        <FlashMessage
          message={message.message}
          isSuccess={message.success}
          clearMessage={clearMessage}
        />
      )}
      <CategoyTable categories={data} />
      <PaginationLinks
        count={links.count}
        next={links.next}
        previous={links.previous}
        setPage={setPage}
        page = {page}
      />
    </div>
  );
}

export default ViewCategory;
