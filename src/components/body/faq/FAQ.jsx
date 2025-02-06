import { useState } from "react";
import styles from "../faq/faq.module.css";

const FAQ = () => {
  const [answer, setAnswer] = useState("");

  return (
    <div
      className={`p-3 ${styles.faqContainer} ${
        answer.length > 0 ? styles.bg : ""
      }`}
    >
      <h1 className={`display-2 text-light text-center ${styles.heading}`}>
        FAQ
      </h1>
      <div className={styles.faqsContainer}>
        <div className={styles.half}>
          <div className={`text-light m-3 p-3 ${styles.questions}`}>
            <span>How do I register on the Ride Sharing Platform?</span>
            <span
              className={`${styles.button}`}
              onClick={() => {
                answer.length == 0
                  ? setAnswer(
                      "Employees in the IT park can register on the platform by submitting their personal details to create an account. Each application undergoes a thorough review and verification by the security team, ensuring all provided information is accurate and legitimate. This process is essential to maintain a secure environment and provides employees with access to the platform's resources and features once their account is approved."
                    )
                  : setAnswer("");
              }}
            >
              +
            </span>
          </div>
          <div className={`text-light m-3 p-3 ${styles.questions}`}>
            <span>How do I plan a ride on the platform?</span>
            <span
              className={styles.button}
              onClick={() => {
                answer.length == 0
                  ? setAnswer(
                      "Users can organize their rides by providing the starting and endpoint of their journeys. Other registered users can then search and filter for available rides that align with their travel needs. Once a suitable ride is found, users can book it by paying the required amount. This system ensures a seamless and efficient ride-sharing experience, making it easier for users to find and join rides that match their schedules."
                    )
                  : setAnswer("");
              }}
            >
              +
            </span>
          </div>
          <div className={`text-light m-3 p-3 ${styles.questions}`}>
            <span>How can I report an incident during a ride?</span>
            <span
              className={styles.button}
              onClick={() => {
                answer.length == 0
                  ? setAnswer(
                      "Users can report any incidents during their ride through the Incident Management module on the platform. Security heads will investigate these incidents and submit a detailed report. Users can then track the status of their reported incidents, ensuring transparency and timely updates. This system facilitates a safe and responsive environment by addressing and resolving ride-related issues efficiently."
                    )
                  : setAnswer("");
              }}
            >
              +
            </span>
          </div>
          <div className={`text-light m-3 p-3 ${styles.questions}`}>
            <span>
              What are the requirements for registering a vehicle for
              ride-sharing
            </span>
            <span
              className={styles.button}
              onClick={() => {
                answer.length == 0
                  ? setAnswer(
                      "Users can register their vehicles on the platform for ride-sharing to and from the office. Security admins will inspect all registered vehicles. Once verified, users can utilize the ride-sharing service. Users also have the option to delete a vehicle and register a new one, which will undergo the inspection process again. This ensures that all vehicles are safe and compliant for the ride-sharing facility."
                    )
                  : setAnswer("");
              }}
            >
              +
            </span>
          </div>
        </div>
        <div className={`${styles.half}`}>
          {answer.length > 0 && (
            <div>
              <p className={`text-white m-3 p-3 ${styles.response}`} style={{}}>
                {answer}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
