import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { registerUser } from "@/store/auth-slice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

const AuthRegister = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const onSubmit = (e) => {
    e.preventDefault();

    const payload = {
      userName: formData.userName,
      email: formData.email,
      password: formData.password,
    };

    dispatch(registerUser(payload))
      .unwrap()
      .then((data) => {
        if (data?.success) {
          toast({
            title: data.message,
            description: "Please log in to continue.",
            variant: "info",
          });
          setTimeout(() => {
            navigate("/auth/login");
          });
        } else {
          toast({
            title: data.message,
            variant: "warning",
          });
        }
      })
      .catch((err) => {
        toast({
          title: "Registration failed",
          description: err?.message || "Something went wrong",
          variant: "destructive",
        });
        console.error("Register failed:", err);
      });
  };

  const isFormValid = () =>{
    return Object.keys(formData)
    .map((key) => formData[key] !== "")
    .every((item) => item);
  }

  return (
    <>
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground ">
            Create new account
          </h1>
        </div>
        <CommonForm
          formControls={registerFormControls}
          buttonText={"Sign Up"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
          isButtonDisabled={!isFormValid()}
        />

        <p className="mt-2 text-center">
          Already have an account ?
          <Link
            to="/auth/login"
            className="font-medium text-blue-500 hover:text-blue-600 hover:underline ml-2"
          >
            Login
          </Link>
        </p>
      </div>
    </>
  );
};

export default AuthRegister;
