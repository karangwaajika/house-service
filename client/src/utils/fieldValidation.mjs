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
  if (arg.files !== undefined) {
    if (arg.files.length == 0 || Object.keys(arg.files).length == 0){
      errorsValidation.files = "Please upload/Reupload an image";
    }
    if(arg.files.length > 6){
      errorsValidation.files = "You can't upload files more than six";
    }
}

if (arg.file !== undefined) {
  if (arg.file.length == 0 || Object.keys(arg.file).length == 0){
    errorsValidation.file = "Please upload/Reupload an image";
  }
  
}

  if (arg.description !== undefined) {
    if (!arg.description.trim()) {
      errorsValidation.description = "Description field is required";
    }
  }
  if (arg.category !== undefined) {
    if (!arg.category.trim()) {
      errorsValidation.category = "Category field is required";
    }
  }

  return errorsValidation;
}
