import "./_hydration";

import React from "react";

import { AuthStore } from "./auth";
import { CounterStore } from "./counter";
import { TaskStore } from "./task";
import { UIStore } from "./ui";

export const stores = {
  auth: new AuthStore(),
  counter: new CounterStore(),
  task: new TaskStore(),
  ui: new UIStore(),
};
type ContextStores = typeof stores;

const storeContext = React.createContext<ContextStores>(stores);
export const StoresProvider: React.FC = ({ children }) => (
  <storeContext.Provider value={stores}>{children}</storeContext.Provider>
);

export const useStores = (): ContextStores => React.useContext(storeContext);

export const hydrateStores = async (): PVoid => {
  for (const key in stores) {
    if (Object.prototype.hasOwnProperty.call(stores, key)) {
      const s = (stores as Stores)[key];

      if (s?.hydrate) {
        await s.hydrate();
      }
    }
  }
};
