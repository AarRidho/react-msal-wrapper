import React from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import { ThemeProvider } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";

import { theme } from "./styles/theme";
import { MsalWrapper } from 'react-msal-wrapper';
import 'react-msal-wrapper/dist/index.css';

import { PageLayout } from "./ui-components/PageLayout";

import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile.jsx";

import { msalConfig } from "./authConfig";
import { PublicClientApplication } from '@azure/msal-browser';

const msalInstance = new PublicClientApplication(msalConfig);

const App = () => {
  const history = useHistory();
  // console.log(msalInstance);
  // console.log(msalConfig);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <MsalWrapper
          instance={msalInstance}
          config={{
            instanceConfig: msalConfig,
            router: history
          }}
        >
          <PageLayout>
            <Grid container justify="center">
              <Pages />
            </Grid>
          </PageLayout>
        </MsalWrapper>
      </ThemeProvider>
    </Router>
  );
}

const Pages = () => {
  return (
    <Switch>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  )
}

// const App = () => {
//   return (<h1>Example Component</h1>)
// }

export default App;
