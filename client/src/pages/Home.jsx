import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import logo from '../assets/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import axios from 'axios'
import { logout, setUser } from '../redux/userSlice'
const Home = () => {
  const user = useSelector(state => state.user)
  const location = useLocation()

  const basePath = location.pathname === '/'
  
  const fetchUserDetails = async () => {
    try {
      const URL = `${import.meta.env.VITE_APP_BACKEND_URL}/api/user-details`
      const response = await axios({
          url : URL,
          withCredentials : true
      })
     
      console.log("currrent user details", response);
      console.log("currrent user details", response.data);
      console.log("currrent user details", response.data.message);

    } catch (error) {
      console.log(error)
      toast.error(error)
    }

  }

  useEffect(()=>{
    fetchUserDetails()
  },[])
  return (
    <div className='grid lg:grid-cols-[300px,1fr] h-screen max-h-screen'>
        <section className={`bg-white ${!basePath && "hidden"} lg:block`}>
          <Sidebar/>
        </section>
        {/*  Message Component      */}

        <section className={`${basePath && "hidden"}`}>
            <Outlet/>
        </section>

        <div className={`justify-center items-center flex-col gap-2 hidden ${!basePath ? "hidden" : "lg:flex"}`}>
          <div>
              <img
                src={logo}
                width={250}
                alt='logo'
              />
          </div>
          <p className='text-lg mt-2 text-slate-500'>Select user to send message</p>
        </div>
    </div>
  )
}

export default Home