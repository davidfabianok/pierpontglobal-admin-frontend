import React, {Component} from 'react';
import {withStyles
    , Table, TableBody, TableCell, TablePagination, TableRow, Checkbox} from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import {FuseScrollbars} from '@fuse';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import * as Actions from 'main/content/apps/e-commerce/store/actions';
import ProductsTableHead from './ProductsTableHead';
import _ from '@lodash';

const styles = theme => ({
    root: {}
});

class ProductsTable extends Component {
    state = {
        order      : 'asc',
        orderBy    : null,
        selected   : [],
        data       : this.props.products,
        page       : 0,
        rowsPerPage: 25
    };

    componentDidMount()
    {
        this.props.getProducts();
    }

    componentDidUpdate(prevProps, prevState)
    {
        if ( !_.isEqual(this.props.products, prevProps.products) || !_.isEqual(this.props.searchText, prevProps.searchText))
        {
            const data = this.getFilteredArray(this.props.products, this.props.searchText);
            this.setState({data})
        }
    }

    getFilteredArray = (data, searchText) => {
        if ( searchText.length === 0)
        {
            return data;
        }
        return _.filter(
            data, item => item.car_maker.concat(' ', item.car_model, ' ', item.trim, ' ', item.year).toLowerCase().includes(searchText)
        );
        
    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if ( this.state.orderBy === property && this.state.order === 'desc' )
        {
            order = 'asc';
        }

        this.setState({
            order,
            orderBy
        });
    };

    handleSelectAllClick = event => {
        if ( event.target.checked )
        {
            this.setState(state => ({selected: this.state.data.map(n => n.id)}));
            return;
        }
        this.setState({selected: []});
    };

    handleClick = (item) => {
        this.props.history.push('/apps/e-commerce/products/' + item.id + '/' + item.handle);
    };

    handleCheck = (event, id) => {
        const {selected} = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if ( selectedIndex === -1 )
        {
            newSelected = newSelected.concat(selected, id);
        }
        else if ( selectedIndex === 0 )
        {
            newSelected = newSelected.concat(selected.slice(1));
        }
        else if ( selectedIndex === selected.length - 1 )
        {
            newSelected = newSelected.concat(selected.slice(0, -1));
        }
        else if ( selectedIndex > 0 )
        {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        this.setState({selected: newSelected});
    };

    handleChangePage = (event, page) => {
        this.setState({page});
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render()
    {
        const {order, orderBy, selected, rowsPerPage, page, data} = this.state;
        return (
            <div className="w-full flex flex-col">
                
                <FuseScrollbars className="flex-grow overflow-x-auto">

                    <Table className="min-w-xl" aria-labelledby="tableTitle">

                        <ProductsTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
                        />
                        <TableBody>
                            {_.orderBy(data, [
                                (o) => {
                                    switch ( orderBy )
                                    {
                                        case 'categories':
                                        {
                                            return o.categories[0];
                                        }
                                        default:
                                        {
                                            return o[orderBy];
                                        }
                                    }
                                }
                            ], [order])
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(data => {
                                    const isSelected = this.isSelected(data.id);
                                    return (
                                        <TableRow
                                            className="h-64 cursor-pointer"
                                            hover
                                            role="checkbox"
                                            aria-checked={isSelected}
                                            tabIndex={-1}
                                            key={data.id}
                                            selected={isSelected}
                                            onClick={event => this.handleClick(data)}
                                        >
                                            <TableCell className="w-48 pl-4 sm:pl-12" padding="checkbox">
                                                <Checkbox
                                                    checked={isSelected}
                                                    onClick={event => event.stopPropagation()}
                                                    onChange={event => this.handleCheck(event, data.id)}
                                                />
                                            </TableCell>
                                            
                                            <TableCell className="w-52" component="th" scope="row" padding="none">
                                                {/* {n.images.length > 0 ? (
                                                    <img className="w-full block rounded" src={_.find(n.images, {id: n.featuredImageId}).url} alt={n.name}/>
                                                ) : (
                                                    <img className="w-full block rounded" src="assets/images/ecommerce/product-image-placeholder.png" alt={n.name}/>
                                                )} */}
                                            </TableCell>

                                            <TableCell component="th" scope="row">
                                                {data.car_maker}
                                            </TableCell>

                                            <TableCell className="truncate" component="th" scope="row">
                                                {data.car_model}
                                                {' - '}
                                                {data.trim}
                                            </TableCell>

                                            <TableCell component="th" scope="row" numeric>
                                                {data.year}
                                            </TableCell>

                                            <TableCell component="th" scope="row" numeric>                                               
                                                {data.odometer}
                                                {' '}
                                                {data.odometer_unit}
                                            </TableCell>

                                            <TableCell component="th" scope="row" numeric>
                                                {data.color_name_exterior}
                                            </TableCell>

                                            {/* <TableCell component="th" scope="row" numeric>
                                                {data.color_name_interior}
                                            </TableCell> */}

                                            <TableCell component="th" scope="row" numeric>
                                                {data.engine}
                                            </TableCell>

                                            <TableCell component="th" scope="row" numeric>
                                                {data.vin}
                                            </TableCell>

                                            {/* <TableCell component="th" scope="row" numeric>
                                                {data.active ?
                                                    (
                                                        <Icon className="text-green text-20">check_circle</Icon>
                                                    ) :
                                                    (
                                                        <Icon className="text-red text-20">remove_circle</Icon>
                                                    )
                                                }
                                            </TableCell> */}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </FuseScrollbars>

                <TablePagination
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page'
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page'
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getProducts: Actions.getProducts
    }, dispatch);
}

function mapStateToProps({eCommerceApp})
{
    return {
        products  : eCommerceApp.products.data,
        searchText: eCommerceApp.products.searchText
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductsTable)));
