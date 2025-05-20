// const BaseUrl = "http://localhost:8009";
const BaseUrl = "http://192.168.1.15:8009";


export const getCaptcha = BaseUrl + "/auth/get-captcha";
export const refreshToken = BaseUrl + "/auth/get-captcha";

// Login Screen
export const login = BaseUrl + "/auth/login";
export const otpVerify = BaseUrl + "/auth/login-verify";
export const forgoatpassword = BaseUrl + "/auth/forgot-password";
export const gAuthVerity = BaseUrl + "/auth/login-g-auth-verify";

// API Service
export const apiVerificationMenu = BaseUrl + "/misc/get-api-verification-manu";
export const apiVerificationInput = BaseUrl + "/misc/get-api-verification-input";
export const apiverification = BaseUrl + "/api-verification/request";

export const getBulkFile = BaseUrl + "/api-verification/get-bulk-file";
export const downloadXLSXFormat = BaseUrl + "/misc/download-xlsx-format";
export const bulkRequest = BaseUrl + "/api-verification/bulk-request";
export const downloadBulkFile = BaseUrl + "/api-verification/download-bulk-file";

//Clint 
export const getClintId = BaseUrl + "/misc/get-client-id"
export const addClint = BaseUrl + "/client/add"
export const getClint = BaseUrl + "/client/get"

//User 
export const getUserId = BaseUrl + "/misc/get-user-id"
export const addUser = BaseUrl + "/user/add"
export const getUser = BaseUrl + "/user/get"

//recharge
export const clientRecharge = BaseUrl + "/recharge/client/recharge"
export const clientOtpVerify = BaseUrl + "/recharge/client/otp-verify"
export const getRecharg = BaseUrl + "/recharge/get"
