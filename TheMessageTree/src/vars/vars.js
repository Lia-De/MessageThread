export const fontStyle=["Monoton", "Quantico"];

export function timeStampDisplay(totalseconds){
    let date  = new Date(totalseconds);
    let hours = date.getHours().toString().padStart(2, '0'); // Ensure two-digits
    let minutes = date.getMinutes().toString().padStart(2, '0'); // Ensure two-digits
    let seconds = date.getSeconds().toString().padStart(2, '0'); // Ensure two-digits


    return `${hours}:${minutes}:${seconds}`
}