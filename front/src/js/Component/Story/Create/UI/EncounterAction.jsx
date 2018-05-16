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
            className: 'repeatingLinearGradient',
            Id: props.object.Id,
            clicked: props.object.clicked,
            encounterId: props.object.encounterId,
            keyword: props.object.keyword,
            description: props.object.description,
            
        }

        this.handleClick = this.handleClick.bind(this);

    }

    handleClick(e) {
        this.setState((prevState, props) => {
            const newClicked = !prevState.clicked;
            return {
                clicked: newClicked
            } 
        }, () => {
            const enoucnterAction = {
                Id: this.state.Id,
                clicked: this.state.clicked,
                encounterId: this.state.encounterId,
                keyword: this.state.keyword,
                description: this.state.description
            }
    
            this.props.setEncounterActionState(enoucnterAction);
        });

        
    }

    render () {
        return(
            <div {...actionTumb} onClick={this.handleClick} className={this.state.clicked ? this.state.className : null}>
                <span>{this.props.object.keyword}</span>
            </div>
        )
    }
}

export default EncounterAction