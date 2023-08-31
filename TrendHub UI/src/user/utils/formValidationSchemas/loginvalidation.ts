import * as yup from 'yup'


const loginValidation= yup.object().shape({
    userName: yup.string().required("required"),
    password: yup.string().required("required"),
})


export default loginValidation