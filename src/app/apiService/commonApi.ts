import { apiRequest } from "../utils/apiRequest";
import toastNotify from "../utils/tostNotify";
import * as urls from "../utils/url";
export const getCaptchaCode = async () => {
  try {
    const payload = {};
    const config = {};

    const result = await apiRequest("POST", urls.getCaptcha, payload, config);
    if (result.statusCode === 0) {
      return result.data;
    } else {
      result.message !== "No data found" &&
        toastNotify(result.message, "error");
      return null;
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const getApiServiceMenu = async () => {
  try {
    const payload = {};
    const config = {};
    const result = await apiRequest("POST",urls.apiVerificationMenu,payload,config);
    if (result.statusCode === 0) {
      return result.data;
    } else {
      result.message !== "No data found" &&
        toastNotify(result.message, "error");
      return [];
    }
  } catch (error) {
    console.log("error", error);
  }
};
