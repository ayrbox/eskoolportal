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
