import React from "react";
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
};

const SpotModal = ({ spotData, handleClose }: SpotModalProps) => {
  const { title, description, price } = spotData;
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const formattedPrice = formatter.format(price);

  console.log(formattedPrice);

  return (
    <div className={styles.wrapper}>
      <div className={styles.modal}>
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
      </div>
    </div>
  );
};

export default SpotModal;
