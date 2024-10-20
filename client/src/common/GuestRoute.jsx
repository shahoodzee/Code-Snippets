import { useEffect, useState } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import getJwtData from '../utils/getJwtData'

function GuestRoute() {
    const navigate = useNavigate();
    const [isAllowed, setIsAllowed] = useState(false);
    useEffect(()=>{
        const jwtData = getJwtData();
        if(jwtData){
            navigate('/');
        }
        else{
            setIsAllowed(true);
        }
    }, []);
  return isAllowed ? <Outlet /> : <div>Checking permissions</div>
}

export default GuestRoute