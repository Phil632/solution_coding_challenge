import React from "react";
import PropTypes from "prop-types";

const GraphTrack = (props) => {
  const { startNodeX, startNodeY, endNodeX, endNodeY, trackKey } = props;

  return (
    <line
      x1={startNodeX}
      y1={startNodeY}
      x2={endNodeX}
      y2={endNodeY}
      className="graph-track"
      key={trackKey}
      data-testid={trackKey}
    />
  );
};

GraphTrack.propTypes = {
  startNodeX: PropTypes.number,
  startNodeY: PropTypes.number,
  endNodeX: PropTypes.number,
  endNodeY: PropTypes.number,
  trackKey: PropTypes.string,
};

export default GraphTrack;
