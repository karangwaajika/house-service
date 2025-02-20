import React, { useState, useContext } from "react";
import useFetchAll from "@/hooks/useFetchAll";
import { useParams } from "react-router-dom";
import ServiceCategory from "@/components/house-holder/ServiceCategoryH";
import BookCategory from "@/components/house-holder/BookCategory";
import WorkerProfile from "@/components/house-holder/WorkerProfile";
import BookModal from "@/components/house-holder/BookModal";
import { userContext } from "@/pages/house-holder/RootHouseHolder";

function ViewCategoryService() {
  const params = useParams();
  const queryParams = new URLSearchParams(window.location.search);
  const accessCategoryId = queryParams.get("category_id");
  const accessCategoryName = queryParams.get("category_name");
  const accessServiceId = queryParams.get("service_id");
  const contextData = useContext(userContext);

  // all categories
  const { data, isLoading, message, clearMessage } = useFetchAll(
    `/api/categories/no_pagination/`
  );

  // category data
  const {
    data: categoryData,
    isLoading: categoryIsLoading,
    message: categoryMessage,
    clearMessage: categoryClearMessage,
  } = useFetchAll(`/api/categories/${accessCategoryId}`);

  // a service data
  const {
    data: serviceData,
    isLoading: serviceIsLoading,
    message: serviceMessage,
    clearMessage: serviceClearMessage,
  } = useFetchAll(`/api/services/${accessServiceId}`);

  // services data
  const {
    data: servicesData,
    isLoading: servicesIsLoading,
    message: servicesMessage,
    clearMessage: servicesClearMessage,
  } = useFetchAll(`/api/services/filter/?category=${accessCategoryId}`);
  console.log("s", servicesData);

  // handle modals
  const [animation, setAnimation] = useState("animated slideInRight");

  const [openModal, setOpenModal] = useState(false);

  const handleModal = () => {
    setAnimation(
      openModal ? "animated slideOutRight" : "animated slideInRight"
    );
    setTimeout(() => {
      setOpenModal((oldModalState) => !oldModalState);
    }, 1000);
  };

  return (
    <div className="house--content">
      <ServiceCategory
        data={data}
        isLoading={isLoading}
        message={message}
        clearMessage={clearMessage}
        category_id={accessCategoryId}
      />
      <div className="book--content">
        <WorkerProfile data={serviceData.workers} />
        <BookCategory
          data={categoryData}
          services={servicesData}
          service_id={accessServiceId}
          handleModal={handleModal}
        />
      </div>
      {openModal && (
        <BookModal
          animate={animation}
          handleCloseModal={handleModal}
          service_id={accessServiceId}
          client_id={contextData.userData.id && contextData.userData.id}
          workers = {serviceData.workers}
        />
      )}
    </div>
  );
}

export default ViewCategoryService;
