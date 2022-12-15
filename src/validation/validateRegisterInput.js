import validator from "validator";

const validateRegisterInput = (data) => {
  let errors = {};

  const { name, email, password, password_confirmation} = data;

  if (localStorage.users) {
    let lsUsers = localStorage.users;
    lsUsers = JSON.parse(lsUsers);
    let index = lsUsers.findIndex((user) => user.name === name);
    if (index > -1) {
      errors.name = "Username already exists!";
    }
  }

  if (validator.isEmpty(name)) {
    errors.name = "Username field is required.";
  }

  if (!validator.isEmail(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (validator.isEmpty(email)) {
    errors.email = "Email field is required.";
  }

  if (validator.isEmpty(password)) {
    errors.password = "Password field is required.";
  }

  if (!validator.equals(password, password_confirmation)) {
    errors.password2 = "Password should match!";
  }

  if (validator.isEmpty(password_confirmation)) {
    errors.password2 = "Confirm Password field is required.";
  }

  return {
    isInvalid: Object.keys(errors).length > 0,
    errors: errors,
  };
};

export default validateRegisterInput;