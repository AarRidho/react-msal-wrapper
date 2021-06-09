# react-msal-wrapper

> Component that wrap your app with msal library graph-ms

[![NPM](https://img.shields.io/npm/v/react-msal-wrapper.svg)](https://www.npmjs.com/package/react-msal-wrapper) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

NPM:

```bash
npm install --save @azure/msal-browser @azure/msal-react
npm install --save react-msal-wrapper
```

Or Yarn:

```bash
yarn add @azure/msal-browser @azure/msal-react
yarn add react-msal-wrapper
```

## Usage

Wrap your Component with MsalWrapper and import it's config

Create React App:

```jsx
// App.js
import { PublicClientApplication } from '@azure/msal-browser';
import { BrowserRouter as Router, useHistory } from 'react-router-dom';

import { MsalWrapper } from 'react-msal-wrapper';
import Pages from './Pages';
import msalConfig from './msalConfig';

const msalInstance = new PublicClientApplication(msalConfig);

const App = () => {
  // Pass the router to the config wrapper
  const history = useHistory();

  return (
    <Router>
      <MsalWrapper
        instance={msalInstance}
        config={{
          router: history
        }}
      >
        <Pages />
      </MsalWrapper>
    </Router>
  );
};
```

Next.js:

```jsx
// _app.js
import { PublicClientApplication } from '@azure/msal-browser';
import { useRouter } from 'next/router';

import { MsalWrapper } from 'react-msal-wrapper';
import Pages from './Pages';
import msalConfig from './msalConfig';

const msalInstance = new PublicClientApplication(msalConfig);

const App = () => {
  // Pass the router to the config wrapper
  const router = useRouter();

  return (
    <Router>
      <MsalWrapper
        instance={msalInstance}
        config={{
          router: router
        }}
      >
        <Pages />
      </MsalWrapper>
    </Router>
  );
};
```

After you have wrap your app with `<MsalWrapper />`, getting an accessToken for your protected web API is really easy

```jsx
// components/ExampleComponent.js
import { PublicClientApplication } from '@azure/msal-browser';
import { useAcquireToken } from 'react-msal-wrapper';

// Your Exposed API Scopes
// e.g: 'api://<client-id>/<your-registered-scopes-name>
const myServiceScopes = [
  'api://bc0b75e2-ab5e-409e-8e0c-7f253799a59d/sikur.read.all',
  'api://bc0b75e2-ab5e-409e-8e0c-7f253799a59d/sikur.write.all'
];

const ExampleComponent = () => {
  const { accessToken } = useAcquireToken(myServiceScopes);
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = () => {
      const options = {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + accessToken }
      };

      fetch(API_URL + '/my-service', options)
        .then((response) => response.json())
        .then((body) => setData(body?.data))
        .catch((err) => console.log(err));
    };

    getData();
  }, []);

  return <div>{JSON.stringify(data)}</div>;
};
```

Using Graph Data for User Information is also easy as ever

```jsx
// pages/profile.js
import { PublicClientApplication } from '@azure/msal-browser';
import { useGraph } from 'react-msal-wrapper';

const ProfileData = ({graphData}) => {
    return (
        <List className="profileData">
            <NameListItem name={graphData.displayName} />
            <JobTitleListItem jobTitle={graphData.jobTitle} />
            <MailListItem mail={graphData.mail} />
            <PhoneListItem phone={graphData.businessPhones[0]} />
            <LocationListItem location={graphData.officeLocation} />
        </List>
    );
};

const ProfileContent = () => {
  const { graphData } = useGraph();

  return (
    <Paper>
      {graphData && <ProfileData graphData={graphData}>}
    </Paper>
  );
};

// ...
```

Making your Custom Page protected with Login Popup using `InteractionType.Popup` for the user to login

```jsx
// pages/profile.js
import { MsalAuthenticationTemplate } from '@azure/msal-react';
import { InteractionType } from '@azure/msal-browser';

const ProfileContent = () => {
  // ...
};

export const ErrorComponent = ({ error }) => {
  return (
    <Typography variant='h6'>An Error Occurred: {error.errorCode}</Typography>
  );
};

export const Loading = () => {
  return <Typography variant='h6'>Authentication in progress...</Typography>;
};

export function Profile() {
  const authRequest = {
    scopes: ['User.Read']
  };

  const interactionType = InteractionType.Popup;
  // or redirect to login page
  // const interactionType = InteractionType.Redirect;

  return (
    <MsalAuthenticationTemplate
      interactionType={interactionType}
      authenticationRequest={authRequest}
      errorComponent={ErrorComponent}
      loadingComponent={Loading}
    >
      <ProfileContent />
    </MsalAuthenticationTemplate>
  );
}
```

## Notice

When requesting a token, scopes with `'User.Read'` will change your token into v1, thus you will be unable to access your protected web API

You should request a standalone token with your exposed API Scopes for every request that is going to your service

Your Exposed API Scopes will make the token turns into v2, for example:

```jsx
// You could use useAcquireToken with your service scopes in it
// accessToken in v2
const { accessToken } = useAcquireToken(['my.scope.all', 'myCustomScopeName']);

// This token is in v1 and could be use only to request a graphData
const { accessToken: accessTokenGraph } = useAcquireToken(['User.Read']);

// Or simply just use useGraphData instead for conveniences
const { graphData } = useGraph({
  // The Default value is 'https://graph.microsoft.com/v1.0/me'
  graphEndpoint: 'https://graph.microsoft.com/v1.0/me'
});
```

## License

MIT © [AarRidho](https://github.com/AarRidho)
