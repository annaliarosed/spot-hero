import React, { useEffect, useState } from "react";
import axios from "axios";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import App from "./App";
import createStore, { getHistory } from "./store/store";
import { SpotData } from "./types";

const Root = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [spots, setSpots] = useState<SpotData[]>();

  useEffect(() => {
    const loadSpots = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get("/spots");
        setSpots(data);
      } catch (error) {
        console.error(error);
      }

      setIsLoading(false);
    };

    loadSpots();
  }, []);

  if (isLoading) {
    return <div className="Root-loader">Loading...</div>;
  }

  if (!spots) {
    return null;
  }

  return (
    <div className="Root">
      <Provider store={createStore()}>
        <ConnectedRouter history={getHistory()}>
          <App spots={spots} />
        </ConnectedRouter>
      </Provider>
    </div>
  );
};

export default Root;
