import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import getJwtData from '../utils/getJwtData'

function LoggedRoute() {
    const navigate = useNavigate();
    const [isAllowed, setIsAllowed] = useState(false);

    useEffect(()=>{
        const jwtData = getJwtData();
        if(jwtData){

        }
    },[])
    useEffect(() => {
        const jwtData = getJwtData();
        if (jwtData) {
            const expirationTime = jwtData.exp * 1000;
            const currentTime = Date.now();
            if (currentTime >= expirationTime) {
                document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                navigate('/login');
            } else {
                setIsAllowed(true);
            }
        } else {
            navigate('/login');
        }
    }, []);
  return isAllowed ? <Outlet /> : <div>Checking permissions</div>
}

export default LoggedRoute