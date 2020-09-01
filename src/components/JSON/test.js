import React from 'react';
import styled from 'styled-components';
import Filter from 'components/Filter';
import { List, CellMeasurer, CellMeasurerCache } from 'react-virtualized';


const MAX_LINE_CHARS = 46;
const ROW_HEIGHT = 16;
const ITEM_DEPTH_MARGIN = 10;




const flattenJson = ( json, output=[], path=``, depth=0 ) => {
  if ( ! json ) { return []; }
  // console.log("flattenJson:::json, output, path",json, output, path);


  // provided json is an array
  if ( typeof json === 'object' && Array.isArray(json) ) {
    // console.log("json::array");
    json.forEach( (item, index) => {
      const currentPath = path+`[${index}]`;
      if ( typeof json[index] !== 'object' ) {
        output.push({ path: currentPath, title: index, value: item, depth: depth, hasChildren: true });
      } else {
        output.push({ path: currentPath, title: index, value: '', depth: depth, hasChildren: true });
        flattenJson( item, output, currentPath, depth+1 );
      }
    });
  }
  // provided json is an object
  else if ( typeof json === 'object' ) {
    // console.log("json::object");

    Object.keys(json).forEach( (item, index) => {
      const currentPath = path + `['${item}']`;
      if ( typeof json[item] === 'object' ) {
        output.push({ path: currentPath, title: item, value: '', depth: depth, hasChildren: true });
        const children = flattenJson( json[item], output, currentPath, depth+1 );
      } else {
        // const str = `- ${item} : ${json[item]}`;
        // const additional = depth ? depth * 3 : 0;
        // const lineHeight = Math.ceil( (str.length + additional) / MAX_LINE_CHARS);
        // console.log("str",str.length, lineHeight);
        // lineHeight: lineHeight
        output.push({ path: currentPath, title: item, value: json[item], depth: depth });
      }
    });





  }
  // provided json is not an array or object
  else {
    console.log("json::!array && !object");



  }



  return output;
}







const JSONRenderer = (props) => {
  const data = props.json;
  const matched = props.matched;
  const list = flattenJson(data);
  console.log("\n\flattened list: ", list);

  const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: ROW_HEIGHT,
  });


  // const findRowHeight = ({ index }) => {
  //   const item = list[index];
  //   const lineHeight = parseInt(item.lineHeight) || 1;
  //   return lineHeight*ROW_HEIGHT;
  // }


  const rowRenderer = ({ key, index, style, parent }) => {
    const item = list[index];
    return (
      <CellMeasurer
        key={key}
        cache={cache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        <div key={key} style={{ ...style, marginLeft: item.depth* ITEM_DEPTH_MARGIN }}>
          { item.hasChildren ? '-' : '' } {item.title}: {item.value}
        </div>
      </CellMeasurer>
    )
  }


  return (
    <Wrapper>
      <Filter data={data} />

      <List
        width={ 400 }
        height={ 400 }
        rowCount={ list.length }
        deferredMeasurementCache={ cache }
        // rowHeight={ findRowHeight }
        rowHeight={ cache.rowHeight }
        rowRenderer={ rowRenderer }
      />

    </Wrapper>
  )
}

export default JSONRenderer;


const Wrapper = styled.div`
  margin-top: 40px;
  padding: 20px;
  border: 1px solid #ccc;
  & > div { outline: 0; }
`;











/*

CellMeasurer, CellMeasurerCache

  const cache = new CellMeasurerCache({
    defaultHeight: 32,
    fixedWidth: true,
  });


      <CellMeasurer
        cache={cache}
        columnIndex={0}
        key={key}
        parent={parent}
        rowIndex={index}
      >
        <div key={key} style={{ ...style, marginLeft: item.depth*10 }}>
          { item.hasChildren ? '-' : '' } {item.title}: {item.value}
        </div>
      </CellMeasurer>

    deferredMeasurementCache={ cache }





*/












import React from 'react';
import styled from 'styled-components';
import Filter from 'components/Filter';
import Toggle from 'components/Toggle';



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
      background: #fffff3;
      .title, .value { color: red; }
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
