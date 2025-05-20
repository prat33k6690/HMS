export const convertMinutesSeconds = (time: any) => {
    const minutes = time / 60;
    const convertMinutesTostring = minutes.toString()?.split(".")[0];
    const mualtipleableValue = minutes.toString()?.split(".").length > 1 ? Number(convertMinutesTostring) : Number(convertMinutesTostring) - 1
    const second = time - (mualtipleableValue * 60);

    return { convertedminutes: mualtipleableValue, convertedseconds: second }
}

// Help to Download Files
export const downloadFiles = (base64Data: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = base64Data;
    link.setAttribute("download", fileName); //or any other extension
    document.body.appendChild(link);
    link.click();
};