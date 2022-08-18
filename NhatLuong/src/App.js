import "./App.css";
import { useForm } from "react-hook-form";
import validationRegister from "./validators/register";
import { yupResolver } from "@hookform/resolvers/yup";

function App() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(validationRegister),
    mode: "onChange",
  });
  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };
  return (
    <div className="card">
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label>First Name</label>
              <input type="text" {...register("firstName")} />
              {errors.firstName && (
                <p className="error">{errors.firstName.message}</p>
              )}
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label h>Last Name</label>
              <input type="text" {...register("lastName")} />
              {errors.lastName && (
                <p className="error">{errors.lastName.message}</p>
              )}
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label>Email</label>
              <input type="text" {...register("email")} />
              {errors.email && <p className="error">{errors.email.message}</p>}
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label>Gender</label>
              <select {...register("gender")}>
                <option value="">Select your gender</option>
                <option value="1">Male</option>
                <option value="2">Female</option>
              </select>
              {errors.gender && (
                <p className="error">{errors.gender.message}</p>
              )}
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label>Birth Date</label>
              <input
                type="date"
                defaultValue="1901-01-01"
                {...register("birthDate")}
              />
              {errors.birthDate && (
                <p className="error">{errors.birthDate.message}</p>
              )}
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label>Phone</label>
              <input type="phone" {...register("phone")} />
              {errors.phone && <p className="error">{errors.phone.message}</p>}
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label>Passwords</label>
              <input type="password" {...register("password")} />
              {errors.password && (
                <p className="error">{errors.password.message}</p>
              )}
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label>Confirm</label>
              <input type="password" {...register("confirmPasword")} />
              {errors.confirmPasword && (
                <p className="error">{errors.confirmPasword.message}</p>
              )}
            </div>
          </div>
          <div className="col">
            <input type="checkbox" {...register("term")} />
            <label>Remember me</label>
            {errors.term && (
              <p className="error error-terms">{errors.term.message}</p>
            )}
          </div>
          <div className="col w-100">
            <input className="w-100" type="submit" value="Submit" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
