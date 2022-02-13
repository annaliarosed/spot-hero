import React, { PureComponent, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Image from "../common/Image";
import TextButton from "../common/TextButton";
import SpotModal from "../components/SpotModal/SpotModal";
import { SpotData } from "../types";

type SpotItemProps = {
  showDetails?: boolean;
  isSelected: boolean;
  spot: SpotData;
  handleDetailsClick: () => void;
};

const SpotItem = ({
  showDetails = true,
  isSelected,
  spot,
  handleDetailsClick,
}: SpotItemProps) => {
  if (!spot) {
    return null;
  }

  const { title, distance, image } = spot;

  return (
    <div
      className={classNames("SpotItem", {
        "SpotItem-selected": isSelected,
      })}
    >
      {/* @ts-expect-error */}
      <Image src={image} />
      <div className="SpotItem-info">
        <h2>{title}</h2>
        <p>{distance}</p>
        {showDetails && (
          <div>
            {/* @ts-expect-error */}
            <TextButton onClick={handleDetailsClick}>Details</TextButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpotItem;
