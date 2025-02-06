import axios from "axios";

// Create an instance for authenticated requests
const axiosInstance = axios.create({
  baseURL: "http://localhost:7000/api",
});

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Create an instance for public requests
const axiosPublicInstance = axios.create({
  baseURL: "http://localhost:7000/api",
});

class ApiService {
  // Public endpoints
  getCompanies = async () => {
    return await axiosPublicInstance.get("/companies");
  }

  addRider = async (userDetails) => {
    return await axiosPublicInstance.post("/applications/new", userDetails);
  }

  addMotorist = async (userDetails, licenseDetails) => {
    let response = await axiosPublicInstance.post("/applications/new", userDetails);
    let userData = await response.data;
    licenseDetails = { ...licenseDetails, "userId": userData.userId };
    return await axiosPublicInstance.post("/drivinglicense/new", licenseDetails);
  }

  login = async (loginCredentials) => {
    return await axiosPublicInstance.post("/users/login", loginCredentials);
  }

  register = async (userCredentials) => {
    return await axiosPublicInstance.post("/users/signup", userCredentials);
  }

  // Authenticated endpoints
  getPendingApplications = async () => {
    return await axiosInstance.get("/applications");
  }

  getApplicationById = async (userId) => {
    return await axiosInstance.get(`/applications/${userId}`);
  }

  approveRejectApplication = async (updateApplicationDTO) => {
    return await axiosInstance.put("/applications/approvereject", updateApplicationDTO);
  }

  getDrivingLicenseByUserId = async (userId) => {
    return await axiosInstance.get(`/drivinglicense/${userId}`);
  }
}

export default new ApiService();
