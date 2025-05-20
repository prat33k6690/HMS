import axios from "axios";
// import { setChechSum } from "./common";
// import { getBrowserDetails } from "./common";
import {
  getUserData,
  getToken,
  setLocalToken,
  setLocalRefreshTkn,
} from "./common";
import * as urls from "./url";
// import { exceptionLog } from "./common";
const packageJson = require("./../../../package.json");

const currentVersion = packageJson.version;
var getChecksumValue: any = null;

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "accept": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Authorization:
      "Basic " +
      btoa(
        // process.env.REACT_APP_AUTHENTICATION_USERNAME +
        "softtech" +
        ":" +
        // process.env.REACT_APP_AUTHENTICATION_PASSWORD
        "softtech"
      ),
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    // if (getChecksumValue) {
    //     config.headers["checksum"] = await getChecksumValue;
    // }
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error: any) => {
    if (!error.response) {
      // Handle network errrs or cases where reposnse is not available
      // if (window.location.pathname !== "/") {
      //     window.location.href = "/"
      // }
      return Promise.reject(error);
    }

    const originalRequest = error.config;

    // check if the error is due to in expired access token
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      // // Use your token refresh logic here
      const token = getToken();

      // // Example: Refresh token logic using an API call
      await refreshAccessToken(token.refreshToken);

      // retry the original request with the new access token

      if (token) {
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${token.accessToken}`;
      }
      return axios(originalRequest);
    }

    return Promise.reject(error);
  }
);

// Function to refresh access token using your authentication service
const refreshAccessToken = async (refreshToken: string) => {
  // Example: Use your authentication service API to refresh the access token

  const userData = getUserData();
  const getidentifyData: any = localStorage.getItem("_identityData");
  const identifyData = JSON.parse(getidentifyData);

  const payload = {
    Domain: window.location.hostname,
    RefreshToken: refreshToken,
    BankCode: userData.BankCode || "",
    UserId: userData.TranCode,
    UserName: userData.UserName,
    IpAddress: identifyData?.ip,
  };

  await axios({
    method: "POST",
    url: urls.refreshToken,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic " +
        btoa(
          process.env.REACT_APP_AUTHENTICATION_USERNAME +
          ":" +
          process.env.REACT_APP_AUTHENTICATION_PASSWORD
        ),
    },
  })
    .then((response) => {
      setLocalToken(response.data.JwtToken);
    })
    .catch(async (error) => {
      return window.location.pathname !== "/sessionout"
        ? (window.location.href = "/sessionout")
        : "";
    });
};

export const apiRequest = async (
  method: any,
  endpoint: any,
  data: any = null,
  config = {}
) => {
  const getLocation: any = localStorage.getItem("location");
  const location = JSON.parse(getLocation);
  const getidentifyData: any = localStorage.getItem("_identityData");
  const identifyData = JSON.parse(getidentifyData);
  // const browserDtl = getBrowserDetails();
  const userData = getUserData();



  try {
    const payload = {
      ...data,
      compCd: userData?.compCd || undefined,
      userCd: userData?.userCd || undefined,
      clientCd: userData?.clientCd || undefined,
      reqDomain: window.location.hostname,
      ipAddress: identifyData?.ip,
      channelId: "",
      sessionToken: userData?.sessionToken || undefined,
      latitude: location?.latitude.toString() || "",
      longitude: location?.longitude.toString() || "",
    };


    // const checksum = setChechSum(JSON.stringify(payload));

    const response = await axiosInstance({
      method,
      url: endpoint,
      data: payload,
      ...{
        ...config,
        // headers: {
        //     checksum: checksum,
        // },
      },
    });

    // Handle successful reposnse
    if (response.data.statusCode === 3) {
      return window.location.pathname !== "/sessionout" ? window.location.href = "/sessionout" : "";
    } else {
      return response.data;
    }
  } catch (error: any) {
    console.error("error", error);
    throw new Error(error);
  }
};

export const apiRequestMultiPart = async (
  method: string,
  endpoint: any,
  data: any = null,
  config: any = {}
) => {
  try {
    //check access token expire time
    //if token will expire with in 10 sec or 15 sec then call refresh token method for update token
    //refresh token method call must be async method

    const getLocation: any = localStorage.getItem("location");
    const location = JSON.parse(getLocation);
    const getidentifyData: any = localStorage.getItem("_identityData");
    const identifyData = JSON.parse(getidentifyData);
    // const browserDtl = getBrowserDetails();
    const userData = getUserData();
    const { UploadFile, ...otherPayload } = data

    const form = new FormData();
    form.append("file", UploadFile);

    const payload: any = {
      ...otherPayload,
      compCd: userData?.compCd || undefined,
      userCd: userData?.userCd || undefined,
      clientCd: userData?.clientCd || undefined,
      reqDomain: window.location.hostname,
      ipAddress: identifyData?.ip,
      channelId: "",
      sessionToken: userData?.sessionToken || undefined,
      latitude: location?.latitude.toString() || "",
      longitude: location?.longitude.toString() || "",
    };

    form.append("data", new Blob(
      [JSON.stringify(payload)],
      { type: "application/json" }
    ));

    const response = await axiosInstance({
      method,
      url: endpoint,
      data: form,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      ...config,
    });
    // Handle successful response
    if (response.data.STATUS === "3" || response.data.STATUS === "6") {
      return window.location.pathname !== "/sessionout" ? window.location.href = "/sessionout" : "";
    } else {
      return response.data;
    }
  } catch (error: any) {
    console.error("error", error);
    throw error;
  }
};
