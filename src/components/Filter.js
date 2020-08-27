import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { StoreContext } from 'contexts';
import { JSONPath } from 'jsonpath-plus';



const Filter = (props) => {
  const store = useContext(StoreContext);

  const highlightMatched = ( matched ) => {
    if ( matched ) {
      store.setMatched(matched);
    }
  }


  return (
    <Container>
      <input
        onChange={ (e) => {
          const expression = e.target.value;
          store.setExpression(expression);
          store.setMatched([]);
          // store.setError('');
          try {
            JSONPath({
              path: expression,
              json: props.data,
              // wrap: false,
              callback: highlightMatched,
            });
          } catch (e) {
            console.log("error occurred", e);
          }
        }}
        placeholder="Expression"
      />
      { props.error && <Error>{ props.error }</Error> }
    </Container>
  )

}

export default Filter;

const Container = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;

  input {
    width: 100%;
    font-size: 16px;
    cursor: pointer;
    border; 1px solid #ccc;
    padding: 10px 20px;
    border-radius: 4px;
  }

  button {
    cursor: pointer;
    background: #000;
    color: #FFF;
    border: none;
    border-radius: 4px;
    outline: 0;
    margin-left: 10px;
    padding: 10px 20px;
    transition: all .3s;
    &:hover { background: #FF0000; }
  }
`;


const Error = styled.div`
  background: #ffbfab;
  border: 1px solid #d6856c;
  padding: 20px;
  margin-top: 10px;
  border-radius: 4px;
`;
