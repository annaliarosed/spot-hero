import React from "react";
import { screen, render, waitFor, cleanup } from "@testing-library/react";
import Checkout from "./Checkout";
import axios, { AxiosResponse } from "axios";
import { getHistory } from "../store/store";
import ReactRouter, { Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";

afterEach(cleanup);

jest.mock("axios");

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");

  return {
    ...originalModule,
    useParams: jest.fn(),
  };
});

const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockedResponse: AxiosResponse = {
  data: {
    id: 1,
    image: "test image",
    distance: "123",
    title: "test title",
    price: 12,
    description: "test description",
  },
  status: 200,
  statusText: "OK",
  headers: {},
  config: {},
};

beforeEach(() => {
  mockedAxios.get.mockResolvedValueOnce(mockedResponse);
});

test("renders with empty fields", async () => {
  jest.spyOn(ReactRouter, "useParams").mockReturnValue({ id: "1" });

  render(
    <Router history={getHistory()}>
      <Checkout />
    </Router>
  );

  expect(axios.get).toHaveBeenCalled();
  await waitFor(() => expect(axios.get).toBeCalledWith("/spots/1"));

  const firstNameInput = screen.getByRole("textbox", {
    name: /first name/i,
  });

  const lastNameInput = screen.getByRole("textbox", {
    name: /last name/i,
  });

  const emailInput = screen.getByRole("textbox", {
    name: /email/i,
  });

  const phoneNumberInput = screen.getByRole("textbox", {
    name: /phone number/i,
  });

  expect(firstNameInput).toHaveValue("");
  expect(lastNameInput).toHaveValue("");
  expect(emailInput).toHaveValue("");
  // default value for US phone numbers
  expect(phoneNumberInput).toHaveValue("+1");
});

test("allows user to edit fields ", async () => {
  jest.spyOn(ReactRouter, "useParams").mockReturnValue({ id: "1" });

  render(
    <Router history={getHistory()}>
      <Checkout />
    </Router>
  );

  expect(axios.get).toHaveBeenCalled();
  await waitFor(() => expect(axios.get).toBeCalledWith("/spots/1"));

  const firstNameInput = screen.getByRole("textbox", {
    name: /first name/i,
  });

  const lastNameInput = screen.getByRole("textbox", {
    name: /last name/i,
  });

  const emailInput = screen.getByRole("textbox", {
    name: /email/i,
  });

  const phoneNumberInput = screen.getByRole("textbox", {
    name: /phone number/i,
  });

  userEvent.type(firstNameInput, "Arwen");
  userEvent.type(lastNameInput, "Undómiel");
  userEvent.type(emailInput, "arwenundómiel@gmail.com");
  userEvent.type(phoneNumberInput, "1234567891");

  expect(firstNameInput).toHaveValue("Arwen");
  expect(lastNameInput).toHaveValue("Undómiel");
  expect(emailInput).toHaveValue("arwenundómiel@gmail.com");
  expect(phoneNumberInput).toHaveValue("+1 (123) 456-7891");
});

test("displays error states", async () => {
  jest.spyOn(ReactRouter, "useParams").mockReturnValue({ id: "1" });

  render(
    <Router history={getHistory()}>
      <Checkout />
    </Router>
  );

  expect(axios.get).toHaveBeenCalled();
  await waitFor(() => expect(axios.get).toBeCalledWith("/spots/1"));

  const emailInput = screen.getByRole("textbox", {
    name: /email/i,
  });

  const phoneInput = screen.getByRole("textbox", {
    name: /phone number/i,
  });

  userEvent.type(emailInput, "arwenundómiel@gmail.com");

  // clear input to produce an error
  userEvent.clear(emailInput);

  const emailErrorText = await screen.findByText(/Please enter a valid email/i);
  expect(emailErrorText).toBeInTheDocument();

  userEvent.type(emailInput, "arwenundómiel@gmail.com");
  userEvent.type(phoneInput, "1234567896");

  // clear input to produce an error
  userEvent.clear(phoneInput);

  const phoneErrorText = await screen.findByText(
    /Please enter a valid phone number/i
  );

  expect(phoneErrorText).toBeInTheDocument();
});

test("allows user to submit the form", async () => {
  jest.spyOn(ReactRouter, "useParams").mockReturnValue({ id: "1" });

  render(
    <Router history={getHistory()}>
      <Checkout />
    </Router>
  );

  expect(axios.get).toHaveBeenCalled();
  await waitFor(() => expect(axios.get).toBeCalledWith("/spots/1"));

  const submitButton = screen.getByRole("button", {
    name: /purchase for \$12\.00/i,
  });

  // check that the submit button is disabled when no fields have been touched
  expect(submitButton).toBeDisabled();

  const firstNameInput = screen.getByRole("textbox", {
    name: /first name/i,
  });

  const lastNameInput = screen.getByRole("textbox", {
    name: /last name/i,
  });

  const emailInput = screen.getByRole("textbox", {
    name: /email/i,
  });

  const phoneNumberInput = screen.getByRole("textbox", {
    name: /phone number/i,
  });

  userEvent.type(firstNameInput, "Arwen");
  userEvent.type(lastNameInput, "Undómiel");
  userEvent.type(emailInput, "arwenundomiel@gmail.com");
  userEvent.type(phoneNumberInput, "1234567891");

  expect(firstNameInput).toHaveValue("Arwen");
  expect(lastNameInput).toHaveValue("Undómiel");
  expect(emailInput).toHaveValue("arwenundomiel@gmail.com");
  expect(phoneNumberInput).toHaveValue("+1 (123) 456-7891");

  const enabledSubmitButton = await screen.findByRole("button", {
    name: /purchase for \$12\.00/i,
  });

  expect(enabledSubmitButton).toBeEnabled();

  userEvent.click(enabledSubmitButton);

  waitFor(() => expect(axios.post).toHaveBeenCalled());

  const mockPostData = {
    spotId: "1",
    email: "arwenundomiel@gmail.com",
    phone: "11234567891",
    lastName: "Undómiel",
    firstName: "Arwen",
  };

  await waitFor(() =>
    expect(axios.post).toBeCalledWith("/reservations", mockPostData)
  );
});
