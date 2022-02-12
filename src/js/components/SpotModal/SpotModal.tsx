import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./SpotModal.module.scss";

type ModalDataInformation = {
  image: string;
  distance: string;
  title: string;
  price: number;
  description: string;
};

type SpotModalProps = {
  spotData: ModalDataInformation;
  handleClose: () => void;
  isModalOpen: boolean;
};

const SpotModal = ({ spotData, handleClose, isModalOpen }: SpotModalProps) => {
  const { title, description, price } = spotData;
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const formattedPrice = formatter.format(price);

  // TODO make animation smoother
  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div exit={{ opacity: 0 }} className={styles.wrapper}>
          <motion.div exit={{ opacity: 0 }} className={styles.modal}>
            {/* Style X better */}
            <button onClick={handleClose} className={styles.closeButton}>
              x
            </button>
            <div className={styles.modalContent}>
              <h1>Spot Details</h1>
              <span className={styles.contentWrapper}>
                <h2>{title}</h2>
                <p>{description}</p>
                <button
                  className={styles.bookButton}
                >{`${formattedPrice} | Book it!`}</button>
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SpotModal;
