import React, { Component } from 'react';
import { css } from 'glamor';
import { Link } from 'react-router-dom';

const textarea = css({
    minHeight:'200px'
});


const encoutnerActionWrapper = css({
    width:'auto',
    overflowY:'hidden', 
    overflowX:'scroll',
});

const encounterActionSlider = css({
    width:'auto',
    minWidth: 'unset',
    display:'inline-block',
    display:'grid',
    // gridAutoColumns:'100px',
    gridGap:'10px',
    '> div': {
        gridRow:'1'
    }
});

class HorizontalScroll extends Component {
    render () {
        return(
            <div {...encoutnerActionWrapper} className="noScrollBar">
                <div {...encounterActionSlider} style={{gridAutoColumns:this.props.columnWidth}}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default HorizontalScroll