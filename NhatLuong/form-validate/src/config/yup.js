import * as Yup from "yup";


const defaultMessage = {
  mixed: {
    required: "${label} must be required",
  },
  string: {
    min: "${label} must be greater than ${min} charater",
    email: "Email is invalid",
  },
};
function isValildPassword() {
  return this.min(8)
    .max(64)
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, {
      message:
        "Passwords Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character",
    })
    .required();
}
function isValildPhone() {
  return this.required().matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, {
    message: "Phone number wrong",
  });
}
function isValidDate() {
  const maxDate = new Date();
  const minDate = new Date("December 31, 1900 00:00:00");
  maxDate.setHours(0, 0, 0, 0);
  return this.min(minDate, "Year > 1900").max(
    maxDate,
    "Birthdate cannot be in future"
  );
}
Yup.addMethod(Yup.string, "isValildPhone", isValildPhone);
Yup.addMethod(Yup.date, "isValildDate", isValidDate);
Yup.addMethod(Yup.string, "isValildPassword", isValildPassword);
Yup.setLocale(defaultMessage);

export default Yup;
