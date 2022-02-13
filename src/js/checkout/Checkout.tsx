import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { SpotData } from "../types";
import styles from "./Checkout.module.scss";
import Image from "../common/Image";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

const Checkout = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [spotData, setSpotData] = useState<SpotData | undefined>();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

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
            <p className={styles.formHeaderText}>{`< Back to Search`}</p>
          </NavLink>
        </div>

        <div>
          <div className={styles.spotInformationWrapper}>
            {/* @ts-expect-error: TODO type this */}
            <Image className={styles.image} src={image} />
            <div>
              <h1>{title}</h1>
              <p>{distance}</p>
            </div>
          </div>
          <div className={styles.underline} />
        </div>

        <form
          className={styles.form}
          onSubmit={handleSubmit((data) => console.log(data))}
        >
          <div>
            <p>First Name</p>
            <input className={styles.field} {...register("firstName")} />
          </div>
          <div>
            <p>Last Name</p>
            <input className={styles.field} {...register("lastName")} />
          </div>
          <div>
            <p>Email</p>
            <input className={styles.field} {...register("email")} />
          </div>
          <div>
            <p>Phone Number</p>
            <input className={styles.field} {...register("phoneNumber")} />
          </div>

          <button className={styles.submitButton} type="submit">
            submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
