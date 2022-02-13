import React, { PureComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Button from "../common/Button";
import Image from "../common/Image";
import { SpotData } from "../types";

type ConfirmationData = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  spotId: string;
};

const Confirmation = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [spotData, setSpotData] = useState<SpotData | undefined>();
  const [reservationData, setReservationData] = useState<
    ConfirmationData | undefined
  >();

  useEffect(() => {
    const getConfirmationData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`/reservations/${id}`);
        console.log(data, "data");

        setReservationData(data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

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

    getConfirmationData();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!spotData || !reservationData) {
    return null;
  }

  const { title, price, image } = spotData;
  const { email } = reservationData;

  return (
    <div className="Confirmation">
      <h1>Park it like its hot!</h1>
      <p>
        You successfully purchased parking at <strong>{title}</strong> for{" "}
        <strong>{`$${(price / 100).toFixed(2)}`}</strong>.
      </p>
      {/* @ts-expect-error */}
      <Image src={image} />
      <p>
        We emailed a receipt to <a href={`mailto:${email}`}>{email}</a>.
      </p>
      {/* @ts-expect-error */}
      <Button color="primary" onClick={() => {}}>
        Purchase Another Spot!
      </Button>
    </div>
  );
};

export default Confirmation;
