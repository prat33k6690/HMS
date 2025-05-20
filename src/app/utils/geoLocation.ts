import toastNotify from "./tostNotify";

// Get Lat & Long of user
export const getGeoLocation = async () => {
    try {
        // Check permission and detact to GPS in System
        if (navigator.geolocation) {
            const position: any = await getCurrentPosition();
            return {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }
        } else {
            toastNotify('Geolocation is not supported by browser.', "error");
            return {
                latitude: "",
                longitude: "",
            };
        }
    } catch (error: any) {
        return {
            latitude: '',
            longitude: '',
        }
    }
};

// This Also help to Get Lat & Long  
const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
        const options = {
            timeout: 5000
        }
        navigator.geolocation.getCurrentPosition(resolve, reject, options)
    })
}

// This function is set Locatio in local Storange
export const setGeoLocation = async () => {
    // Remove location form Local storange
    localStorage.removeItem('location');

    // Get Location 
    const location: any = await getGeoLocation();

    // Check Permission
    if (!location) {
        return toastNotify('Location permission denied. Please reload', "error");
    }

    // Return Location and store data in local storange 
    return localStorage.setItem('location', JSON.stringify(location));
};