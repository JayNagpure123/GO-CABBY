import { useFormik } from "formik";
import * as Yup from "yup";

const sixMonthsFromNow = new Date();
sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);

const MotoristDetails = (props) => {
    const formik = useFormik({
        initialValues: {
          licenseNo: "",
          expirationDate: "",
          rta: "",
          allowedVehicles: ""
        },
        validationSchema: Yup.object({
          licenseNo: Yup.string().matches(/^[A-Z]{3}\d{4}[A-Z]{3}$/, "Driving license number must be 10 characters in format as 3 letters followed by 4 digits and 3 letters").required("License number is required"),
          expirationDate: Yup.date().min(sixMonthsFromNow, "Expiration date must be at least 6 months from today").required("Expiration date is required"),
          rta: Yup.string().required("RTA is required"),
          allowedVehicles: Yup.string().required("Allowed vehicles is required")
        })
    });
  return (
    <>
      <h3 className="text-dark my-2 fw-bold ls-tight text-center mt-4 fs-4">Driving License Details</h3>
      <div className="mb-3 mt-3" >
        <input
          type="text"
          placeholder="License No"
          name="licenseNo"
          id="licenseNo"
          className={`form-control ${formik.touched.licenseNo && formik.errors.licenseNo && "is-invalid"}`}
          onChange={(event) => {
            props.data.setLicenseNo(event.target.value);
            formik.handleChange(event);
          }}
          onBlur={formik.handleBlur}
          value={formik.values.licenseNo}
        />
        {formik.touched.licenseNo && formik.errors.licenseNo && (<p className="text-danger">{formik.errors.licenseNo}</p>)}
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text">License Expiration Date</span>
        <input
          type="date"
          placeholder="Expiration Date"
          name="expirationDate"
          id="expirationDate"
          className={`form-control ${formik.touched.expirationDate && formik.errors.expirationDate && "is-invalid"}`}
          onChange={(event) => {
            props.data.setExpirationDate(event.target.value);
            formik.handleChange(event);
          }}
          onBlur={formik.handleBlur}
          value={formik.values.expirationDate}
        />
        {formik.touched.expirationDate && formik.errors.expirationDate && (<p className="text-danger">{formik.errors.expirationDate}</p>)}
      </div>

      <div className="mb-3">
        <input
          type="text"
          placeholder="RTA"
          name="rta"
          id="rta"
          className={`form-control ${formik.touched.rta && formik.errors.rta && "is-invalid"}`}
          onChange={(event) => {
            props.data.setRta(event.target.value);
            formik.handleChange(event);
          }}
          onBlur={formik.handleBlur}
          value={formik.values.rta}
        />
        {formik.touched.rta && formik.errors.rta && (<p className="text-danger">{formik.errors.rta}</p>)}
      </div>

      <select
        name="allowedVehicles"
        id="allowedVehicles"
        className={`form-select ${formik.touched.allowedVehicles && formik.errors.allowedVehicles && "is-invalid"}`}
        onChange={(event) => {
            props.data.setAllowedVehicles(event.target.value);
            formik.handleChange(event);
          }}
        onBlur={formik.handleBlur}
        value={formik.values.allowedVehicles}  
      >
        <option value="null">Select Allowed Vehicles</option>
        <option value="Two Wheeler">Two Wheeler</option>
        <option value="Four Wheeler">Four Wheeler</option>
      </select>
      {formik.touched.allowedVehicles && formik.errors.allowedVehicles && (<p className="text-danger">{formik.errors.allowedVehicles}</p>)}
    </>
  );
};

export default MotoristDetails;
