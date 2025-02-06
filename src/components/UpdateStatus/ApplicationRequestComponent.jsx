import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import Loading from '../loading/Loading';
import { toast } from "react-toastify";
import styles from "./applicationRequestComponent.module.css";

const ApplicationRequestComponent = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [application, setApplication] = useState(null);
  const [status, setStatus] = useState('');
  const [drivingLicense, setDrivingLicense] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    ApiService.getApplicationById(userId)
      .then(response => {
        setApplication(response.data);
        setStatus(response.data.applicationStatus);
        if (response.data.role === 'Motorist') {
          fetchDrivingLicenseDetails(response.data.userId);
        }
        setLoading(false); 
      })
      .catch(error => {
        console.error('There was an error fetching the application!', error);
        setLoading(false); 
      });
  }, [userId]);

  const fetchDrivingLicenseDetails = (userId) => {
    ApiService.getDrivingLicenseByUserId(userId)
      .then(response => {
        setDrivingLicense(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the driving license details!', error);
      });
  };

  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    setStatus(newStatus);
    setApplication((prevApplication) => ({
      ...prevApplication,
      applicationStatus: newStatus,
    }));
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const updateApplicationDTO = {
      userId: application.userId,
      status: status,
    };
    ApiService.approveRejectApplication(updateApplicationDTO)
      .then(response => {
        toast.success('Application status updated successfully!');
        navigate('/applications');
      })
      .catch(error => {
        toast.error('There was an error updating the application status!');
      });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={`container mt-5 mb-5 ${styles.applicationContainer}`}>
      <h2 className="text-center mb-4 text-dark"><b>Application Details</b></h2>
      <div className={`card shadow p-4 bg-light ${styles.card}`}>
        <div className="row mb-3">
          <div className="col-md-6">
            <p><strong>User ID:</strong> <span className="text-dark">{application.userId}</span></p>
            <p><strong>Username:</strong> <span className="text-dark">{application.username}</span></p>
            <p><strong>Official Email:</strong> <span className="text-dark">{application.officialEmail}</span></p>
            <p><strong>Phone Number:</strong> <span className="text-dark">{application.phoneNumber}</span></p>
          </div>
          <div className="col-md-6">
            <p><strong>Company ID:</strong> <span className="text-dark">{application.companyId}</span></p>
            <p><strong>Designation:</strong> <span className="text-dark">{application.designation}</span></p>
            <p><strong>Role:</strong> <span className="text-dark">{application.role}</span></p>
            <p><strong>Application Status:</strong> <span className={`badge ${application.applicationStatus === 'Approved' ? 'bg-success' : 'bg-danger'}`}>{application.applicationStatus}</span></p>
          </div>
        </div>

        {application.role === 'Motorist' && drivingLicense && (
          <div className={`card mt-4 p-3 bg-secondary text-white ${styles.licenseCard}`}>
            <h3 className="h5 text-center">Driving License Details</h3>
            <p><strong>License No:</strong> {drivingLicense.licenseNo}</p>
            <p><strong>Expiration Date:</strong> {drivingLicense.expirationDate}</p>
            <p><strong>RTA:</strong> {drivingLicense.rta}</p>
            <p><strong>Allowed Vehicles:</strong> {drivingLicense.allowedVehicles}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select id="status" value={status} onChange={handleStatusChange} className="form-control">
              <option value="New">Select Status</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <button type="submit" className={`btn btn-dark mt-3 ${styles.btnPrimary}`}>Update Status</button>
        </form>
      </div>
    </div>
  );
};

export default ApplicationRequestComponent;
