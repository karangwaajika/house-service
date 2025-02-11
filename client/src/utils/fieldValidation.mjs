export default function fieldValidation({
  ...arg
}) {
  const errorsValidation = {};
  if (arg.name !== undefined) {
    if (!arg.name.trim()) {
      errorsValidation.name = "Name is required";
    } else if (arg.name.length < 3) {
      errorsValidation.name = "Characters should be greater than 3";
    } else if (!/^[a-zA-Z -]+$/.test(arg.name)) {
      errorsValidation.name = "Use letters only";
    }
  }
  if (arg.files.length == 0 || Object.keys(arg.files).length == 0){
    errorsValidation.files = "Please upload/Reupload an image";
  }

  if (arg.description !== undefined) {
    if (!arg.description.trim()) {
      errorsValidation.description = "Description field is required";
    }
  }

  return errorsValidation;
}
