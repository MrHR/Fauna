import React, { Component } from 'react';
import { css } from 'glamor';
import { Link } from 'react-router-dom';

import iconBook from '../../../../../../../public/images/icon_book.png';
import iconSword from '../../../../../../../public/images/icon_sword.png';

const popover = css({
    position:'absolute',
    height:'300px',
    width:'350px',
    top:'calc(50vh - 150px)',
    left:'calc(50vw - 175px)'
})

const buttonWrapper = css({
    width:'100%',
    margin:'40px auto 0 auto',
    display:'flex',
    flexWrap:'wrap',
    justifyContent:'space-around'
})

const btn = css({
    flexBasis:'40%',
    cursor:'pointer',
    backgroundColor:'transparent',
    border:'none',
    outline:'none',
    ':hover img': {
        boxShadow:'0 3px 10px rgba(0, 0, 0, 0.5)',
    },
    ':disabled': {
        opacity: '0.3',
        cursor:'default'
    },
    ':disabled:hover img' : {
        boxShadow:'0 5px 20px rgba(0, 0, 0, 0.5)',
    },
    '> h3': {
        fontSize:'2em',
        textTransform:'uppercase'
    }
})

const btnImage = css({
    width:'100%',
    margin:'0 auto',
    borderRadius:'50%',
    boxShadow:'0 5px 20px rgba(0, 0, 0, 0.5)',
});

class StoryOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render () {
        return(
            <div className="popoverWrapper" onClick={this.props.closePopup}>
                <div className="popover" {...popover}>
                    <h2>Pick one</h2>
                    <div {...buttonWrapper}>
                        <button {...btn} onClick={this.props.addEncounter}>
                            <img src={iconBook} {...btnImage}/>
                        </button>
                        
                        <button {...btn} disabled={true} title={'Coming soon'}>
                            <img src={iconSword} {...btnImage}/>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default StoryOptions