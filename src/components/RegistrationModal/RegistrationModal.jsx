import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./RegistrationModal.module.css";

const registrationSchema = yup.object({
  name: yup
    .string()
    .min(2, "Minimum 2 characters")
    .required("Name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
});
export default function RegistrationModal({ isOpen, onClose, onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(registrationSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
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

  const handleClose = () => {
    onClose();
    reset();
  };

  const submitHandler = (values) => {
    onSubmit?.(values);
  };

  return (
    <div className={styles.backdrop} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={handleClose}>
          ×
        </button>

        <div className={styles.modalInfo}>
          <h2 className={styles.modalTitle}>Registration</h2>
          <p className={styles.modalParagraph}>
            Thank you for your interest in our platform! In order to register,
            we need some information. Please provide us with the following
            information.
          </p>
        </div>

        <form
          className={styles.modalForm}
          onSubmit={handleSubmit(submitHandler)}
        >
          <div className={styles.fields}>
            <input
              type="text"
              placeholder="Name"
              className={styles.modalInput}
              {...register("name")}
            />
            {errors.name && (
              <span className={styles.fieldError}>{errors.name.message}</span>
            )}
            <input
              type="email"
              placeholder="Email"
              className={styles.modalInput}
              {...register("email")}
            />
            {errors.email && (
              <span className={styles.fieldError}>{errors.email.message}</span>
            )}
            <input
              type="password"
              placeholder="Password"
              className={styles.modalInput}
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
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
