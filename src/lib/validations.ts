import * as yup from 'yup';

export const fiscalYearSchema = yup.object().shape({
  name: yup.string().min(3).required('Name is required.'),
  startDate: yup
    .date()
    .required('Start date is required.')
    .typeError('Please enter valid date.'),
  endDate: yup
    .date()
    .required('End date is required.')
    .typeError('Please enter valid date.'),
});

export const studentSchema = yup.object().shape({
  name: yup.string().min(3).required('Name is required.'),
  dateOfBirth: yup.date().required('Date of birth is required.'),
  gender: yup.mixed().oneOf(['male', 'female']).required('Gender is requried.'),
  address: yup.string().required('Address is required.'),
  email: yup.string().email().required('Email is required to contact you.'),
  joinDate: yup.date(),
  rollno: yup.string(),
  contactNo: yup
    .string()
    .required('Phone or any other contact number is required.'),
  referenceCode: yup.string(),
  classId: yup.string().required('Please specify student class.'),
  sectionId: yup.string().required('Please specify student section.'),
});
