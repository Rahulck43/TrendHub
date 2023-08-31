import * as yup from 'yup'


const adminLloginValidation= yup.object().shape({
    email: yup.string().required("required"),
    password: yup.string().required("required"),
})


export default adminLloginValidation