import Yup from "../config/yup";
const validationRegister = Yup.object({
  firstName: Yup.string().label("First name").required(),
  lastName: Yup.string().label("Last name").required(),
  email: Yup.string().label("Email").email().required(),
  password: Yup.string().label("Password").isValildPassword(),
  confirmPasword: Yup.string()
    .label("Confirm password")
    .required()
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  birthDate: Yup.date().label("Birth date").isValildDate(),
  gender: Yup.string().label("Gender").required(),
  phone: Yup.string().label("Phone").isValildPhone(),
  term: Yup.boolean().label("Terms").oneOf([true], "Please agree our terns"),
});
export default validationRegister;
