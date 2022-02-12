import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Image from "../common/Image";
import TextButton from "../common/TextButton";
import SpotModal from "../components/SpotModal/SpotModal";

type DataInformation = {
  image: string;
  distance: string;
  title: string;
};

type SpotItemProps = {
  showDetails: boolean;
  isSelected: boolean;
  data: DataInformation;
  onDetailsClick: () => void;
};

// todo
// handle own details click
//remove uncessary props for this project: is selected, show details, onDetails click

const SpotItem = ({
  showDetails = true,
  isSelected,
  data,
  onDetailsClick,
}: SpotItemProps) => {
  return (
    <div
      className={classNames("SpotItem", {
        "SpotItem-selected": isSelected,
      })}
    >
      {/* <Image src={data.image} /> */}
      <div className="SpotItem-info">
        <h2>{data.title}</h2>
        <p>{data.distance}</p>
        {showDetails && (
          <div>
            hello
            {/* @ts-expect-error:sdfg */}
            <TextButton onClick={onDetailsClick}>hello</TextButton>
          </div>
        )}
      </div>

      <SpotModal />
    </div>
  );
};

export default SpotItem;
