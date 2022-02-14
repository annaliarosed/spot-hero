import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./SpotModal.module.scss";
import { Link } from "react-router-dom";
import { SpotData } from "../../types";

type SpotModalProps = {
  spotData?: SpotData;
  handleClose: () => void;
  isModalOpen: boolean;
};

const SpotModal = ({ spotData, handleClose, isModalOpen }: SpotModalProps) => {
  if (!spotData) {
    return null;
  }

  const { title, description, price, id } = spotData;
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const formattedPrice = formatter.format(price);

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div exit={{ opacity: 0 }} className={styles.wrapper}>
          <motion.div exit={{ opacity: 0 }} className={styles.modal}>
            <button onClick={handleClose} className={styles.closeButton}>
              𝖷
            </button>
            <div className={styles.modalContent}>
              <h1>Spot Details</h1>
              <span className={styles.contentWrapper}>
                <h2>{title}</h2>
                <p className={styles.description}> {description}</p>
                <Link to={`/checkout/${id}`} className={styles.bookButtonLink}>
                  <button
                    className={styles.bookButton}
                  >{`${formattedPrice} | Book it!`}</button>
                </Link>
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SpotModal;
