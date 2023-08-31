import React, { useState } from 'react'
import { useFormik } from 'formik';
import apiInstance from '../utils/apiInstance';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';


const CreatePost = ({ setCreateModal }) => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { userId } = useSelector((store: any) => store.user)


  const onSubmit = async (values: any) => {
    try {
      console.log(values)
      setIsLoading(true)
      values.userId = userId
      const result = await apiInstance.post('post', values, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
      if (result.data.success) {
        const { success, updatedUser, message } = result.data
        console.log(result.data)
      }
    } catch (error: any) {
      console.error(error)
    } finally {
      setIsLoading(false)
      navigate('/')
    }
  }


  const { values, errors, touched, handleBlur, handleSubmit, handleChange, setValues } = useFormik({
    initialValues: {
      caption: '',
      file: ''
    },
    onSubmit,
    // validationSchema: editProfileValidation,
    enableReinitialize: true
  })
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  return (
    <>
      <div className='modal-overlay' onClick={() => setCreateModal(false)}>
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div onClick={handleModalClick} className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className='p-3 items-center flex justify-center border-b-2 font-semibold'>
                  Create New Post
                </div>
                <div className="flex items-center justify-center p-12">
                  <div className="mx-auto w-full max-w-[550px] bg-white">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-6 pt-4">
                        <div className="mb-8">
                          <input
                            type="file"
                            name="file"
                            id="file"
                            onChange={(event) => {
                              const selectedFile = event?.target?.files?.[0];
                              if (selectedFile) {
                                setValues(
                                  {
                                    ...values,
                                    file: selectedFile
                                  },
                                  false //  to avoid validation checks after setting the value
                                );
                              }
                            }}
                            onBlur={handleBlur}
                            className="sr-only" />
                          <label
                            htmlFor="file"
                            className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
                          >
                            <div>
                              <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                                Drop files here
                              </span>
                              <span className="mb-2 block text-base font-medium text-[#6B7280]">
                                Or
                              </span>
                              <span
                                className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]"
                              >
                                Browse
                              </span>
                            </div>
                          </label>
                        </div>
                        <div className="mb-5">
                          <label
                            htmlFor="caption"
                            className="mb-3 block text-base font-medium text-[#07074D]"
                          >
                            Caption
                          </label>
                          <input
                            type="text"
                            name="caption"
                            id="caption"
                            placeholder="#trendhub"
                            value={values.caption}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                          />
                        </div>
                      </div>
                      <div>
                        {isLoading ? (
                          <div className='md:w-2/3 py-4   '>
                            <button disabled type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                              <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                              </svg>
                              Updating...
                            </button>
                          </div>
                        ) : (
                          <div className="md:w-2/3 py-4">
                            <button type="submit" className="shadow bg-blue-600 hover:bg-blue-800 focus:shadow-outline focus:outline-none text-white font-semibold py-2 px-4 rounded" >
                              Save
                            </button>
                          </div>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreatePost