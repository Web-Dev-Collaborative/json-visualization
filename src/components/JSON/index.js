import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Filter from 'components/Filter';
import { JSONPath } from 'jsonpath-plus';



const Toggle = (props) => {
  const [ visible, setVisible ] = useState(true);

  if ( props.value && typeof props.value !== 'boolean' ) {
    if ( ! props.inline ) {
      return (
        <div className="toggle-item" className={`toggle-item ${props.match ? 'matched' : ''}`}>
          <div className="title link" onClick={ () => { setVisible(!visible) } }>{visible ? '-' : '+'} { props.title }</div>
          { visible && <div className="value">{ props.value }</div> }
        </div>
      )
    } else {
      return (
        <div className="toggle-item inline" className={`toggle-item inline ${props.match ? 'matched' : ''}`}>
          <div className="title">{ props.title }:</div>
          <div className="value">{ props.value }</div>
        </div>
      )
    }
  } else {
    return (
      <div className="toggle-item inline" className={`toggle-item inline ${props.match ? 'matched' : ''}`}>
        <div className="title">{ props.title }</div>
        <div className="value">{ typeof props.value === 'boolean' ? ( props.value === true ? 'true' : 'false' ) : props.value }</div>
      </div>
    )
  }

}



function deepEqual(object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      areObjects && !deepEqual(val1, val2) ||
      !areObjects && val1 !== val2
    ) {
      return false;
    }
  }

  return true;
}

function isObject(object) {
  return object != null && typeof object === 'object';
}



const shallowMatch = (item, matched) => {
  if ( Array.isArray(matched) && matched.length === 0 ) { return false; }
  else if ( typeof matched === 'object' && Object.keys(matched) === 0 ) { return false; }
  try {
    return deepEqual(item, matched);
  } catch (err) {
    return false;
  }
}




const generateJSX = (data, matched, output = []) => {

  if ( ! data || data.length === 0 ) {
    return;
  }

  if ( Array.isArray(data) ) {
    data.forEach( (item, index) => {
      if ( typeof item === 'object' ) {
        const sub = generateJSX(item, matched);
        const match = shallowMatch( item, matched )
        output.push(<Toggle key={index} match={match} title={index} value={sub} />)
      } else {
        const match = shallowMatch( item, matched )
        output.push(<Toggle inline={true} match={match} key={index} title={index} value={item} />)
      }
    });
  } else if ( typeof data === 'object' ) {
    Object.keys(data).forEach( (item, index) => {
      if ( typeof data[item] === 'object' ) {
        const sub = generateJSX(data[item], matched);
        const match = shallowMatch( data[item], matched )
        output.push(<Toggle key={index} match={match} title={item} value={sub} />)
      } else {
        const match = shallowMatch( data[item], matched )
        output.push(<Toggle inline={true} match={match} key={index} title={item} value={data[item]} />)
      }
    });

  } else {
  }

  return output;
}


const JSONRenderer = (props) => {
  console.log("JSONRenderer", props)
  const data = props.json;
  const matched = props.matched;
  // const json_jsx = generateJSX( data );
  const json_jsx = generateJSX( data, matched );



  // return useObserver( () => {

  //   const json_jsx = generateJSX( data );

  //   return (
  //     <Container>
  //       <Filter data={data} />
  //       <JSONWrapper>
  //         <Toggle title="JSONDocument" value={<div className="elements">{ json_jsx }</div>} />
  //       </JSONWrapper>
  //     </Container>
  //   )

  // })


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
    .value {
    }

    & .toggle-item { border: none; }

  }

`;

