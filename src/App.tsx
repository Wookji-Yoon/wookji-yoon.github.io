import React from "react";
import Router from "./Router";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme";

const GlobalStyles = createGlobalStyle`
${reset};
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
body{font-family: 'Source Sans Pro', sans-serif;
background-color: ${(props) => props.theme.bgColor};
color: ${(props) => props.theme.fontColor};
transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;}
*{box-sizing:border-box;}
a{color:inherit;text-decoration:none;}
`;

function App() {
  //darkTheme과 lightTheme을 변경하기 위한 함수
  const [theme, setTheme] = React.useState(darkTheme);
  const toggleTheme = () => {
    if (theme === darkTheme) {
      setTheme(lightTheme);
    } else {
      setTheme(darkTheme);
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <button
          style={{ width: "130px", height: "50px" }}
          onClick={toggleTheme}
        >
          테마색 변경하기
        </button>
        <GlobalStyles />
        <Router />
      </ThemeProvider>
    </>
  );
}

export default App;
