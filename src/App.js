import React, { Component } from 'react';
import UploadPage from 'ui/Upload';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      json: null,
    }
    this.handleJson = this.handleJson.bind(this);
  }

  handleJson(data) {
    this.setState({ json: data });
  }


  render() {
    console.log("this.state.json", this.state.json);

    return (
      <div>
        <UploadPage handleJson={this.handleJson} />
        <div style={{ marginTop: 50,maxWidth: 500, margin: '0 auto' }}>{ JSON.stringify(this.state.json) }</div>
      </div>
    )

  }


}


export default App;
