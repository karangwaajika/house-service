import React from "react";
import Button from "./ui/Button";
import InputFile from "./ui/InputFile";

function PhotosModal({ closeModal, allCategories, categoryIndex, animate }) {
  const category = allCategories[categoryIndex];
  const handleCloseModal = (e) => {
    if (e.target.className == `modal ${animate}`) {
      closeModal(categoryIndex, "photos");
    }
  };
  return (
    <div className={`modal ${animate}`} onClick={handleCloseModal}>
      <div className="modal-pics-contents">
        <div className="modal-header">
          <h4>Update {category.name}'s photos</h4>
          <div
            className="modal-close-button"
            onClick={() => closeModal(categoryIndex, "photos")}
          >
            <i className="fa fa-rectangle-xmark"></i>
          </div>
        </div>
        <div className="modal-pics">
          {category.images.map((item, i) => {
            return (
              <div className="card photos" key={i}>
                <div className="profile card-header">
                  <img src={item.image} alt="image" width={300} height={300} />
                </div>
                <div className="card-body">
                  <span className="photo-name">Photo {i + 1}</span>
                  <div className="buttons" style={{ gap: "5px" }}>
                    {/* {fieldError.files && (
                  <i className="error-text">{fieldError.files}</i>
                )} */}
                    <InputFile
                      name={`file${i}`}
                      id={`file${i}`}
                      //   errorfield={fieldError.files && "error-field"}
                      label={`file${i}`}
                      icon="fa fa-upload"
                      placeholder="file"
                      //   handleChange={handleFile}
                    />
                    <Button
                      text="Update"
                      className="btn-dark"
                      onClick={handleCloseModal}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PhotosModal;
