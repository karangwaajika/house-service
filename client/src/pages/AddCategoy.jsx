import React from "react";
import ContentHeader from "../components/ContentHeader";
import CategoryForm from "../components/CategoryForm";
import { useState } from "react";
import axios from "axios";
import fieldValidation from "../utils/fieldValidation.mjs";
import { axiosHeader } from "../utils/axiosHeader";

function AddCategoy() {
  const [message, setMessage] = useState();
  const clearMessage = () => {
    setMessage();
  };
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
  });
  //   handle files
  const [files, setFiles] = useState({});
  const handleFile = (e) => {
    setFiles(e.target.files);
  };
  const removeFile = (index) => {
    setFiles((oldFiles) => {
      return [...oldFiles].filter((_, i) => i != index);
    });
  };

  // handle form input error
  const [fieldError, setFieldError] = useState({});
  const validateSubmitForm = async (e) => {
    e.preventDefault();
    const inputFields = {
      name: form.name,
      files: files,
      description: form.description,
    };
    const validatedFields = fieldValidation(inputFields);
    setFieldError(validatedFields);
    console.log(Object.keys(validatedFields).length);
    if (Object.keys(validatedFields).length == 0) {
      submitForm();
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((oldForm) => {
      return { ...oldForm, [name]: value };
    });
  };
  const submitForm = () => {
    setIsLoading(true);
    console.log("jwt", axiosHeader.jwt);
    console.log("google", axiosHeader.google);
    axios.defaults.headers.common["Authorization"] = `Bearer ${
      axiosHeader.jwt ? axiosHeader.jwt : axiosHeader.google
    }`;
    const data = new FormData();
    data.append("name", form.name);
    data.append("description", form.description);
    [...files].forEach((item) =>
      data.append("uploaded_images", item, item.name)
    );

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    axios
      .post(axiosHeader.url + "/api/categories/create/", data, config)
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          setMessage(res.data);
        } else {
          setMessage(res.data);
        }
      })
      .catch((err) => {
        console.error(err);
        setMessage({
          success: false,
          message: err.message,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="dashboard--content category">
      <ContentHeader />
      <div className="hr"></div>
      <div className="header--content">
        <span>Add Serice Category</span>
      </div>
      <CategoryForm
        message={message}
        isLoading={isLoading}
        form={form}
        handleChange={handleChange}
        submitForm={validateSubmitForm}
        clearMessage={clearMessage}
        fieldError={fieldError}
        handleFile={handleFile}
        files={files}
        removeFile={removeFile}
      />
    </div>
  );
}

export default AddCategoy;
