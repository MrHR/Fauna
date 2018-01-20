import React, { Component } from 'react';
import { css } from 'glamor';

const actionTumb = css({
  background: 'rgb(58, 58, 58)',
  width: '100%',
  height:'60px',
  lineHeight: '60px',
  textAlign: 'center',
  color: '#bbb',
  cursor:'pointer',
  fontSize: '1em'
});

class EncounterAction extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clicked:false,
            className: ''
        }

        this.handleClick = this.handleClick.bind(this);
    }

    //TODO save this in CreateStory otherwise when rerendering encounter selection is lost
    handleClick(event) {

        

        this.setState((prevstate, props) => {
            return {
                className:this.state.clicked ? '' : 'repeatingLinearGradient',
                clicked: !prevstate.clicked
            }
        });
    }

    render () {
        return(
            <div {...actionTumb} onClick={this.handleClick} className={this.state.className}>
                <span>{this.props.object.keyword}</span>
            </div>
        )
    }
}

export default EncounterAction