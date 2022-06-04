import React, { useState, useContext } from "react";

import { InfrastructureContext } from "../App";
import GraphNode from "./graphNode";
import GraphTrack from "./graphTrack";

const NODE_RADIUS = 5;
const MAX_STROKE_WIDTH = 3;

const GraphNetwork = () => {

  const { nodes, tracks } = useContext(InfrastructureContext);

  const [selectedNodeKey, setSelectedNodeKey] = useState(undefined);

  const getMinimumAndDistance = (nodes, coordinate) => {
    const coordinates = Object.keys(nodes).map(
      (nodeKey) => nodes[nodeKey][coordinate]
    );

    const maximumCoordinate = Math.max.apply(Math, coordinates);
    const minimumCoordinate = Math.min.apply(Math, coordinates);

    const distance = Math.abs(maximumCoordinate - minimumCoordinate);

    return [minimumCoordinate, distance];
  };

  const [xMinimum, xDistance] = getMinimumAndDistance(nodes, "x");
  const [yMinimum, yDistance] = getMinimumAndDistance(nodes, "y");

  const onCanvasClick = (event) => {
    event.preventDefault();

    if (
      Object.keys(nodes)
        .map((nodeKey) => nodeKey)
        .includes(event.target.id)
    )
      return;
    setSelectedNodeKey(undefined);
  };

  const returnNodes = (nodes) => {
    //looping over all node object keys to extract the coordinates for all nodes
    return Object.keys(nodes).map((nodeKey) => {
      const nodeCoordinates = nodes[nodeKey];
      const { x, y } = nodeCoordinates;
      return (
        <GraphNode
          setSelectedNodeKey={setSelectedNodeKey}
          selected={selectedNodeKey === nodeKey}
          nodeRadius={NODE_RADIUS}
          key={`${nodeKey}Component`}
          nodeKey={nodeKey}
          xCoordinate={x}
          yCoordinate={y}
        />
      );
    });
  };

  const findNodeCoordinates = (nodes, nodeName) => {
    const relevantNode = nodes[nodeName];
    const { x, y } = relevantNode;
    return [x, y];
  };

  const returnTracks = (tracks) => {
    //looping over all track object keys to extract the names of all start and endnodes
    return Object.keys(tracks).map((trackKey) => {
      const relevantNodes = tracks[trackKey]["nodes"];
      const [startNodeName, endNodeName] = relevantNodes;
      // extracting the coordinates for the relevant nodes
      const [startNodeX, startNodeY] = findNodeCoordinates(
        nodes,
        startNodeName
      );
      const [endNodeX, endNodeY] = findNodeCoordinates(nodes, endNodeName);
      return (
        <GraphTrack
          key={`${trackKey}Component`}
          trackKey={trackKey}
          startNodeX={startNodeX}
          startNodeY={startNodeY}
          endNodeX={endNodeX}
          endNodeY={endNodeY}
        />
      );
    });
  };

  const additionalViewBoxSpace = NODE_RADIUS + MAX_STROKE_WIDTH;

  const viewBoxString = `${xMinimum - additionalViewBoxSpace} ${yMinimum - additionalViewBoxSpace
    } ${xDistance + 2 * additionalViewBoxSpace} ${yDistance + 2 * additionalViewBoxSpace
    }`;

  return (
    <svg onClick={onCanvasClick} viewBox={viewBoxString}>
      {returnTracks(tracks)}
      {returnNodes(nodes)}
    </svg>
  );
};

export default GraphNetwork;
