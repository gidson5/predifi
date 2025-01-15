"use client";
import React from "react";

import { sepolia, mainnet } from "@starknet-react/chains";
import { InjectedConnector } from "starknetkit/injected";
import {
  ArgentMobileConnector,
  isInArgentMobileAppBrowser,
} from "starknetkit/argentMobile";
import { WebWalletConnector } from "starknetkit/webwallet";
import {
  StarknetConfig,
  voyager,
  publicProvider,
} from "@starknet-react/core";

export function StarknetProvider({ children }: { children: React.ReactNode }) {
  const chains = [mainnet, sepolia];
   const connectors = isInArgentMobileAppBrowser()
     ? [
         ArgentMobileConnector.init({
           options: {
             dappName: "predifi",
             projectId: "nova-1",
             url: "",
           },
           inAppBrowserOptions: {},
         }),
       ]
     : [
         new InjectedConnector({ options: { id: "braavos", name: "Braavos" } }),
         new InjectedConnector({
           options: { id: "argentX", name: "Argent X" },
         }),
         new WebWalletConnector({ url: "https://web.argent.xyz" }),
         ArgentMobileConnector.init({
           options: {
             dappName: "predifi",
             projectId: "nova-1",
             url: "",
           },
         }),
       ];

  return (
    <StarknetConfig
      chains={chains}
      provider={publicProvider()}
      connectors={connectors}
      explorer={voyager}
    >
      {children}
    </StarknetConfig>
  );
}
