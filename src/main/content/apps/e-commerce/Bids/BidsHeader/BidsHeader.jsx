import React from 'react';
import { Icon, Typography } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { connect } from 'react-redux';

const BidsHeader = () => (
  <div className={"flex flex-1 w-full mx-8 items-center justify-between"}>

    <div className="flex items-center">
      <FuseAnimate animation="transition.expandIn" delay={300}>
        <Icon className="text-32 mr-0 sm:mr-12">money</Icon>
      </FuseAnimate>
      <FuseAnimate animation="transition.slideLeftIn" delay={300}>
        <Typography className="hidden sm:flex" variant="h6">Bids</Typography>
      </FuseAnimate>
    </div>
  </div>
);

BidsHeader.propTypes = {};

BidsHeader.defaultProps = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BidsHeader);
