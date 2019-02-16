import React, {Component} from 'react';
import {withStyles, Paper, Button, Input, Icon, Typography, MuiThemeProvider} from '@material-ui/core';
import {FuseAnimate, FuseSelectedTheme} from '@fuse';
import * as Actions from '../store/actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {Link} from 'react-router-dom';

const styles = theme => ({
    root: {}
});

class BidsHeader extends Component {

    render()
    {
        const {classes, setSearchText, searchText} = this.props;
        return (
            <div className={classNames(classes.root, "flex flex-1 w-full mx-8 items-center justify-between")}>

                <div className="flex items-center">
                    <FuseAnimate animation="transition.expandIn" delay={300}>
                        <Icon className="text-32 mr-0 sm:mr-12">directions_car</Icon>
                    </FuseAnimate>
                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                        <Typography className="hidden sm:flex" variant="h6">Vehicules</Typography>
                    </FuseAnimate>
                </div>

                <div className="flex flex-1 items-center justify-end px-12">

                    <MuiThemeProvider theme={FuseSelectedTheme}>
                        <FuseAnimate animation="transition.slideDownIn" delay={300}>
                            <Paper className="flex items-center w-full max-w-320 px-8 py-4 rounded-8" elevation={1}>

                                <Icon className="mr-8" color="action">search</Icon>

                                <Input
                                    placeholder="Filter cars by Make and Model"
                                    className="flex flex-1"
                                    disableUnderline
                                    fullWidth
                                    value={searchText}
                                    inputProps={{
                                        'aria-label': 'Filter'
                                    }}
                                    onChange={setSearchText}
                                />
                            </Paper>
                        </FuseAnimate>
                    </MuiThemeProvider>

                </div>
                {/* <FuseAnimate animation="transition.slideRightIn" delay={300}>
                    <Button component={Link} to="/apps/e-commerce/products/new" className="whitespace-no-wrap" variant="contained">
                        <span className="hidden sm:flex">More Information</span>
                        <span className="flex sm:hidden">Info</span>
                    </Button>
                </FuseAnimate> */}
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        setSearchText: Actions.setProductsSearchText
    }, dispatch);
}

function mapStateToProps({eCommerceApp})
{
    return {
        searchText: eCommerceApp.products.searchText
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(BidsHeader));
