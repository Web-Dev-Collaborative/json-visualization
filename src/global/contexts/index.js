import React from 'react';
import { useLocalStore } from 'mobx-react';

export const StoreContext = React.createContext();

export const StoreProvider = ({ children }) => {
  const store = useLocalStore( () => ({
    // json: null,
    json: JSON.parse(`{"store":{"book":[{"category":"reference","author":"Nigel Rees Nigel Rees Nigel Rees Nigel Rees Nigel Rees Nigel Rees Nigel Rees Nigel Rees Nigel Rees Nigel Rees Nigel Rees Nigel Rees Nigel Rees Nigel Rees Nigel Rees Nigel Rees Nigel Rees Nigel Rees Nigel Rees Nigel Rees Nigel Rees Nigel Rees Nigel Rees Nigel Rees Nigel Rees Nigel Rees Nigel Rees","title":"Sayings of the Century","price":8.95},{"category":"fiction","author":"Evelyn Waugh","title":"Sword of Honour","price":12.99},{"category":"fiction","author":"Herman Melville","title":"Moby Dick","isbn":"0-553-21311-3","price":8.99},{"category":"fiction","author":"J. R. R. Tolkien","title":"The Lord of the Rings","isbn":"0-395-19395-8","price":22.99}],"bicycle":{"color":"red","price":19.95}}}`),
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
