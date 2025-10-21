import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { loginUser } from "@/store/auth-slice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  email: "shaik@gmail.com",
  password: "9876543210",
};

const AuthLogin = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData))
      .unwrap()
      .then((data) => {
        if (data?.success) {
          toast({
            title: data?.message,
            description: `Redirecting to ${data?.user.userName}'s dashboard`,
            variant: "success",
          });
          setTimeout(() => {
            if (data.user.role === "admin") {
              navigate("/admin/dashboard");
            } else {
              navigate("/shopping/home");
            }
          });
        } else {
          toast({
            title: data?.message,
            variant: "destructive",
          });
        }
      })
      .catch((err) => {
        toast({
          title: "Logging in failed",
          description: err?.message || "Something went wrong",
          variant: "destructive",
        });
        console.error("login failed:", err);
      });
  };

  const isFormValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  };

  return (
    <>
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground ">
            Sign in to your Account ?
          </h1>
        </div>
        <CommonForm
          formControls={loginFormControls}
          buttonText={"Sign In"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
          isButtonDisabled={!isFormValid()}
        />

        <p className="mt-2 text-center">
          Don't have an account ?
          <Link
            to="/auth/register"
            className="font-medium text-blue-500 hover:text-blue-600 hover:underline ml-2"
          >
            SignUp
          </Link>
        </p>
      </div>
    </>
  );
};

export default AuthLogin;
