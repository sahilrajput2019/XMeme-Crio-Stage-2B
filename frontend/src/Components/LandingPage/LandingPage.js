import React, { useState } from "react";

import InputForm from "./InputForm/Inputform";
import ShowMemes from "./ShowMemes/ShowMemes";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import "./Landing.css";

const GlobalStyle = createGlobalStyle`
  body{
    background-color : ${(props) =>
      props.theme.mode === "dark" ? "#111" : "#EEE"};
    color : ${(props) => (props.theme.mode === "dark" ? "#EEE" : "#111")};
  }
`;

const LandingPage = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  const date = dd + " - " + mm + " - " + yyyy;

  const [theme, setTheme] = useState({ mode: "light" });

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <div>
          <p className="heading">
            <strong>
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
          <InputForm />
          <ShowMemes />
        </div>
      </>
    </ThemeProvider>
  );
};

export default LandingPage;
