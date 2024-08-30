import axios from 'axios'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { setToken } from '../redux/userSlice'
import Avatar from '../components/Avatar'

const CheckPasswordPage = () => {
  const [data, setData] = useState({
    password: "",
    userId: ""
  })
  
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  
  useEffect(() => {
    console.log(location?.state);
    if (!location?.state?.name) {
      navigate('/email')
    }
  },[])

  const handleOnChange = (e) => {
    const {name , value} =  e.target
    setData((prev)=>{
      return{
        ...prev,
        [name] : value
      }
    })
    console.log(data);
  }

  const handleSubmit = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        console.log(location?.state?._id);
        console.log(data.password);

        const URL = `${import.meta.env.VITE_APP_BACKEND_URL}/api/password`
        try {
          const response = await axios({
            method : 'post',
            url : URL,
            data : {
              userId : location?.state?._id,
              password : data.password
            },
            withCredentials : true
          })
          console.log(response);
          toast.success(response.data.message)
          console.log(response?.data?.token);
          if(response.data.success){
            dispatch(setToken(response?.data?.token))
            localStorage.setItem('token',response?.data?.token)
            setData({
              password : "",
            })
            navigate('/')
          }
        } catch (error) {
          console.log(error);
          toast.error(error?.response?.data?.message)
        }
  }

  return (
    <div className='mt-5'>
      <div className='bg-white w-full max-w-md rounded overflow-hidden p-4 mx-auto'>

        <div className='w-fit mx-auto mb-2 flex justify-center items-center flex-col'>

          <Avatar
          width = {70}
          height = {70}
          name = {location?.state?.name}
          imageUrl = {location?.state?.profile_pic}
          />
          <h2 className='font-semibold text-lg mt-1'>{location?.state?.name}</h2>
        </div>
        <form className='grid gap-4 mt-3' onSubmit={handleSubmit}>
          <label htmlFor='password'>Password : </label>
          <input
            type='password'
            id='password'
            name='password'
            placeholder='enter your password'
            className='bg-slate-100 px-2 py-1 focus:outline-primary'
            value={data.password}
            onChange={handleOnChange}
            required
          />

          <button className='bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide'>Login</button>
        
        </form>
        <p className='my-3 text-center'><Link to={"/forgot-password"} className='hover:text-primary font-semibold'>Forgot password</Link></p>
      </div>
    </div>
  )
}

export default CheckPasswordPage;