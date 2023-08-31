import * as yup from 'yup';

interface FormValues {
    userName?: string;
    location?: string;
    // Add other fields as needed
}

const editProfileValidation = yup.object().shape<FormValues>({
    name: yup.string(),
    location: yup.string().notOneOf([Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]),
    // Add other validation rules for other fields
});

export default editProfileValidation;
