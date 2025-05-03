"use client";
import { useFormik } from "formik";
import schema from "@/schemas/schema";

export default function Login() {
  
  const addDb = async () => {
     await fetch("/admin/api/login/db",{
      method: "POST",
      body: JSON.stringify({email: values.email, name: values.name , pswd : values.password}),
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
  const {values, errors, handleChange, handleSubmit, isSubmitting, isValid } = useFormik({
    initialValues: {
      email: '',
      name: '',
      password: '',
    },
    onSubmit: (values, { setSubmitting }) => {
      addDb();
      console.log(values);
      setSubmitting(false);
    },
    validationSchema:schema,
  });
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold">Admin Login</h1>
      <h3>Yetkisiz girişler yasaklanacaktır.</h3>
                {/*FORM*/}
    <form onSubmit={handleSubmit} className="adminLoginForm">
        <div className="inputs">
            <input type="text" name="email" placeholder="Email" required value={values.email} onChange={handleChange} />
            <p className="error">{errors.email}</p>
            <input type="text" name="name" id="name" placeholder="Name" value={values.name} required onChange={handleChange} />
            <p className="error">{errors.name}</p>
            <input type="password" name="password" placeholder="Password" value={values.password} required onChange={handleChange} />
            <p className="error">{errors.password}</p>
            <button type="submit" disabled={isSubmitting || !isValid}>Giriş Yap</button>
        </div>
    </form>
    </div>
  );
}