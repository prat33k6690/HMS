import { getGeoLocation } from "./geoLocation";
// import UAParser from 'ua-parser-js';
// import { makeRequest } from "./makeRequest";
// import * as urls from './UrlConst'
import axios from "axios";
import toastNotify from "./tostNotify";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
import moment from "moment";
// import * as FileSaver from 'file-saver';
// import * as ExcelJS from 'exceljs';
// import { securityHeader } from "./SecuityHeader";
var CryptoJS = require('crypto-js');
var secretkey = "dfgdhdbvnfghtr54654bnvbbm";

// dcypt to access token, refresh token and user data
const decryptingData = () => {

    var userBytes = CryptoJS.AES.decrypt(
        sessionStorage.getItem('_user_'),
        secretkey
    );
    var decryptedUserData = JSON.parse(
        userBytes.toString(CryptoJS.enc.Utf8)
    );

    var tokenBytes = sessionStorage.getItem('_token_') ? CryptoJS.AES.decrypt(
        sessionStorage.getItem('_token_'),
        secretkey
    ) : null;

    var decryptedToken = tokenBytes && JSON.parse(
        tokenBytes.toString(CryptoJS.enc.Utf8)
    );

    return { decryptedUserData, decryptedToken }
};

// this function use for ecrypt to value
export function encryptValue(val: any) {
    return CryptoJS.AES.encrypt(
        JSON.stringify(val),
        secretkey
    ).toString();
};

// this function use for decrypt to value
export function decryptValue(val: any) {
    var data = CryptoJS.AES.decrypt(val, secretkey);
    return JSON.parse(data.toString(CryptoJS.enc.Utf8));
};

// remove login section
export const removeLoginSession = () => {
    sessionStorage.removeItem("resendOtpFlag");
    sessionStorage.removeItem("_user_");
    sessionStorage.removeItem("_token_");
    sessionStorage.removeItem("_profileImg_");
};

export const getUserData = () => {
    try {
        const { decryptedUserData } = decryptingData();
        return decryptedUserData;
    } catch (error) {
        return null;
    }
};

export const getBankData = () => {
    try {
        var bankBytes = CryptoJS.AES.decrypt(
            sessionStorage.getItem('_bank_'),
            secretkey
        );
        var decryptedBankData = JSON.parse(
            bankBytes.toString(CryptoJS.enc.Utf8)
        );
        return decryptedBankData;
    } catch (error) {
        return null;
    }
};

export const getToken = () => {
    try {
        const { decryptedToken } = decryptingData();
        return decryptedToken;
    } catch (error) {
        return null;
    }
};


// here set user data and store value in session storage
export const setLocalUserData = (val: any) => {

    var cipherUserText = CryptoJS.AES.encrypt(
        JSON.stringify(val),
        secretkey
    ).toString();
    console.log( cipherUserText);
    return sessionStorage.setItem('_user_', cipherUserText);
   
};

// here set bank data and store value in session storage
export const setLocalBankData = (val: any) => {
    var cipherBankText = CryptoJS.AES.encrypt(JSON.stringify(val), secretkey).toString();
    return sessionStorage.setItem('_bank_', cipherBankText);
};

// here set user data and store value in session storage
export const setLocalToken = (val: any) => {
    var cipherUserText = CryptoJS.AES.encrypt(
        JSON.stringify(val),
        secretkey
    ).toString();
    return sessionStorage.setItem('_token_', cipherUserText);
};

// here set user data and store value in session storage
export const setLocalAccessTknTime = (val: any) => {
    var cipherUserText = CryptoJS.AES.encrypt(
        JSON.stringify(val),
        secretkey
    ).toString();
    return sessionStorage.setItem('_accesstknexp_', cipherUserText);
};

// here set user data and store value in session storage
export const setLocalRefreshTkn = (val: any) => {
    var cipherUserText = CryptoJS.AES.encrypt(
        JSON.stringify(val),
        secretkey
    ).toString();
    return sessionStorage.setItem('_refreshtkn_', cipherUserText);
};

// here set user data and store value in session storage
export const setLocalRefreshTknTime = (val: any) => {
    var cipherUserText = CryptoJS.AES.encrypt(
        JSON.stringify(val),
        secretkey
    ).toString();
    return sessionStorage.setItem('_refreshtknexp_', cipherUserText);
};


// here set ip in localstorage
export const setIdentityData = async () => {
    try {
        const ipV4 = await (await fetch("https://4.tnedi.me/json"))?.json();
        if (ipV4) {
            localStorage.setItem("_identityData", JSON.stringify(ipV4));
        }
        return ipV4;
    } catch {
        try {
            const ipdata = await (await fetch("https://ident.me/json"))?.json();
            if (ipdata) {
                localStorage.setItem("_identityData", JSON.stringify(ipdata));
            }
            return ipdata;
        } catch (error) {
            console.log("Error of set identity data : ", error);
        }
    }
};

