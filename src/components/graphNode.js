import React from "react";
import PropTypes from "prop-types";

import "../styles/graph.css";

const GraphNode = (props) => {
  const {
    nodeKey,
    xCoordinate,
    yCoordinate,
    nodeRadius,
    selected,
    setSelectedNodeKey,
  } = props;

  return (
    <circle
      onClick={() => setSelectedNodeKey(nodeKey)}
      className={selected ? "graph-node-selected" : "graph-node"}
      cx={xCoordinate}
      cy={yCoordinate}
      r={nodeRadius}
      key={nodeKey}
      id={nodeKey}
      data-testid={nodeKey}
    />
  );
};

GraphNode.propTypes = {
  nodeKey: PropTypes.string,
  xCoordinate: PropTypes.number,
  yCoordinate: PropTypes.number,
  nodeRadius: PropTypes.number,
  selected: PropTypes.bool,
  setSelectedNodeKey: PropTypes.func,
};

export default GraphNode;
