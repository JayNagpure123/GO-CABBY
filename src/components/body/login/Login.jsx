import { useFormik } from "formik";
import * as Yup from "yup";
import ApiService from "../../../services/ApiService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { Form, InputGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import styles from './login.module.css';

const Login = () => {
  const navigate = useNavigate();
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await ApiService.login(values);
        const data = await response.data;
        localStorage.setItem("jwtToken", data.token);
        
        const role = data.authorities[0].authority;
        localStorage.setItem("userRole", role);
  
        if (role === "MOTORIST" || role === "RIDER") {
          navigate("/home");
          toast.success("You have successfully logged in!", { position: "top-center" });
        } else if (role === "SECURITYHEAD") {
          navigate("/applications");
          toast.success("Security Head has successfully logged in!", { position: "top-center" });
        }
  
      } catch (error) {
        setInvalidCredentials(true);
      }
    },
  });

  return (
    <div className={styles.backimage}>
      <section>
        <div className="px-4 py-5 px-md-5 text-center text-lg-start">
          <div className="container">
            <div className="d-grid d-md-flex justify-content-md-end">
              <div className="col-lg-6 mb-5 mb-lg-0">
                <div className="card" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', boxShadow: '0 4px 8px rgba(255, 255, 255, 0.5)' }}>
                  <div className="card-body py-4 px-md-5">
                    <Form onSubmit={formik.handleSubmit}>
                      {invalidCredentials && (
                        <div className="alert alert-danger text-center" role="alert">
                          Invalid Credentials
                        </div>
                      )}
                      <h5 className="text-dark my-2 display-6 fw-bold ls-tight text-center mb-4">
                        User Login
                      </h5>
                      <div className="mb-3">
                        <Form.Label htmlFor="username">Username</Form.Label>
                        <Form.Control
                          type="text"
                          id="username"
                          className={`form-control ${formik.touched.username && formik.errors.username && "is-invalid"}`}
                          placeholder="Username"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.username}
                        />
                        {formik.touched.username && formik.errors.username && (<p className="text-danger">{formik.errors.username}</p>)}
                      </div>
                      <div className="mb-3">
                        <Form.Label htmlFor="password">Password</Form.Label>
                        <InputGroup>
                          <Form.Control
                            type={showPassword ? "text" : "password"}
                            id="password"
                            className={`form-control ${formik.touched.password && formik.errors.password && "is-invalid"}`}
                            placeholder="Password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                          />
                          <Button variant="outline-secondary" onClick={toggleShowPassword}>
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                          </Button>
                        </InputGroup>
                        {formik.touched.password && formik.errors.password && (<p className="text-danger">{formik.errors.password}</p>)}
                      </div>
                      <p>
                        Not a User? <a href="/register">Register</a>
                      </p>
                      <div className="mb-3">
                        <Button className="btn btn-dark" type="submit">
                          Login
                        </Button>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;


