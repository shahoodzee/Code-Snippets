import jwtDecode from "jwt-decode";
export default function getJwtData(){
    const jwtData = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
    if(jwtData){
        const decoded = jwtDecode(jwtData);
        return decoded
    }
    else return false;
}