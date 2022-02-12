import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { SpotData } from "../types";
import styles from "./Checkout.module.scss";
import Image from "../common/Image";

const Checkout = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [spotData, setSpotData] = useState<SpotData | undefined>();

  useEffect(() => {
    const getSpotData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`/spots/${id}`);
        setSpotData(data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    getSpotData();
  }, [id]);

  if (loading) {
    // TODO make prettier
    return <div>Loading....</div>;
  }

  if (!spotData) {
    return null;
  }

  const { title, distance, image } = spotData;

  // TODO: add grey line under spot info

  return (
    <div className={styles.checkoutWrapper}>
      <div className={styles.formWrapper}>
        <div className={styles.formHeader}>
          <NavLink to="/">
            <p className={styles.formHeaderText}>Back to Search</p>
          </NavLink>
        </div>

        <div className={styles.spotInformationWrapper}>
          {/* @ts-expect-error: TODO type this */}
          <Image className={styles.image} src={image} />
          <div>
            <h1>{title}</h1>
            <p>{distance}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
