import React, { Component } from 'react';
import { css } from 'glamor';

const container = css({
    padding:'20px',
    backgroundColor: '#563593',
    '> h1' : {
      fontSize: '1.5em',
      color: '#fff',
      fontFamily: 'Helvetica'
    }
});

class Banner extends Component {
  render() {
    return (
      <div {...container}>
        <h1>Story Title</h1>
      </div> 
    )
  }
}

export default Banner