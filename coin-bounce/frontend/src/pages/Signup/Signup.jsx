import { useState } from 'react';
import TextInput from '../../Component/TextInput/TextInput';
import signupSchema from '../../schemas/signupSchema'
import { useFormik } from 'formik';
import {setUser} from '../../store/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../api/internal';

// signup

function Signup() {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [error, setError] = useState('');

   const handleSignup = async () => {
     const data = {
        name: values.name,
        username: values.username,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword
    };
    const response = await signup(data);

    if(response.status === 201){
      // 1. setUser
      const user = {
        _id: response.data.user._id,
        email: response.data.user.email,
        username: response.data.user.username,
        auth: response.data.auth,
      };
      dispatch(setUser(user));
      // 2. redirect -> homepage
      navigate("/");
    }

    else if(response.code === 'ERR_BAD_REQUEST'){
      // display error message
      setError(response.response.data.message);
    }

  }



  const { values, touched, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
        name: "",
        username: '',
        email: "",
        password: '',
        confirmPassword: '',
    },
    validationSchema: signupSchema
  });

  return (
    <div className="m-0 auto w-full md:w-80vw min-h-[calc(100vh-200px)] flex flex-col items-center justify-center px-4 mt-5">
      <div className="text-4xl md:mt-28 mt-20 font-bold text-center my-5 md:mb-14 mb-9">
        Create an account
      </div>
      <div className="w-full md:w-2/3 lg:w-1/2">
        <TextInput
            type="text"
            name="name"
            value={values.name}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Name"
            error={errors.name && touched.name ? 1 : undefined}  
            errormessage = {errors.name}
        />
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
          type="text"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="email"
          error={errors.email && touched.username ? 1 : undefined}
          errormessage={errors.email}
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
        <TextInput
          type="password"
          value={values.confirmPassword}
          name="confirmPassword"
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="Confirm Password"
          error={errors.confirmPassword && touched.password ? 1 : undefined}
          errormessage={errors.confirmPassword}
        />
        <div className="flex flex-col w-full items-center">
          <button className={`bg-${values.username && values.password && values.name && values.email && values.confirmPassword && !errors.username && !errors.password ? 'blue-600' : 'blue-300'} mt-6 font-bold text-lg rounded-lg px-4 py-3 my-2 w-5/6 sm:w-5/12 md:w-5/12 lg:w-5/12 xl:w-5/12 text-white`} onClick={handleSignup}
          disabled={!values.username || !values.password ||
          !values.name || 
          !values.email ||
          !values.confirmPassword || 
          errors.username ||
          errors.password || 
          errors.confirmPassword ||
          errors.name ||
          errors.email}
          >
            Sign Up
          </button>
        </div>
        <div className="mt-6 text-center">
          <span>Already have an account? 
          <button className="text-green-500 text-18 cursor-pointer" onClick={() => navigate('/login')}>Log In</button>
          </span>
          {error !== '' ? <p className='text-red-600 mt-20 mb-0 font-bold text-20 '>{error}</p>: ""}
        </div>
      </div>
    </div>
  );
}

export default Signup;
