import React, { useState } from "react";
import SpotModal from "../components/SpotModal/SpotModal";
import SpotItem from "../spot/SpotItem";
import TextButton from "../common/TextButton";
import { SpotData } from "../types";

type SearchProps = {
  spots: SpotData[];
};

const Search = ({ spots }: SearchProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState<SpotData>();

  return (
    <div className="Search">
      <div className="SpotList">
        <div className="SpotList-feature">
          <div className="SpotList-breadcrumbs">
            {/* @ts-expect-error: TODO fix */}
            <TextButton>Chicago</TextButton> &gt; Millennium Park
          </div>
          <h1>Millennium Park</h1>
          <p>{spots.length} Spots Available</p>
        </div>
        <div className="SpotList-spots">
          {spots.map((spot, index) => (
            <SpotItem
              key={spot.id}
              data={spot}
              isSelected={spot.id === selectedSpot?.id}
              handleDetailsClick={() => {
                setIsModalOpen(true);
                setSelectedSpot(spot);
              }}
            />
          ))}
        </div>
      </div>
      <div className="Search-content">
        <SpotModal
          spotData={selectedSpot}
          handleClose={() => setIsModalOpen(false)}
          isModalOpen={isModalOpen}
        />
      </div>
    </div>
  );
};

export default Search;
