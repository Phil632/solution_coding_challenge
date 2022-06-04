import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";
import infrastructure from "../static/infrastructure.json";

const testIds = Object.keys(infrastructure.nodes).map((nodeKey) => nodeKey);

test("renders all nodes", () => {
  render(<App />);

  testIds.forEach((testId) => {
    const nodeElement = screen.getByTestId(testId);
    expect(nodeElement).toBeInTheDocument();
  });
});

test("renders all tracks", () => {
  render(<App />);


  testIds.forEach((testId) => {
    const trackElement = screen.getByTestId(testId);
    expect(trackElement).toBeInTheDocument();
  });
});

test("node changes class when clicked", () => {
  render(<App />);

  const testIdToBeClicked = testIds[4];

  const elementToBeClicked = screen.getByTestId(testIdToBeClicked);

  expect(elementToBeClicked.classList.contains("graph-node-selected")).toBe(
    false
  );

  fireEvent.click(elementToBeClicked);

  expect(elementToBeClicked.classList.contains("graph-node-selected")).toBe(true);

  testIds.forEach((testId) => {
    const nodeElement = screen.getByTestId(testId);
    if (testId === testIdToBeClicked) return;
    expect(nodeElement.classList.contains("graph-node")).toBe(true);
  });
});
