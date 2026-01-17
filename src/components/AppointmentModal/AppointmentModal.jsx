import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./AppointmentModal.module.css";
import toast from "react-hot-toast";

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
  comment: yup.string(),
});

export default function AppointmentModal({ isOpen, onClose, nanny }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      address: "",
      phone: "+380",
      childAge: "",
      time: "00:00",
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

  const onSubmit = async () => {
    try {
      handleClose();
      toast.success("Appointment successfully booked!");
    } catch {
      toast.error("Something went wrong. Try again.");
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
          <svg className={styles.closeIcon}>
            <use href="/icons.svg#icon-close" />
          </svg>
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
              <MeetingTimeSelect
                value={watch("time")}
                onChange={(val) =>
                  setValue("time", val, { shouldValidate: true })
                }
                error={errors.time?.message}
              />
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

function MeetingTimeSelect({ value, onChange, error }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  const options = ["09:00", "09:30", "10:00", "10:30"];

  function formatTimeParts(t) {
    if (!t) return { hh: "00", mm: "00" };
    const [hh = "00", mm = "00"] = t.split(":");
    return { hh, mm };
  }

  useEffect(() => {
    if (!open) return;

    const onDocClick = (e) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target)) setOpen(false);
    };

    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onDocClick);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onDocClick);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const label = value ? value.replace(":", " : ") : "00 : 00";

  return (
    <div className={styles.timeField} ref={rootRef}>
      <button
        type="button"
        className={`${styles.input} ${styles.timeButton} ${
          error ? styles.inputError : ""
        }`}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{label}</span>

        <svg className={styles.clockIcon} aria-hidden="true">
          <use href="/icons.svg#icon-clock" />
        </svg>
      </button>

      {open && (
        <div className={styles.timeDropdown}>
          <p className={styles.timeTitle}>Meeting time</p>

          <ul className={styles.timeList}>
            {options.map((opt) => {
              const active = opt === value;
              const { hh, mm } = formatTimeParts(opt);
              return (
                <li key={opt}>
                  <button
                    type="button"
                    className={`${styles.timeOption} ${
                      active ? styles.timeOptionActive : ""
                    }`}
                    onClick={() => {
                      onChange(opt);
                      setOpen(false);
                    }}
                  >
                    <span className={styles.timeValue}>
                      <span>{hh}</span>
                      <span className={styles.timeColon}>:</span>
                      <span>{mm}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}
