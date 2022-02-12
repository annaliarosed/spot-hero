import React, { PureComponent, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Image from "../common/Image";
import TextButton from "../common/TextButton";
import SpotModal from "../components/SpotModal/SpotModal";

type SpotItemProps = {
  showDetails?: boolean;
  isSelected: boolean;
  //TODO: type this correctly
  data: any;
  handleDetailsClick: () => void;
};

// todo
// handle own details click
//remove uncessary props for this project: is selected, show details, onDetails click

const SpotItem = ({
  showDetails = true,
  isSelected,
  data,
  handleDetailsClick,
}: SpotItemProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log("data", data);

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
            {/* @ts-expect-error:TODO: fix this typing */}
            <TextButton onClick={handleDetailsClick}>Details</TextButton>
          </div>
        )}
      </div>

      <SpotModal
        spotData={data}
        handleClose={() => setIsModalOpen(false)}
        isModalOpen={isModalOpen}
      />
    </div>
  );
};

export default SpotItem;
