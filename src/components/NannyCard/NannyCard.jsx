import styles from "./NannyCard.module.css";
import { useState } from "react";

export default function NannyCard({ nanny }) {
  const [isReadMore, setIsReadMore] = useState(false);

  return (
      <article className={styles.card}>
        <div className={styles.avatarWrapper}>
          <div className={styles.avatarInner}>
            <img
              src={nanny.avatar_url}
              alt={`Avatar of ${nanny.name}`}
              className={styles.avatar}
            />
          </div>
        </div>
        <div className={styles.content}>
          <p className={styles.role}>Nanny</p>
          <h2 className={styles.name}>{nanny.name}</h2>
          <div className={styles.badges}>
            <span className={styles.badge}>
              Age:{" "}
              <strong className={styles.ageStrong}>
                {getAge(nanny.birthday)}
              </strong>
            </span>
            <span className={styles.badge}>
              Experience: <strong>{nanny.experience}</strong>
            </span>
            <span className={styles.badge}>
              Kids Age: <strong>{nanny.kids_age}</strong>
            </span>
            <span className={styles.badge}>
              Characters: <strong>{nanny.characters.join(", ")}</strong>
            </span>
            <span className={styles.badge}>
              Education: <strong>{nanny.education}</strong>
            </span>
          </div>
          <p className={styles.about}>{nanny.about}</p>
          {!isReadMore ? (
            <button
              type="button"
              className={styles.readMoreBtn}
              onClick={() => setIsReadMore(true)}
            >
              Read more
            </button>
          ) : (
            <div className={styles.details}>
              <ul className={styles.reviews}>
                {nanny.reviews?.map((r, idx) => (
                  <li className={styles.reviewItem} key={idx}>
                    <div className={styles.reviewAvatar}>
                      {r.reviewer?.[0]?.toUpperCase() ?? "U"}
                    </div>
                    <div className={styles.reviewBody}>
                      <div className={styles.reviewHeader}>
                        <p className={styles.reviewerName}>{r.reviewer}</p>
                        <div className={styles.reviewRating}>
                          <svg className={styles.starIcon}>
                            <use href="/src/assets/icons.svg#icon-rating-star" />
                          </svg>
                          <span>{r.rating}</span>
                        </div>
                      </div>
                    </div>
                    <p className={styles.reviewText}>{r.comment}</p>
                  </li>
                ))}
              </ul>
              <button type="button" className={styles.appointmentBtn}>
                Make an appointment
              </button>
            </div>
          )}
        </div>
        <div className={styles.meta}>
          <ul className={styles.metaList}>
            <li className={styles.metaItem}>
              <svg className={styles.iconLocation}>
                <use href="/src/assets/icons.svg#icon-location-pin" />
              </svg>
              {nanny.location}
            </li>
            <li className={styles.metaItem}>
              <svg className={styles.iconStar}>
                <use href="/src/assets/icons.svg#icon-rating-star" />
              </svg>
              Rating: {nanny.rating}
            </li>
            <li className={styles.metaItem}>
              Price / 1 hour:{" "}
              <strong className={styles.price}>${nanny.price_per_hour}</strong>
            </li>
          </ul>
          <button
            type="button"
            className={styles.favoriteBtn}
            aria-label="Add to favorites"
          >
            <svg className={styles.icon}>
              <use href="/src/assets/icons.svg#icon-fav-star" />
            </svg>
          </button>
        </div>
      </article>
  );
}

function getAge(birthday) {
  const date = new Date(birthday);
  const diff = Date.now() - date.getTime();
  return new Date(diff).getUTCFullYear() - 1970;
}
