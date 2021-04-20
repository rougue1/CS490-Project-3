/*eslint-disable */
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import Home from "./components/home.js";
import { mount } from "enzyme";

test("Valid Login", () => {
  render(<App />);
  //making sure login page is working
  const linkElement = screen.getByText("Login with Google");
  expect(linkElement).toBeInTheDocument();
  fireEvent.click(linkElement);

  //mocking a successful login by mounting component
  const wrapper = mount(<Home />);
  expect(wrapper.text()).toMatch("Welcome,");
  expect(wrapper.text()).toMatch("Total balance:");
  expect(wrapper.text()).toMatch("Total income:");
});

test("Unsuccessful Login", () => {
  render(<App />);

  const linkElement = screen.getByText("Login with Google");
  const welcome = screen.getByText("Welcome to expense tracker");
  const theContinue = screen.getByText("Please login to continue");
  expect(linkElement).toBeInTheDocument();

  fireEvent.click(linkElement);
  //after clicking on login we are still on the same page because we haven't logged in
  expect(linkElement).toBeInTheDocument();
  expect(welcome).toBeInTheDocument();
  expect(theContinue).toBeInTheDocument();
});
