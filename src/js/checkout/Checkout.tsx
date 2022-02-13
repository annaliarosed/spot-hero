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

const formDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
};

const Checkout = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [spotData, setSpotData] = useState<SpotData | undefined>();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid },
  } = useForm<FormData>({ mode: "onChange", defaultValues: formDefaultValues });

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
  // TODO: break fields out in their own component

  console.log(errors.email?.message, "errors");

  return (
    <div className={styles.checkoutWrapper}>
      <div className={styles.formWrapper}>
        <div className={styles.formHeader}>
          <NavLink className={styles.formHeaderTextLink} to="/">
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
          <div className={styles.fieldWrapper}>
            <p className={styles.fieldText}>First Name</p>
            <input className={styles.field} {...register("firstName")} />
          </div>
          <div className={styles.fieldWrapper}>
            <p className={styles.fieldText}>Last Name</p>
            <input className={styles.field} {...register("lastName")} />
          </div>
          <div
            className={cn(styles.fieldWrapper, {
              [styles.error]: errors.email,
            })}
          >
            <p className={styles.fieldText}>Email</p>
            <input
              className={styles.field}
              type="email"
              {...register("email", {
                required: {
                  value: true,
                  message: "Please enter a valid email",
                },
              })}
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div
            className={cn(styles.fieldWrapper, {
              [styles.error]: errors.phoneNumber,
            })}
          >
            <p className={styles.fieldText}>Phone Number</p>
            <Controller
              name="phoneNumber"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Please enter a valid phone number",
                },
              }}
              render={({ field }) => (
                <PhoneInput
                  {...field}
                  inputClass={styles.field}
                  country={"us"}
                  specialLabel=""
                />
              )}
            />
            {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
          </div>
          <button
            className={cn(styles.submitButton, {
              [styles.disabled]: !isDirty || !isValid,
            })}
            type="submit"
            disabled={!isDirty || !isValid}
          >
            {`Purchase for ${formattedPrice}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
