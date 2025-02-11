import { formatToDateString, convertToDateTime } from "../utils/dateFormat.mjs";
import { addComma } from "../utils/addComma.mjs";
export default function CategoyTable({
  categories,
  openEditModal,
  openDeleteModal,
}) {
  return (
    <table className="dashboard-content-table">
      {/* <caption>categorie/Coffe List</caption> */}
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Description</th>
          <th>Photo</th>
          <th>Date Created</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {categories.length > 0 ? (
          categories.map((category, index) => {
            return (
              <tr key={index + 1}>
                <td data-cell="#">{index + 1}</td>
                <td data-cell="Name">{category.name}</td>
                <td data-cell="Category">{category.description}</td>
                <td data-cell="Price">-</td>
                <td data-cell="Date">
                    -
                  {/* {convertToDateTime(category.created_at)} */}
                </td>
                <td data-cell="Action">
                  <div className="action-btns">
                    <i
                      className="fa fa-pen-to-square text-primary"
                      onClick={() => openEditModal(index, "edit")}
                    ></i>{" "}
                    <i
                      className="fa fa-trash-can"
                      onClick={() => openDeleteModal(index, "delete")}
                    ></i>
                  </div>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={6} style={{ textAlign: "center", color: "red" }}>
              No data
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
