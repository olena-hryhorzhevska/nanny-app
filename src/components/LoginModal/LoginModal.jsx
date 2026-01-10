
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./LoginModal.module.css";

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
    <div className={styles.backdrop} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={handleClose}>
          ×
        </button>

        <div className={styles.modalInfo}>
          <h2 className={styles.modalTitle}>Log In</h2>
          <p className={styles.modalParagraph}>
            Welcome back! Please enter your credentials to access your account
            and continue your babysitter search.
          </p>
        </div>

        <form
          className={styles.modalForm}
          onSubmit={handleSubmit(submitHandler)}
        >
          <div className={styles.fields}>
            <input
              placeholder="Email"
              className={styles.modalInput}
              type="email"
              {...register("email")}
            />
            {errors.email && (
              <span className={styles.fieldError}>{errors.email.message}</span>
            )}

            <input
              placeholder="Password"
              className={styles.modalInput}
              type="password"
              {...register("password")}
            />
            {errors.password && (
              <span className={styles.fieldError}>
                {errors.password.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className={styles.modalSubmit}
            disabled={isSubmitting}
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}