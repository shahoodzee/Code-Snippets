import React, { useEffect, useState } from 'react'
import { Link, useNavigate, Outlet } from 'react-router-dom'
import getJwtData from '../utils/getJwtData'
import { GetUserById } from '../service/apis';
import {setUser} from '../redux/actions/userActions';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

function LoggedRoute() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isAllowed, setIsAllowed] = useState(false);


    async function fetchUserInfo(userId) {
        try{
            const res = await GetUserById(userId);
            if(res.success){
                dispatch(setUser(res.data));
            }
            else{
                toast.error(`Error fetching user details: ${res.message}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
        catch(err){
            toast.error(`Error fetching user details: ${err.message}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }
    useEffect(()=>{
        const jwtData = getJwtData();
        if(jwtData){
            fetchUserInfo(jwtData.mxui);
        }
    },[])
    useEffect(()=>{
        const jwtData = getJwtData();
        if(jwtData){
            const currentTime = Date.now();
            const expirationTime = jwtData.exp * 1000; // Convert seconds to milliseconds
            if(currentTime >= expirationTime){
                localStorage.removeItem('auth');
                Swal.fire('Session expired!', 'Your session was expired. Please log in again', 'info');
                navigate('/signin');
            }
            else{
                setIsAllowed(true);
            }
        }
        else{
            navigate('/signin');
        }
    }, []);
  return isAllowed ? <Outlet /> : <div>Checking permissions</div>
}

export default LoggedRoute