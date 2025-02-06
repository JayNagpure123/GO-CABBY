import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../services/ApiService";
import "./ApplicationRequestListComponent.css";
import Loading from "../loading/Loading";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const ApplicationRequestListComponent = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const applicationsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    ApiService.getPendingApplications()
      .then((response) => {
        setApplications(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the applications!", error);
        setLoading(false);
      });
  }, []);

  const handleViewApplication = (userId) => {
    navigate(`/application/${userId}`);
  };

  const indexOfLastApplication = currentPage * applicationsPerPage;
  const indexOfFirstApplication = indexOfLastApplication - applicationsPerPage;
  const currentApplications = applications.slice(
    indexOfFirstApplication,
    indexOfLastApplication
  );

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mt-5 mb-5">
      <h2 className="text-center mb-4 text-dark">
        <b>Pending Application Requests</b>
      </h2>
      <table className="table table-striped table-bordered table-hover table-responsive table-custom">
        <thead className="table-dark">
          <tr>
            <th>User ID</th>
            <th>Username</th>
            <th>Company ID</th>
            <th>Designation</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentApplications.map((application) => (
            <tr key={application.userId}>
              <td>{application.userId}</td>
              <td>{application.username}</td>
              <td>{application.companyId}</td>
              <td>{application.designation}</td>
              <td>{application.role}</td>
              <td>
                <button
                  className="btn btn-info"
                  onClick={() => handleViewApplication(application.userId)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-center mt-3">
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(applications.length / applicationsPerPage)}
            page={currentPage}
            onChange={handleChangePage}
            color="primary"
          />
        </Stack>
      </div>
    </div>
  );
};

export default ApplicationRequestListComponent;

