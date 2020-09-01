

export const flattenJson = ( json, matched, output=[], path=``, depth=0, _match=false ) => {
  if ( ! json ) { return []; }

  // provided json is an array
  if ( typeof json === 'object' && Array.isArray(json) ) {
    json.forEach( (item, index) => {
      const currentPath = path+`[${index}]`;
      const match = matched.includes(`$${currentPath}`) || _match;

      if ( typeof json[index] !== 'object' ) {
        output.push({ path: currentPath, title: index, value: item, depth: depth, hasChildren: true, open: true, match: match });
      } else {
        output.push({ path: currentPath, title: index, value: '', depth: depth, hasChildren: true, open: true, match: match });
        flattenJson( item, matched, output, currentPath, depth+1, match );
      }
    });
  }
  // provided json is an object
  else if ( typeof json === 'object' ) {
    Object.keys(json).forEach( (item, index) => {
      const currentPath = path + `['${item}']`;
      const match = matched.includes(`$${currentPath}`) || _match;

      if ( typeof json[item] === 'object' ) {
        output.push({ path: currentPath, title: item, value: '', depth: depth, hasChildren: true, open: true, match: match });
        flattenJson( json[item], matched, output, currentPath, depth+1, match );
      } else {
        output.push({ path: currentPath, title: item, value: json[item], depth: depth, visible: true, match: match });
      }
    });
  }
  // provided json is not an array or object
  else {
    // console.log("json::!array && !object");
  }

  return output;
}



export const togglePath = (list, togglePaths, origList) => {
  let output = [ ...origList ];

  if ( togglePaths.length > 0 ) {
    togglePaths.map( path => {
      const nodeIndex = output.findIndex( item => item.path === path );
      const node = { ...output[nodeIndex] };
      node.open = false;
      output[nodeIndex] = node;

      output = output.filter( item => {
        if ( item.path === path ) { return true; }
        if ( item.path.includes(path) ) { return false; }
        return true;
      });
    });
    return output;
  }

  return origList;
}




