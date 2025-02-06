import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ApiService from "../../../services/ApiService";
import MotoristDetails from "./MotoristDetails";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from './signup.module.css'

const SignUp = () => {
  const path = useNavigate();

  const [companies, setCompanies] = useState([]);
  const [motorist, setMotorist] = useState(false);
  const [motoristDetails, setMotoristDetails] = useState({
    licenseNo: "",
    expirationDate: "",
    rta: "",
    allowedVehicles: ""
  });
  const [motoristError, setMotoristError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function getCompanies() {
      try {
        const response = await ApiService.getCompanies();
        const data = await response.data;
        setCompanies(data);
      } catch (error) {
        console.log(error);
      }
    }
    getCompanies();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      officialEmail: "",
      phoneNumber: "",
      role: "",
      designation: "",
      employeeId: "",
      aadharNumber: "",
      companyId: "",
    },
    validationSchema: Yup.object({
        username: Yup.string().required("Username is required"),
        password: Yup.string().required("Password is required"),
        officialEmail: Yup.string().email("Invalid email format").required("Email is required"),
        phoneNumber: Yup.string().matches(/^\d{10}$/, "Phone number must be exactly 10 digits").required("Phone number is required"),
        designation: Yup.string().required("Designation is required"),
        employeeId: Yup.string().required("Employee ID is required"),
        aadharNumber: Yup.string().matches(/^\d{12}$/, "Aadhar number must be exactly 12 digits").required("Aadhar number is required"),
        companyId: Yup.string().required("Company is required"),
        role: Yup.string().oneOf(["Motorist", "Rider"], "Role must be Motorist or Rider").required("Role is required"),
    }),
    onSubmit: async (values) => {
      if (motorist) 
      {
        const { licenseNo, expirationDate, rta, allowedVehicles } = motoristDetails;
        if (!licenseNo || !expirationDate || !rta || !allowedVehicles) 
        {
          setMotoristError("All motorist details are required.");
          return;
        }
      }

      try {
        if (!motorist) {
          try{
          await ApiService.addRider({
            username: values.username,
            officialEmail: values.officialEmail,
            phoneNumber: values.phoneNumber,
            companyId: values.companyId,
            designation: values.designation,
            role: "Rider",
            employeeId: values.employeeId,
            aadharNumber: values.aadharNumber,
          });
          await ApiService.register({ username: values.username, password: values.password, roles: "RIDER" });
            
          toast.success("Register Successfull as Rider", {position: "top-center"});
        }
              catch(error)
              {
                console.log(error.response.data);
                setErrorMessage(error.response.data);
              }
        } else {
          try{
          await ApiService.addMotorist({
            username: values.username,
            officialEmail: values.officialEmail,
            phoneNumber: values.phoneNumber,
            companyId: values.companyId,
            designation: values.designation,
            role: "Motorist",
            employeeId: values.employeeId,
            aadharNumber: values.aadharNumber,
          }, motoristDetails);
          await ApiService.register({ username: values.username, password: values.password, roles: "MOTORIST" });
            
          toast.success("Register Successfull as Motorist", {position: "top-center"});
        }
            catch(error)
            {
              console.log(error.response.data);
              setErrorMessage(error.response.data);
              return;
            }
        }
      } catch (error) {
        console.log(error.response.data);
      }
    },
  });

  return (
    <div className={`${styles.canvas}`}>
      <section>
        <div className="px-4 py-5 px-md-5 text-center text-lg-start">
          <div className="container">
            <div className="  d-grid d-md-flex justify-content-md-end">
              <div className="col-lg-6 mb-5 mb-lg-0">
                <div className="card" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', boxShadow: '0 4px 8px rgba(255, 255, 255, 0.5)'  }}>
                  <div className="card-body py-4 px-md-5" style={{ backgroundColor: 'rgba(0.0)' }}>
                    <form onSubmit={formik.handleSubmit}>
                      {errorMessage && (
                        <div className="alert alert-danger text-center" role="alert">
                          {errorMessage}
                        </div>
                      )}

                      <h5 className="text-dark my-2 display-6 fw-bold ls-tight text-center mb-4">
                        User Registration
                      </h5>
                      
                      <div className="mb-3">
                        <input
                          type="text"
                          className={`form-control ${formik.touched.username && formik.errors.username && "is-invalid"}`}
                          placeholder="Username"
                          name="username"
                          id="username"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.username}
                        />
                        {formik.touched.username && formik.errors.username && (<p className="text text-danger">{formik.errors.username}</p>)}
                      </div>

                      <div className="mb-3">
                        <input
                          type="password"
                          className={`form-control ${formik.touched.password && formik.errors.password && "is-invalid"}`}
                          placeholder="Password"
                          name="password"
                          id="password"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.password}
                        />
                        {formik.touched.password && formik.touched.password && (<p className="text text-danger">{formik.errors.password}</p>)}
                      </div>

                      <div className="mb-3">
                        <input
                          type="email"
                          className={`form-control ${formik.touched.officialEmail && formik.errors.officialEmail && "is-invalid"}`}
                          placeholder="Email"
                          name="officialEmail"
                          id="officialEmail"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.officialEmail}
                        />
                        {formik.touched.officialEmail && formik.errors.officialEmail && (<p className="text text-danger">{formik.errors.officialEmail}</p>)}
                      </div>

                      <div className="row mb-3">
                      <div className="col-md-5 col">
                        <input
                          type="number"
                          className={`form-control ${formik.touched.employeeId && formik.errors.employeeId && "is-invalid"}`}
                          placeholder="Employee Id"
                          name="employeeId"
                          id="employeeId"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.employeeId}
                        />                        
                        {formik.touched.employeeId && formik.errors.employeeId && (<p className="text text-danger">{formik.errors.employeeId}</p>)}
                      </div>

                      <div className="col-md-7 col">
                        <input
                          type="text"
                          className={`form-control ${formik.touched.designation && formik.errors.designation && "is-invalid"}`}
                          placeholder="Designation"
                          name="designation"
                          id="designation"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.designation}
                        />                        
                        {formik.touched.designation && formik.errors.designation && (<p className="text text-danger">{formik.errors.designation}</p>)}
                      </div>
                      </div>

                      <div className="row mb-3">
                      <div className="col-md-5 col">
                        <input
                          type="number"
                          className={`form-control ${formik.touched.phoneNumber && formik.errors.phoneNumber && "is-invalid"}`}
                          placeholder="Phone Number"
                          name="phoneNumber"
                          id="phoneNumber"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.phoneNumber}
                        />
                        {formik.touched.phoneNumber && formik.errors.phoneNumber && (<p className="text text-danger">{formik.errors.phoneNumber}</p>)}
                      </div>
                      
                      <div className="col-md-7 col">
                        <input
                          type="number"
                          className={`form-control ${formik.touched.aadharNumber && formik.errors.aadharNumber && "is-invalid"}`}
                          placeholder="Aadhar Number"
                          name="aadharNumber"
                          id="aadharNumber"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.aadharNumber}
                        />                        
                        {formik.touched.aadharNumber && formik.errors.aadharNumber && (<p className="text text-danger">{formik.errors.aadharNumber}</p>)}
                      </div>
                      </div>

                      <div className="row">
                        <div className="col-md-8 col">
                          <select
                            name="companyId"
                            id="company"
                            className={`form-select ${formik.touched.companyId && formik.errors.companyId && "is-invalid"}`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.companyId}
                          >
                            <option value="">Select Company</option>
                            {companies.map((data, index) => (
                              <option key={index} value={data.id}>
                                {data.companyName}
                              </option>
                            ))}
                          </select>
                          {formik.touched.companyId && formik.errors.companyId && (<p className="text text-danger">{formik.errors.companyId}</p>)}
                        </div>

                        <div className="col-md-4 col">
                          <select
                            name="role"
                            id="role"
                            className={`form-select ${formik.touched.role && formik.errors.role && "is-invalid"}`}
                            onChange={(event) => {
                              formik.handleChange(event);
                              setMotorist(event.target.value === "Motorist");
                            }}
                            onBlur={formik.handleBlur}
                            value={formik.values.role}
                          >
                            <option value="">Select Role</option>
                            <option value="Rider">Rider</option>
                            <option value="Motorist">Motorist</option>
                          </select>
                          {formik.touched.role && formik.errors.role && (<p className="text text-danger">{formik.errors.role}</p>)}
                        </div>
                      </div>

                      {motoristError && <div className="alert alert-danger text-center mt-3" role="alert">
                            {motoristError}
                      </div>}

                      {motorist && (
                        <>
                          <MotoristDetails
                            data={{
                              setLicenseNo: (value) =>
                                setMotoristDetails((prev) => ({ ...prev, licenseNo: value })),
                              setAllowedVehicles: (value) =>
                                setMotoristDetails((prev) => ({ ...prev, allowedVehicles: value })),
                              setExpirationDate: (value) =>
                                setMotoristDetails((prev) => ({ ...prev, expirationDate: value })),
                              setRta: (value) =>
                                setMotoristDetails((prev) => ({ ...prev, rta: value })),
                            }}
                          />
                        </>
                      )}

                      <p className="mt-3">
                        Already a User? <a href="/login">Login</a>
                      </p>
                      <div className="mt-3">
                        <button type="submit" className="btn btn-dark">
                          Register
                        </button>
                      </div>
                    </form>
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

export default SignUp;