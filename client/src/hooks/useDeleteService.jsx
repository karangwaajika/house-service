import { useState, useContext } from "react";
import axios from "axios";
import { serviceContext } from "../pages/Viewservice";
import { axiosHeader } from "../utils/axiosHeader";
export default function useDeleteService(service, closeModal, serviceIndex) {
  const update = useContext(serviceContext);

  const submitForm = (e) => {
    // close the modal when button clicked
    e.preventDefault();
    closeModal(serviceIndex, "delete");

    // display loading icon
    update.setIsLoading(true);
    axios.defaults.headers.common["Authorization"] = `Bearer ${
      axiosHeader.jwt ? axiosHeader.jwt : axiosHeader.google
    }`;

    axios
      .delete(axiosHeader.url + `/api/services/delete/${service.id}`)
      .then((res) => {
        update.setMessage({
          success: false,
          message: "Service deleted successfuly",
        });

        // update categories' List
        update.setData((oldData) => {
          const newList = oldData.filter((item, i) => {
            return item.id !== service.id;
          });
          return newList;
        });
      })
      .catch((err) => {
        if (err.message !== "canceled") {
          update.setMessage({
            success: false,
            message: err.message,
          });
        }
        if (err.status == 401) {
          update.setMessage({
            success: false,
            message: "You need to login first!, Token Expired!",
          });
        } else if (err.status == 400) {
          update.setMessage({
            success: false,
            message: err.response.data,
          });
        } else if (err.code == "ERR_NETWORK") {
          update.setMessage({
            success: false,
            message: "Please check your internet connection",
          });
        } else {
          update.setMessage({
            success: false,
            message: err.message,
          });
        }
      })
      .finally(() => {
        update.setIsLoading(false);
      });
  };
  return {
    submitForm,
  };
}
