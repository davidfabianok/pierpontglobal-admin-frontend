import React from 'react';
import {
    TableHead,
    TableSortLabel,
    TableCell,
    TableRow,
    Checkbox,
    Tooltip,
    IconButton,
    Icon,
    Menu,
    MenuList,
    MenuItem,
    ListItemIcon,
    ListItemText,
    withStyles
} from '@material-ui/core';

const rows = [
    {
        id            : 'image',
        numeric       : false,
        disablePadding: true,
        label         : 'Image',
        sort          : false
    },
    {
        id            : 'make',
        numeric       : false,
        disablePadding: false,
        label         : 'CarMake',
        sort          : true
    },
    {
        id            : 'model',
        numeric       : false,
        disablePadding: false,
        label         : 'CarModel',
        sort          : true
    },
    // {
    //     id            : 'name',
    //     numeric       : false,
    //     disablePadding: false,
    //     label         : 'Trim',
    //     sort          : true
    // },
    {
        id            : 'year',
        numeric       : false,
        disablePadding: false,
        label         : 'Year',
        sort          : true
    },
    {
        id            : 'odo',
        numeric       : true,
        disablePadding: false,
        label         : 'Odometer',
        sort          : true
    },
    {
        id            : 'color',
        numeric       : true,
        disablePadding: false,
        label         : 'Ext-Color',
        sort          : true
    },
    // {
    //     id            : 'quantity',
    //     numeric       : true,
    //     disablePadding: false,
    //     label         : 'Int-Color',
    //     sort          : true
    // },
    {
        id            : 'active',
        numeric       : true,
        disablePadding: false,
        label         : 'Engine',
        sort          : true
    },
    {
        id            : 'name',
        numeric       : true,
        disablePadding: false,
        label         : 'VIN',
        sort          : true
    }
];

const styles = theme => ({
    root                : {},
    actionsButtonWrapper: {
        position      : 'absolute',
        top           : 0,
        left          : 64,
        width         : 64,
        height        : 63,
        zIndex        : 10,
        background    : theme.palette.background.paper,
        alignItems    : 'center',
        display       : 'flex',
        justifyContent: 'center'
    }
});

class ProductsTableHead extends React.Component {
    state = {
        selectedProductsMenu: null
    };

    createSortHandler = property => event => {

        this.props.onRequestSort(event, property);
    };

    openSelectedProductsMenu = (event) => {
        this.setState({selectedProductsMenu: event.currentTarget});
    };

    closeSelectedProductsMenu = () => {
        this.setState({selectedProductsMenu: null});
    };

    render()
    {
        const {onSelectAllClick, order, orderBy, numSelected, rowCount, classes} = this.props;
        const {selectedProductsMenu} = this.state;

        return (
            <TableHead>
                <TableRow className="h-64 justify-center">
                    <TableCell padding="checkbox" className="relative pl-4 sm:pl-12">
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={numSelected === rowCount}
                            onChange={onSelectAllClick}
                        />
                        {numSelected > 0 && (
                            <div className={classes.actionsButtonWrapper}>
                                <IconButton
                                    aria-owns={selectedProductsMenu ? 'selectedProductsMenu' : null}
                                    aria-haspopup="true"
                                    onClick={this.openSelectedProductsMenu}
                                >
                                    <Icon>more_horiz</Icon>
                                </IconButton>
                                <Menu
                                    id="selectedProductsMenu"
                                    anchorEl={selectedProductsMenu}
                                    open={Boolean(selectedProductsMenu)}
                                    onClose={this.closeSelectedProductsMenu}
                                >
                                    <MenuList>
                                        <MenuItem
                                            onClick={() => {
                                                this.closeSelectedProductsMenu();
                                            }}
                                        >
                                            <ListItemIcon className={classes.icon}>
                                                <Icon>delete</Icon>
                                            </ListItemIcon>
                                            <ListItemText inset primary="Remove"/>
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            </div>
                        )}
                    </TableCell>
                    {rows.map(row => {
                        return (
                            <TableCell
                                key={row.id}
                                numeric={row.numeric}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}
                            >
                                {sort && (
                                    <Tooltip
                                        title="Sort"
                                        placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                        enterDelay={300}
                                    >
                                        <TableSortLabel
                                            active={orderBy === row.id}
                                            direction={order}
                                            onClick={this.createSortHandler(row.id)}
                                        >
                                            {row.label}
                                        </TableSortLabel>
                                    </Tooltip>
                                )}
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

export default withStyles(styles, {withTheme: true})(ProductsTableHead);
