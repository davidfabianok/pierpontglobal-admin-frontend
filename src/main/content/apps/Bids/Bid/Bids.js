import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {FusePageCarded} from '@fuse';
import BidsTable from './BidsTable';
import BidsHeader from './BidsHeader';
import withReducer from 'store/withReducer';
import reducer from './../store/reducers';

const styles = theme => ({});

class Bids extends Component {

    render()
    {
        return (
            <FusePageCarded
                classes={{
                    content: "flex",
                    header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
                }}
                header={
                    <BidsHeader/>
                }
                content={
                    <BidsTable/>
                }
                innerScroll
            />
        )
    };
}

export default withReducer('eCommerceApp', reducer)(withStyles(styles)(Bids));
