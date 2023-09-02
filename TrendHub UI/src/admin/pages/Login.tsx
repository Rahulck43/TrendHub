import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import adminLloginValidation from '../utils/formValidations/adminValidationSchema'
import apiInstance from '../../user/utils/apiInstance'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../utils/store/adminSlice'
import { useNavigate } from 'react-router'





const Login = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const admin = useSelector((store: any) => store.admin)
  const isLoggedIn = admin.success;
  const [loginError, setLoginError] = useState('')

  const onSubmit = async (values: any) => {
    try {
      const response = await apiInstance.post('/admin/login', values)
      const { success, message } = response.data
      if (success) {
        dispatch(login({ success }))
      } else {
        setLoginError(message)
        navigate('/admin')
      }
    } catch (error) {
      console.error('API error:', error)
    }
  }


  const { values, errors, touched, handleBlur, handleSubmit, handleChange } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: adminLloginValidation,
    onSubmit
  })

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/admin/dash')
    } else {
      navigate('/admin')
    }
  }, [isLoggedIn])

  return (
    <div>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="flex items-center justify-center">
                    <p className='font-bold mb-6 text-xl'> Admin Login</p>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="relative mb-3">
                      <input
                        autoComplete="off"
                        id="email"
                        name="email"
                        type="text"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600 rounded-lg"
                        placeholder="Email address"
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
                    <div className="relative">
                      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Login</button>
                    </div>

                    <p className="text-red-500 text-xs">{loginError}</p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login