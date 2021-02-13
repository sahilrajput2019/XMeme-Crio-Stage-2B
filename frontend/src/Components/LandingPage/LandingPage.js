//importing modules
import React, { useState } from "react";
import InputForm from "./InputForm/Inputform";
import ShowMemes from "./ShowMemes/ShowMemes";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import "./Landing.css";

//for our dark mode
const GlobalStyle = createGlobalStyle`
  body{
    background-color : ${(props) =>
      props.theme.mode === "dark" ? "#111" : "#EEE"};
    color : ${(props) => (props.theme.mode === "dark" ? "#EEE" : "#111")};
  }
`;

//Landing Page Component
const LandingPage = () => {
  // To get today's date
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  const date = dd + " - " + mm + " - " + yyyy;

  //State managment for keeping which mode to render
  const [theme, setTheme] = useState({ mode: "light" });

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <div>
          <p className="heading">
            <strong>
              <span className="heading left">{date}</span>
              Meme Stream
              <span className="heading date">
                <button
                  className="btn btn-dark btn-lg"
                  onClick={(e) =>
                    setTheme(
                      theme.mode === "dark"
                        ? { mode: "light" }
                        : { mode: "dark" }
                    )
                  }
                >
                  {theme.mode === "dark" ? (
                    <i className="fas fa-moon"></i>
                  ) : (
                    <i className="far fa-moon"></i>
                  )}
                </button>
              </span>
            </strong>
          </p>
          {/* Calling two other main components for form input and showing memes */}
          <InputForm />
          <ShowMemes />
        </div>
      </>
    </ThemeProvider>
  );
};

export default LandingPage;
