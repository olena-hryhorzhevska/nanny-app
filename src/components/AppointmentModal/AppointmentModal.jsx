import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./AppointmentModal.module.css";

const schema = yup.object({
  address: yup.string().required("Address is required"),
  phone: yup
    .string()
    .required("Phone is required")
    .min(6, "Phone is too short"),
  childAge: yup.string().required("Child's age is required"),
  time: yup.string().required("Meeting time is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  parentName: yup.string().required("Name is required"),
  comment: yup.string().required("Comment is required"),
});

export default function AppointmentModal({ isOpen, onClose, nanny }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      address: "",
      phone: "+380",
      childAge: "",
      time: "09:00",
      email: "",
      parentName: "",
      comment: "",
    },
  });

  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleClose = () => {
    onClose?.();
    reset();
  };

  const onSubmit = async (values) => {
    try {
      console.log("Appointment request:", {
        nannyId: nanny?.id,
        nannyName: nanny?.name,
        ...values,
      });

      handleClose();
    } catch (e) {
      console.log(e);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className={styles.backdrop} onClick={handleClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button className={styles.closeBtn} onClick={handleClose} type="button">
          ×
        </button>

        <h2 className={styles.title}>Make an appointment with a babysitter</h2>

        <p className={styles.subtitle}>
          Arranging a meeting with a caregiver for your child is the first step
          to creating a safe and comfortable environment. Fill out the form
          below so we can match you with the perfect care partner.
        </p>

        <div className={styles.nannyRow}>
          <img
            className={styles.nannyAvatar}
            src={nanny?.avatar_url}
            alt={nanny?.name ? `Avatar of ${nanny.name}` : "Nanny avatar"}
          />
          <div className={styles.nannyInfo}>
            <p className={styles.nannyLabel}>Your nanny</p>
            <p className={styles.nannyName}>{nanny?.name}</p>
          </div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.grid}>
            <div className={styles.field}>
              <input
                className={styles.input}
                placeholder="Address"
                {...register("address")}
              />
              {errors.address && (
                <span className={styles.error}>{errors.address.message}</span>
              )}
            </div>

            <div className={styles.field}>
              <input
                className={styles.input}
                placeholder="+380"
                {...register("phone")}
              />
              {errors.phone && (
                <span className={styles.error}>{errors.phone.message}</span>
              )}
            </div>

            <div className={styles.field}>
              <input
                className={styles.input}
                placeholder="Child's age"
                {...register("childAge")}
              />
              {errors.childAge && (
                <span className={styles.error}>{errors.childAge.message}</span>
              )}
            </div>

            <div className={styles.field}>
              <div className={styles.timeWrap}>
                <select className={styles.input} {...register("time")}>
                  <option value="09:00">09 : 00</option>
                  <option value="09:30">09 : 30</option>
                  <option value="10:00">10 : 00</option>
                  <option value="10:30">10 : 30</option>
                </select>

                <svg className={styles.clockIcon}>
                  <use href="/src/assets/icons.svg#icon-clock" />
                </svg>
              </div>

              {errors.time && (
                <span className={styles.error}>{errors.time.message}</span>
              )}
            </div>
          </div>

          <div className={styles.field}>
            <input
              className={styles.input}
              placeholder="Email"
              {...register("email")}
            />
            {errors.email && (
              <span className={styles.error}>{errors.email.message}</span>
            )}
          </div>

          <div className={styles.field}>
            <input
              className={styles.input}
              placeholder="Father's or mother's name"
              {...register("parentName")}
            />
            {errors.parentName && (
              <span className={styles.error}>{errors.parentName.message}</span>
            )}
          </div>

          <div className={styles.field}>
            <textarea
              className={`${styles.input} ${styles.textarea}`}
              placeholder="Comment"
              {...register("comment")}
            />
            {errors.comment && (
              <span className={styles.error}>{errors.comment.message}</span>
            )}
          </div>

          <button
            className={styles.sendBtn}
            type="submit"
            disabled={isSubmitting}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
