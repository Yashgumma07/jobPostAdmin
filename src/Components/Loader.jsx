import React from "react";
import { ClockLoader,BounceLoader } from 'react-spinners';

const Loader = ({item}) => (
  <div className="fallback-spinner position-fixed">
    <div className="loading">
      {item === 'clock' && <ClockLoader color="#0026ab" /> }
      {item === 'bounce' && <BounceLoader color="#0026ab" />}
    </div>
  </div>
);
export default Loader;