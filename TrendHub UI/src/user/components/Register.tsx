import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useFormik } from 'formik'
import signupValidation from '../utils/formValidationSchemas/signupValidation';
import apiInstance from '../utils/apiInstance';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../utils/store/userSlice';





const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const user = useSelector((store: any) => store.user)
  const isLoggedIn = user.success
  const [signupError,setsignupError]=useState('')



  const onSubmit = async (values:any) => {
    try {
      const response = await apiInstance.post('/signup', values)
      
      const { user, success, message } = response.data;
      if (success) {
        dispatch(login({ user, success }))
      }else{
        setsignupError(message)
      }
    } catch (error:any) {
console.error('api error:',error)
    }
  }

  const { values, errors, touched, handleBlur, handleSubmit, handleChange } = useFormik({
    initialValues: {
      name: '',
      email: '',
      mobile: '',
      userName: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: signupValidation,
    onSubmit
  })

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/home')
    }
  }, [isLoggedIn])

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
      <div className="relative py-2 sm:max-w-xl sm:w-1/2">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                {/* Login with Google Button */}
                <form onSubmit={handleSubmit}>
                <div className="my-5">
                  <button
                    className="w-full text-center py-3 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
                  >
                    <img
                      src="https://www.svgrepo.com/show/355037/google.svg"
                      className="w-6 h-6"
                      alt=""
                    />
                    <span>Signup with Google</span>
                  </button>
                </div>
                {/* End of Login with Google Button */}
                <div className="flex items-center justify-center">
                  <div className="border-t border-gray-400 w-16"></div>
                  <span className="mx-4 text-gray-500 mb-3">or</span>
                  <div className="border-t border-gray-400 w-16"></div>
                </div>
                <div className="relative mb-2">
                  <input
                    autoComplete="off"
                    id="name"
                    name="name"
                    type="text"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600 rounded-lg"
                    placeholder="Name"
                    value={values.name} 
                      onBlur={handleBlur} 
                      onChange={handleChange}
                  />
                  {errors.name && touched.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                  <label
                    htmlFor="Name"
                    className="absolute pl-2 left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Name
                  </label>
                </div>
                <div className="relative mb-2">
                  <input
                    autoComplete="off"
                    id="email"
                    name="email"
                    type="text"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600 rounded-lg "
                    placeholder="Email"
                    value={values.email} 
                      onBlur={handleBlur} 
                      onChange={handleChange}
                  />
                  {errors.email && touched.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                  <label
                    htmlFor="email"
                    className="absolute pl-2 left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Email
                  </label>
                </div>
                <div className="relative mb-2">
                  <input
                    autoComplete="off"
                    id="mobile"
                    name="mobile"
                    type="number"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600 rounded-lg "
                    placeholder="mobileNo"
                    value={values.mobile} 
                      onBlur={handleBlur} 
                      onChange={handleChange}
                  />
                  {errors.mobile && touched.mobile && <p className="text-red-500 text-xs">{errors.mobile}</p>}
                  <label
                    htmlFor="mobileNo"
                    className="absolute pl-2 left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Mobile no
                  </label>
                </div>
                <div className="relative mb-2">
                  <input
                    autoComplete="off"
                    id="userName"
                    name="userName"
                    type="text"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600 rounded-lg "
                    placeholder="user name"
                    value={values.userName} 
                      onBlur={handleBlur} 
                      onChange={handleChange}
                  />
                  {errors.userName && touched.userName && <p className="text-red-500 text-xs">{errors.userName}</p>}
                  <label
                    htmlFor="userName"
                    className="absolute pl-2 left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    User name
                  </label>
                </div>
                <div className="relative mb-2">
                  <input
                    autoComplete="off"
                    id="password"
                    name="password"
                    type="password"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600 rounded-lg "
                    placeholder="Password"
                    value={values.password} 
                      onBlur={handleBlur} 
                      onChange={handleChange}
                  />
                  {errors.password && touched.password && <p className="text-red-500 text-xs">{errors.password}</p>}
                  <label
                    htmlFor="password"
                    className="absolute pl-2 left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Password
                  </label>
                </div>
                <div className="relative mb-2">
                  <input
                    autoComplete="off"
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600 rounded-lg "
                    placeholder="Password"
                    value={values.confirmPassword} 
                      onBlur={handleBlur} 
                      onChange={handleChange}
                  />
                  {errors.confirmPassword && touched.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
                  <label
                    htmlFor="confirmPassword"
                    className="absolute pl-2 left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Confirm password
                  </label>
                </div>
                <div className="relative mb-2">
                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Signup
                  </button>
                  <p className="text-red-500 text-xs">{signupError}</p>
                </div>
                <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                  Already have an account?{' '}
                  <button
                    onClick={() => navigate('/')}
                    className="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                  >
                    Login
                  </button>
                </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
