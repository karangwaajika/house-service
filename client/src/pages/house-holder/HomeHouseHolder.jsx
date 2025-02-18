import logoPic from "/images/logo.png";
import React, { useState } from "react";
import useFetchAll from "@/hooks/useFetchAll";
import ServiceCategory from "@/components/ServiceCategory";
import ServicesList from "@/components/ServicesList";

function HomeHouseHolder() {
  const { data, isLoading, message, clearMessage } = useFetchAll(
    "/api/categories/no_pagination/"
  );
  const [categoryId, setCategoryId] = useState({ id: null, name: null });
  let url = "";
  if (categoryId.id) {
    url = `/api/services/filter/?category=${categoryId.id}`;
  } else {
    url = `/api/services/no_pagination/`;
  }
  const {
    data: serviceData,
    isLoading: serviceIsLoading,
    message: serviceMessage,
    clearMessage: serviceClearMessage,
  } = useFetchAll(url);

  const [isClicked, setIsClicked] = useState({ id: null, status: false });

  const handleClicked = (id, name) => {
    setIsClicked({ id: id, status: true });
    setCategoryId({ id: id, name: name });
    console.log("clicked", id);
  };
  return (
    <div className="house-content">
      <ServiceCategory
        data={data}
        isLoading={isLoading}
        message={message}
        clearMessage={clearMessage}
        handleClicked={handleClicked}
        isClicked={isClicked}
      />
      <ServicesList
        data={serviceData}
        isLoading={serviceIsLoading}
        category_name={categoryId.name}
      />
    </div>
  );
}

export default HomeHouseHolder;
