/*eslint-disable */
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import App from "./App";
import Home from "./components/home.js";
import NavBar from "./components/navigation.js";
import GLogout from "./components/logout.js";
import History from "./components/history.js";
import { mount, shallow } from "enzyme";

test("Valid Login", () => {
  render(<App />);
  const initialState = true;

  //making sure login page is working
  const linkElement = screen.getByText("Login with Google");
  expect(linkElement).toBeInTheDocument();
  fireEvent.click(linkElement);
  const originalError = console.error;
  console.error = jest.fn();

  const wrapper = shallow(<NavBar setLoginStatus={() => true} />);

  expect(wrapper.text()).toMatch("Welcome,");
  expect(wrapper.text()).toMatch("HOME");
  expect(wrapper.text()).toMatch("CHART");

  console.error = originalError;
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

test("Navigate to homepage and click on Add button to show our popup", () => {
  render(
    <Home
      userData={{ balance: 5, income: 7, expense: 17 }}
      getUserInfo={() => {
        "something";
      }}
    />,
  );

  const originalError2 = console.error;
  console.error = jest.fn();

  // const wrapper2 = mount(<Home userData={{'balance':5, 'income':7, 'expense':17}} getUserInfo={()=>{"something"}}/>);
  const homePageBalance = screen.getByText("Total balance:");
  const homePageIncome = screen.getByText("Total income:");
  const homePageExpense = screen.getByText("Total expense:");
  const addTrans = screen.getByText("Add");
  expect(addTrans).toBeInTheDocument();
  fireEvent.click(addTrans);

  const submitButton = screen.getByText("Submit");
  const description = screen.getByText("Description:");
  const theType = screen.getByText("Type");

  expect(submitButton).toBeInTheDocument();
  expect(description).toBeInTheDocument();
  expect(theType).toBeInTheDocument();

  console.error = originalError2;
});

test("Navigate to history page and check if the transactions are present then logout", () => {
  render(<History />);

  const originalError3 = console.error;
  console.error = jest.fn();

  const showAll = screen.getByText("Add");
  expect(showAll).toBeInTheDocument();

  const wrapper = mount(<GLogout />);

  expect(wrapper.text()).toMatch("LOGOUT");

  const wrapper2 = mount(<App />);

  expect(wrapper2.text()).toMatch("Login with Google");
  console.error = originalError3;
});
