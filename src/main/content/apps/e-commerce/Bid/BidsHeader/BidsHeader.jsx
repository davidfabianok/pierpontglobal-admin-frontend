import React from 'react';
import { Icon, Typography } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const BidsHeader = ({ bidCollectorId }) => (
  <div className="flex flex-1 w-full mx-8 items-center justify-between">

    <div className="flex items-center">
      <FuseAnimate animation="transition.expandIn" delay={300}>
        <Icon className="text-32 mr-0 sm:mr-12">money</Icon>
      </FuseAnimate>
      <FuseAnimate animation="transition.slideLeftIn" delay={300}>
        <Typography className="hidden sm:flex" variant="h6">
Bid collector:
          {bidCollectorId}
        </Typography>
      </FuseAnimate>
    </div>
  </div>
);

BidsHeader.propTypes = {
  bidCollectorId: PropTypes.number,
};

BidsHeader.defaultProps = {
  bidCollectorId: -1,
};

const mapStateToProps = state => ({
  bidCollectorId: state.bidCollectorId,
});

export default connect(
  mapStateToProps,
)(BidsHeader);
