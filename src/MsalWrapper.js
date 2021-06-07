import React from 'react';
import { EventType } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { CustomNavigationClient } from './NavigationClient';

const MsalWrapper = ({ instance, config, children }) => {
  // console.log({ instance, config });
  const navigationClient = new CustomNavigationClient(config.router);
  instance.setNavigationClient(navigationClient);

  // Account selection logic is app dependent. Adjust as needed for different use cases.
  const accounts = instance.getAllAccounts();
  if (accounts.length > 0) {
    // console.log(accounts);
    instance.setActiveAccount(accounts[0]);
  }

  instance.addEventCallback((event) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
      const account = event.payload.account;
      instance.setActiveAccount(account);
    }
  });

  return <MsalProvider instance={instance}>{children}</MsalProvider>;
};

export default MsalWrapper;