export const getIdentityData = () => {
    const getLocaldentity: any = localStorage.getItem('_identityData');
    return JSON.parse(getLocaldentity);
}


// here a common use for this function to covert files in base64 format
export const converToBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.onerror = reject;
    })
};

// get use location

export const reverseGeocode = async ({ latitude, longitude }: any) => {
    const apiUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok && data.display_name) {
            return data.display_name
        } else {
            throw new Error('Reverse geocoding failed');
        }
    } catch (error) {
        return null;
    }
};

// create checksum
var a_table =
    "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D";
var b_table = a_table.split(" ").map(function (s) {
    return parseInt(s, 16);
});
export function setChechSum(str: any) {
    str = str + process.env.REACT_APP_CHECKSUM_KEY;
    var crc = -1;
    for (var i = 0, iTop = str.length; i < iTop; i++) {
        crc = (crc >>> 8) ^ b_table[(crc ^ str.charCodeAt(i)) & 0xff];
    }
    return (crc ^ -1) >>> 0;
}


export const getIsAutheticate = () => {
    const userData = sessionStorage.getItem('_token_');
    return Object.is(userData, null) === false
}

export const getBrowserDetails = () => {
    // const parser = new UAParser();
    // const result = parser.getResult();
    return {};
}

// export const deleteRecord = async (RequestType: string, Value_1: any) => {
//     try {
//         const payload = RequestType !== "DELETE_MAIL_SMS_TEMPLATE" ? {
//             RequestType: RequestType,
//             Value_1: Value_1
//         } : {
//             RequestType: RequestType,
//             Value_1: Value_1?.TranCd,
//             TempId: Value_1?.TempId,
//             TempType: Value_1?.Type,
//         };

//         const config = {};
//         const result = await makeRequest("POST", urls.deleteMethod, payload, config);

//         return result;
//     } catch (error: any) {
//         if (error.status !== 403) {
//             await exceptionLog(error, "Common delete method", "N");
//         }
//     }
// }


// this funcation add exception log on backend side
// export const exceptionLog = async (error: any, title: any, flag: string) => {
//     const userData = getUserData()
//     const getidentifyData: any = localStorage.getItem("_identityData");
//     const identifyData = JSON.parse(getidentifyData);

//     try {
//         const payload = {
//             BankCode: userData?.BankCode,
//             Token: userData.SessionToken,
//             UserId: userData.TranCode,
//             UserName: userData.UserName,
//             Domain: window.location.hostname,
//             IpAddress: identifyData?.ip,
//             ExceptionTitle: title,
//             ExceptionMessage: title,
//             ExceptionDescription: `${error}`,
//             LoginFlag: flag // this flag when called login api so "N" else "Y" because after login we have token. 
//         };

//         const checksum = setChechSum(JSON.stringify(payload));
//         await axios({
//             method: "POST",
//             url: urls.addExceptionLog,
//             data: payload,
//             headers: {
//                 "Content-Type": "application/json",
//                 "checksum": checksum,
//                 'Authorization': 'Basic ' + btoa(process.env.REACT_APP_AUTHENTICATION_USERNAME + ':' + process.env.REACT_APP_AUTHENTICATION_PASSWORD),
//                 ...securityHeader
//             },
//         })
//     } catch (error: any) {
//         return null;
//     }
// }


export function getRealMimeType(reader: any) {
    var arr = (new Uint8Array(reader.result)).subarray(0, 4);
    var header = '';
    var realMimeType;
    for (var i = 0; i < arr.length; i++) {
        header += arr[i].toString(16);
    }

    switch (header) {
        case "89504e47":
            realMimeType = "image/png";
            break;
        case "47494638":
            realMimeType = "image/gif";
            break;
        case "ffd8ffDB":
        case "ffd8ffe0":
        case "ffd8ffe1":
        case "ffd8ffe2":
        case "ffd8ffe3":
        case "ffd8ffe8":
            realMimeType = "image/jpeg";
            break;
        case "25504446":
            realMimeType = "application/pdf";
            break;
        case "504b34":
            realMimeType = "application/vnd.ms-excel";
            break;
        case "44656c69":
            realMimeType = "application/octet-stream";
            break;
        case "d0cf11e0":
            realMimeType = "application/octet-stream";
            break;
        default:
            realMimeType = "unknown"; // Or you can use the blob.type as fallback
            break;
    }
    return realMimeType;
}