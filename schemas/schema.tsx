import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Name is required").max(50, "Name must be less than 50 characters").min(2, "Name must be at least 2 characters"),
  email: yup.string().email("Email is invalid").required("Email is required").max(50, "Email must be less than 50 characters").min(5, "Email must be at least 5 characters"),
  password: yup.string().required("Password is required").max(50, "Password must be less than 50 characters").min(5, "Password must be at least 5 characters"),
});

export default schema;