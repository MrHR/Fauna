import React, { Component } from 'react';
import { css } from 'glamor';
import { Link } from 'react-router-dom';

const ButtonRound = css({
    background: 'rgb(55, 212, 152)',
    width:'30px',
    height:'30px',
    border:'none',
    borderRadius:'3000px',
    fontSize:'1em',
    color:'white'
});

class EncounterActionWrapper extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        return(
            <div>
                <button {...ButtonRound}>+</button>
            </div>
        )
    }
}

export default EncounterActionWrapper