import React from "react";
import styles from "./SpotModal.module.scss";

type ModalDataInformation = {
  image: string;
  distance: string;
  title: string;
};

type SpotModalProps = {
  data?: ModalDataInformation;
};

const SpotModal = ({}: SpotModalProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.modal}></div>
    </div>
  );
};

export default SpotModal;
