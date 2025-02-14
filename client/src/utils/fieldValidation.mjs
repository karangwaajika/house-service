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
  if (arg.service !== undefined) {
    if (!arg.service.trim()) {
      errorsValidation.service = "service field is required";
    }
  }
  if (arg.address !== undefined) {
    if (!arg.address.trim()) {
      errorsValidation.address = "address field is required";
    }
  }
  if (arg.address !== undefined) {
    if (!arg.address.trim()) {
      errorsValidation.address = "address field is required";
    }
  }
  if (arg.email !== undefined) {
    if (!arg.email.trim()) {
      errorsValidation.email = "email field is required";
    }
  }
  if (arg.price !== undefined) {
    if (arg.price == 0) {
      errorsValidation.price = "Price is required";
    } else if (price < 100) {
      errorsValidation["price"] = "Price can't be less than 100";
    } else if (!/^[0-9]+$/.test(arg.price)) {
      errorsValidation.price = "Only digits are allowed";
    }
  }
  if (arg.phone !== undefined) {
    if (arg.phone=="") {
      errorsValidation.phone = "phone is required";
    } else if (arg.phone.toString().length < 9) {
      errorsValidation.phone = "digits are incomplete";
    } else if (!/^[0-9 +]+$/.test(arg.phone)) {
      errorsValidation.phone = "Use numbers only";
    }
  }

  return errorsValidation;
}
