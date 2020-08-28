import React from 'react';
import { useLocalStore } from 'mobx-react';

export const StoreContext = React.createContext();

export const StoreProvider = ({ children }) => {
  const store = useLocalStore( () => ({
    json: null,
    expression: '',
    matched: [],
    error: '',
    setJson: (json) => {
      store.json = json;
      // let's reset the expression and matched paths!
      store.expression = '';
      store.matched = [];
    },
    setExpression: (expression) => { store.expression = expression; },
    setMatched: (matched) => { store.matched.push(matched); },
    resetMatched: () => { store.matched = []; },
    setError: (error) => { store.error = error; },
  }));

  return (
    <StoreContext.Provider value={store}>{ children }</StoreContext.Provider>
  )
}

export default StoreProvider;
