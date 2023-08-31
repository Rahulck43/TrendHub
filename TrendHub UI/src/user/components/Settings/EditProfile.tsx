import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import apiInstance from '../../utils/apiInstance'
import { useDispatch, useSelector } from 'react-redux'
import { update } from '../../utils/store/userSlice'
import { useNavigate } from 'react-router'
import editProfileValidation from '../../utils/formValidationSchemas/editProfileValidation'


const EditProfile = () => {
    const { userName, userId } = useSelector((store: any) => store.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [userMessage, setuserMessage] = useState('')
    const[isLoading,setIsLoading]= useState(false)
    const [user, setUser] = useState<{ name?: string; bio?: string; location?: string }>({});


    const fetchUserData = async () => {
        const response = await apiInstance.get(`profile/${userName}`)
        setUser(response.data.userData)
    }

    const onSubmit = async (values: any) => {
        try {
            console.log(values)
            setIsLoading(true)
            const result = await apiInstance.patch(`users/${userId}`, values,{
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
            const { success, updatedUser, message } = result.data
            setuserMessage(message)
            dispatch(update({ updatedUser, success }))
            setIsLoading(false)
            navigate('/profile')
        } catch (error: any) {
            console.error(error)
            setuserMessage(error.response.data.message)
        }
    }

    const { values, errors, touched, handleBlur, handleSubmit, handleChange, setValues } = useFormik({
        initialValues: {
            name: user.name || '',
            location: '',
            bio: '',
            file: ''
        },
        onSubmit,
        validationSchema: editProfileValidation,
        enableReinitialize: true
    })

    useEffect(() => {
        fetchUserData()
    }, [])

    useEffect(() => {
        setValues({
            ...values, // Include existing values
            name: user.name || '',
            location: user.location || '',
            bio: user.bio || '',
            file: ''
        });
    }, [user]);

    useEffect(() => {
        if (!userName) {
            navigate('/')
        }
    })


    return (
        <>

            <form autoComplete='off' onSubmit={handleSubmit}>
                <div className="md:w-2/3">
                    <div className="md:w-2/3">
                        <div className="mb-3">
                            <input
                                className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
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
                            />
                        </div>
                    </div>
                </div>
                <div className="mb-6">
                    <label htmlFor="name" className="block mb-2 text-xs font-medium text-gray-900 dark:text-white">Name</label>
                    <input type="text" id="name" name='name' className="block w-1/2 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="location" className="block mb-2 text-xs font-medium text-gray-900 dark:text-white">Location</label>
                    <input type="text" id="location" name='location' className="block w-1/2 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={values.location}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.location && touched.location && <p className="text-red-500">{errors.location}</p>}
                </div>

                <div className="mb-6">
                    <label htmlFor="bio" className="block mb-2 text-xs font-medium text-gray-900 dark:text-white">Bio</label>
                    <textarea id="bio" name='bio' rows="4" className="block p-2.5 w-1/2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=""
                        value={values.bio}
                        onChange={handleChange}
                        onBlur={handleBlur}>

                    </textarea>
                </div>
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


                {/* <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save Changes</button> */}
            </form>
            {userMessage && <p>{userMessage}</p>
            }
        </>
    )
}

export default EditProfile