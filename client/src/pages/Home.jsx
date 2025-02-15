import React, { useState } from "react";
import HomePageNav from "../components/HomePageNav";
import HomeText from "../components/HomeText";
import ServiceCategory from "../components/ServiceCategory";
import useFetchAll from "../hooks/useFetchAll";
import useFetchAllTwo from "../hooks/useFetchAllTwo";

function Home() {
  const { data, isLoading, message, clearMessage } = useFetchAll(
    "/api/categories/no_pagination/"
  );
  const [categoryId, setCategoryId] = useState(null);
  let url = "";
  if (categoryId) {
    url = `/api/services/filter/?category=${categoryId}`;
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

  const handleClicked = (id) => {
    setIsClicked({ id: id, status: true });
    setCategoryId(id);
  };
  return (
    <div className="app-container">
      <div className="intro">
        <div className="mask">
          <HomePageNav />
          <HomeText />
        </div>
      </div>
      <ServiceCategory
        data={data}
        isLoading={isLoading}
        message={message}
        clearMessage={clearMessage}
        handleClicked={handleClicked}
        isClicked={isClicked}
      />
    </div>
  );
}

export default Home;
