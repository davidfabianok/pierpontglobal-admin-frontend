import React from 'react';
import PropTypes from 'prop-types';
import { FuseAnimate } from '@fuse';
import { Icon, Typography } from '@material-ui/core';

const AdministratorsHeader = (props) => (
  <div className={"flex flex-1 w-full mx-8 items-center justify-between"}>
    <div className="flex items-center">
      <FuseAnimate animation="transition.expandIn" delay={300}>
        <Icon className="text-32 mr-0 sm:mr-12">supervised_user_circle</Icon>
      </FuseAnimate>
      <FuseAnimate animation="transition.slideLeftIn" delay={300}>
        <Typography className="hidden sm:flex" variant="h6">Administrators</Typography>
      </FuseAnimate>
    </div>
  </div>
);

AdministratorsHeader.propTypes = {
  // bla: PropTypes.string,
};

AdministratorsHeader.defaultProps = {
  // bla: 'test',
};

export default AdministratorsHeader;
