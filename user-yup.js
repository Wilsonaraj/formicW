import * as Yup from 'yup';
const UserYup = 
     {firstname: Yup.string()
        .required('This field is required')
        .min(5, "Name is too short. Need atleast 5 letters."),
  country: Yup.string()
      .required('This field is required')
      .min(3, "Name is too short. Need atleast 3 letters.")}

export default UserYup;