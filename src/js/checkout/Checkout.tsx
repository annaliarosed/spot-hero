import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import cn from "classnames";
import { NavLink, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
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
    control,
    watch,
    formState: { errors, isDirty, isValid },
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

  const { title, distance, image, price } = spotData;

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const formattedPrice = formatter.format(price);
  // TODO: check all colors

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
            <p className={styles.fieldText}>First Name</p>
            <input className={styles.field} {...register("firstName")} />
          </div>
          <div>
            <p className={styles.fieldText}>Last Name</p>
            <input className={styles.field} {...register("lastName")} />
          </div>
          <div>
            <p className={styles.fieldText}>Email</p>
            <input
              className={styles.field}
              type="email"
              {...register("email", { required: true })}
            />
          </div>
          <div>
            <p className={styles.fieldText}>Phone Number</p>
            {/* <input
              className={styles.field}
              {...register("phoneNumber", { required: true })}
            /> */}

            <Controller
              name="phoneNumber"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <PhoneInput
                  {...field}
                  inputClass={styles.field}
                  country={"us"}
                  specialLabel=""
                />
              )}
            />
          </div>
          <button
            className={cn(styles.submitButton, {
              [styles.disabled]: !isDirty,
            })}
            type="submit"
            disabled={!isDirty}
          >
            {`Purchase for ${formattedPrice}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
