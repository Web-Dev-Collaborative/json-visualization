

// workimg

import React, { useState } from 'react';
import styled from 'styled-components';



const Toggle = (props) => {
  const [ visible, setVisible ] = useState(false)

  if ( props.value ) {
    return (
      <div className="toggle-item">
        <div className="title" onClick={ () => { setVisible(!visible) } }>{visible ? '-' : '+'} { props.title }</div>
        { visible &&
          <div className="value">{ props.value }</div>
        }
      </div>
    )
  } else {
    return (
      <div className="item">
        <div className="title-2">{ props.title }</div>
      </div>
    )
  }

}






const generateJSX = (data, output = []) => {

  if ( Array.isArray(data) ) {
    data.forEach( (item, index) => {
      if ( typeof item === 'object' ) {
        const sub = generateJSX(item);
        output.push(<Toggle key={index} title={index} value={sub} />)
      } else {
        output.push(<Toggle key={index} title={item} clickable={false} />)
      }
    });
  } else if ( typeof data === 'object' ) {
    Object.keys(data).forEach( (item, index) => {
      if ( typeof data[item] === 'object' ) {
        const sub = generateJSX(data[item]);
        output.push(<Toggle key={index} title={item} value={sub} />)
      } else {
        output.push(<Toggle key={index} title={item} value={data[item]} />)
      }
    });

  } else {
    console.log("else", data);
  }

  return output;
}


const JSONRenderer = (props) => {
  const data = props.json;
  const json_jsx = generateJSX( data );

  return (
    <JSONWrapper>
      <Toggle title="#root" value={<div className="elements">{ json_jsx }</div>} />

    </JSONWrapper>
  )

}


export default JSONRenderer;


const JSONWrapper = styled.div`
  margin-top: 40px;
  border: 1px solid #ccc;
  padding: 20px;
  max-height: 600px;
  overflow: auto;
  max-width: 700px;
  margin-left: -100px;

  div.elements div {
    margin-left: 10px;
    border-left: 1px dotted #ccc;
  }

  .flex {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    &.row { flex-direction: row; }

    .key { font-weight: 600; }
    .value { color: #999; marign: 0; }
  }







  .toggle-item {
    .title {
      cursor: pointer;
      font-size: 20px;
    }
    .value {
    }
    .title-2 {
      cursor: default;
      font-size: 16px;
    }

    & .toggle-item { border: none; }

  }




`;


    // border: 1px solid #999;


// const JSONWrapper2 = styled.div``;









const generateJSX = (data, output = []) => {

  if ( Array.isArray(data) ) {
    data.forEach( (item, index) => {
      if ( typeof data[item] === 'object' ) {
        const sub = generateJSX(data[item]);
        output.push(
          <div className="flex" key={index}>
            <div className="key">+ {item}</div>
            <div>{sub}</div>
          </div>
        )
      } else {
        output.push(
          <div className="flex row" key={index}>
            <div className="key">{index}</div>
            <div className="value">{ item }</div>
          </div>
        )
      }
    });
  } else if ( typeof data === 'object' ) {
    Object.keys(data).forEach( (item, index) => {
      if ( typeof data[item] === 'object' ) {
        const sub = generateJSX(data[item]);
        output.push(
          <div className="flex" key={index}>
            <div className="key">+ {item}</div>
            <div>{sub}</div>
          </div>
        )
      } else {
        output.push(
          <div className="flex row" key={index}>
            <div className="key">{item}</div>
            <div className="value">{ data[item] }</div>
          </div>
        )
      }
    });

  } else {
    console.log("else", data);
  }

  return output;
}



























const generateJSX = (data, output = []) => {
  if ( Array.isArray(data) ) {
    data.forEach( (item, index) => {
      // console.log("array-item", item, data[index])
      if ( typeof item === 'object' ) {
        const sub = generateJSX(item);
        output.push(
          <div key={index}>
            <div>+-</div>
            <div>{sub}</div>
          </div>
        )
      } else {
        output.push(
          <div key={index}>
            <div>{item}</div>
          </div>
        )
      }
    });
  } else if ( typeof data === 'object' ) {
    Object.values(data).forEach( (item, index) => {
      console.log("xxx-item", item)
      if ( typeof item === 'object' ) {
        const sub = generateJSX(item);
        output.push(
          <div key={index}>
            <div>+ { Array.isArray(item) ? 'DHRUV' : Object.keys(item)[0] }</div>
            <div>{sub}</div>
          </div>
        )
      } else {
        output.push(
          <div key={index}>
            <div>{item}</div>
          </div>
        )
      }
    });
  } else {
    output.push(<p>{data}</p>);
  }

  return output;
}
