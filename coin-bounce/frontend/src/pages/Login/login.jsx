import { useState } from 'react';
import TextInput from '../../Component/TextInput/TextInput';
import loginSchema from '../../schemas/loginSchema';
import { useFormik } from 'formik';
import { login } from '../../api/internal';
import {setUser} from '../../store/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';



function Login() {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [error, setError] = useState('');

  const handleLogin = async () => {
    const data = {
      username: values.username,
      password: values.password
    };
    const response = await login(data);

    if(response.status === 200){
      // 1. setUser
      const user = {
        _id: response.data.user._id,
        email: response.data.user.email,
        username: response.data.user.username,
        auth: response.data.auth
      };
      dispatch(setUser(user));
      // 2. redirect -> homepage
      navigate('/')
    }

    

    else if(response.code === 'ERR_BAD_REQUEST'){
      // display error message
      setError(response.response.data.message);
    }
  }



  const { values, touched, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: loginSchema
  });

  return (
    <div className="m-0 auto w-full md:w-80vw min-h-[calc(100vh-200px)] flex flex-col items-center justify-center px-4">
      <div className="text-4xl font-bold text-center md:mt-40 mt-32 mb-10 md:mb-16">
        Log in to your account
      </div>
      <div className="w-full md:w-2/3 lg:w-1/2">
        <TextInput
          type="text"
          value={values.username}
          name="username"
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="Username"
          error={errors.username && touched.username ? 1 : undefined}
          errormessage={errors.username}
        />
        <TextInput
          type="password"
          value={values.password}
          name="password"
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="Password"
          error={errors.password && touched.password ? 1 : undefined}
          errormessage={errors.password}
        />
        <div className="flex flex-col w-full items-center">
          <button
            className={`bg-${values.username && values.password && !errors.username && !errors.password ? 'blue-600' : 'blue-300'} font-bold text-lg rounded-lg px-4 py-3 my-2 w-5/6 sm:w-5/12 md:w-5/12 lg:w-5/12 xl:w-5/12 text-white`}
            onClick={handleLogin}
            disabled={!values.username || !values.password || errors.username || errors.password}
          >
            Log In
          </button> 
        </div>

        <div className="mt-4 text-center">
          <span className='font-mediun'>Don't have an account?  
          <button className="text-green-400 font-mediun cursor-pointer" onClick={() => navigate('/signup')}>Register</button>
          </span>
          {error !== '' ? <p className='text-red-600 mt-20 mb-0 font-bold text-20 '>{error}</p>: ""}
        </div>
      </div>
    </div>
  );
}

export default Login;
