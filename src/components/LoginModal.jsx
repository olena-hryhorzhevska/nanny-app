
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./LoginModal.css";

const loginSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
});

export default function LoginModal({ isOpen, onClose, onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const submitHandler = (values) => {
    onSubmit?.(values);
  };

  const handleClose = () => {
    onClose();
    reset();
  };

  return (
    <div className="backdrop" onClick={handleClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose}>
          ×
        </button>

        <div className="modal-info">
          <h2 className="modal-title">Log In</h2>
          <p className="modal-paragraph">
            Welcome back! Please enter your credentials to access your account and
            continue your babysitter search.
          </p>
        </div>

        <form className="modal-form" onSubmit={handleSubmit(submitHandler)}>
          <input
            placeholder="Email"
              className="modal-input"
              type="email"
              {...register("email")}
            />
            {errors.email && (
              <span className="field-error">{errors.email.message}</span>
          )}
          
          <input
            placeholder="Password"
              className="modal-input"
              type="password"
              {...register("password")}
            />
            {errors.password && (
              <span className="field-error">{errors.password.message}</span>
            )}

          <button
            type="submit"
            className="modal-submit"
            disabled={isSubmitting}
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
