import * as yup from 'yup';

const passwordRules = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/;

const signupValidation = yup.object().shape({
  name: yup.string().required('Name required'),
  email: yup.string().email("Please enter a valid email").required('Email required'),
  mobile: yup.number().required('Mobile number required'),
  userName: yup.string().required('User name required'),
  password: yup.string().matches(passwordRules, "Password should contain minimum 6 characters including an uppercase letter and a digit").required('Password required'),
  confirmPassword: yup.string().oneOf([yup.ref("password")], "Passwords must match").required('Confirm password required'),
});

export default signupValidation;
