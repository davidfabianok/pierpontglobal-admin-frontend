import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import TableHead from '@material-ui/core/TableHead';
import TableSortLabel from '@material-ui/core/TableSortLabel';

const rows = [
  {
    id: 'id', numeric: true, disablePadding: true, label: 'Admin ID',
  },
  {
    id: 'name', numeric: false, disablePadding: false, label: 'Name (username)',
  },
  {
    id: 'roles', numeric: false, disablePadding: false, label: 'User roles',
  },
  {
    id: 'lastSignedIn', numeric: false, disablePadding: false, label: 'Last signed in',
  },
  {
    id: 'lastIp', numeric: false, disablePadding: false, label: 'Last IP address',
  },
];

class EnhancedTableHead extends React.Component {
  constructor(props) {
    super(props);

    this.createSortHandler = this.createSortHandler.bind(this);
  }

  createSortHandler(property, event) {
    const { onRequestSort } = this.props;
    onRequestSort(event, property);
  }

  render() {
    const {
      onSelectAllClick, order, orderBy, numSelected, rowCount,
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {rows.map(
            row => (
              <TableCell
                key={row.id}
                align={row.numeric ? 'right' : 'left'}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={() => (this.createSortHandler(row.id))}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this,
          )}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default EnhancedTableHead;
