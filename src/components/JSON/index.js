import React, { useState } from 'react';
import styled from 'styled-components';
import Filter from 'components/Filter';
import Toggle from 'components/Toggle';
import { JSONPath } from 'jsonpath-plus';


// find all matches based on the path provided by JSONPath
const matchByPath = (item, matches, path) => {
  if ( matches.length === 0 ) { return false; }
  if ( matches.includes(`$${path}`) ) { return true; }
  return false;
}


// Generate the JSX components which we will render in the UI
const generateJSX = (data, matched, output = [], path='') => {

  if ( ! data || data.length === 0 ) {
    return;
  }

  if ( Array.isArray(data) ) {
    data.forEach( (item, index) => {
      if ( typeof item === 'object' ) {
        let currentPath = '';
        if ( typeof data[index] === 'object' ) {
          currentPath = path+`[${index}]`;
        } else { currentPath = path+`['${data[index]}']`; }
        const sub = generateJSX(item, matched, [], currentPath);
        const match = matchByPath( data[index], matched, currentPath );
        output.push(<Toggle key={index} match={match} title={index} value={sub} />)
      } else {
        const currentPath = path+`[${index}]`;
        const match = matchByPath( data[index], matched, currentPath );
        output.push(<Toggle inline={true} match={match} key={index} title={index} value={item} />)
      }
    });
  } else if ( typeof data === 'object' ) {
    Object.keys(data).forEach( (item, index) => {
      const currentPath = path+`['${item}']`;
      if ( typeof data[item] === 'object' ) {
        const sub = generateJSX(data[item], matched, [], currentPath);
        const match = matchByPath( item, matched, currentPath );
        output.push(<Toggle key={index} match={match} title={item} value={sub} />)
      } else {
        const match = matchByPath( item, matched, currentPath );
        output.push(<Toggle inline={true} match={match} key={index} title={item} value={data[item]} />)
      }
    });

  } else {
    // do nothing!
  }

  return output;
}


const JSONRenderer = (props) => {
  const data = props.json;
  const matched = props.matched;
  const json_jsx = generateJSX( data, matched );

  return (
    <Container>
      <Filter data={data} />
      <JSONWrapper>
        <Toggle title="JSONDocument" value={<div className="elements">{ json_jsx }</div>} />
      </JSONWrapper>
    </Container>
  )

}


export default JSONRenderer;

const Container = styled.div`
  margin-top: 40px;
`;

const JSONWrapper = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  max-height: 600px;
  overflow: auto;

  div.elements div {
    margin-left: 10px;
    border-left: 1px dotted #ccc;
  }

  .toggle-item {
    &.inline {
      display: flex;
      .title { margin-right: 5px; }
      .value { align-self: center; border: none; margin: 0; color: #009688; }
    }

    &.matched {
      background: yellow;
    }
    .title {
      cursor: default;
      font-size: 16px;
      &.link {
        cursor: pointer;
        color: blue;
      }
    }
    .value {}
    & .toggle-item { border: none; }
  }

`;
