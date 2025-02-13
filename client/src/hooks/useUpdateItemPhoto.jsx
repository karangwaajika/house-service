import { useState, useContext } from "react";
import axios from "axios";
import { serviceContext } from "../pages/ViewService";
import { axiosHeader } from "../utils/axiosHeader";
export default function useUpdateItemPhoto(
  closeModal,
  itemIndex,
  itemId,
  pageName
) {
  let update = "";
  if (pageName == "service") {
    update = useContext(serviceContext);
  }
  //   handle files
  const [file, setFiles] = useState();
  const handleFile = (e) => {
    setFiles(e.target.files[0]);
  };

  // handle form input error
  const [fieldError, setFieldError] = useState({});
  const validateSubmitForm = async () => {
    const validatedFields = {};
    if (!file) {
      validatedFields.file = "you didn't upload any file";
      setFieldError(validatedFields);
    }
    if (Object.keys(validatedFields).length == 0) {
      if (pageName == "service") {
        submitService();
      }
    }
  };

  const submitService = () => {
    // close the modal when button clicked
    closeModal(itemIndex, "photo");
    console.log("file upload", file);
    // display loading icon
    update.setIsLoading(true);
    axios.defaults.headers.common["Authorization"] = `Bearer ${
      axiosHeader.jwt ? axiosHeader.jwt : axiosHeader.google
    }`;
    const data = new FormData();
    data.append("image", file, file.name);
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    axios
      .patch(axiosHeader.url + `/api/services/update/${itemId}`, data, config)
      .then((res) => {
        update.setMessage({
          success: true,
          message: "Photo updated successfuly",
        });
        update.setReload((old) => !old);
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
  const submitAddPhoto = () => {
    // close the modal when button clicked
    closeModal(categoryIndex, "photos");
    console.log("file upload", file);
    // display loading icon
    update.setIsLoading(true);
    axios.defaults.headers.common["Authorization"] = `Bearer ${
      axiosHeader.jwt ? axiosHeader.jwt : axiosHeader.google
    }`;
    const data = new FormData();
    data.append("image", file, file.name);
    data.append("category", categoryId);
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    axios
      .post(axiosHeader.url + `/api/category/image/add/`, data, config)
      .then((res) => {
        update.setMessage({
          success: true,
          message: "Photo added successfuly",
        });
        update.setReload((old) => !old);
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
    fieldError,
    file,
    handleFile,
    validateSubmitForm,
  };
}
