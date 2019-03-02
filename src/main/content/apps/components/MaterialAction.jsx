import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const MaterialButton = styled.div`
    padding: 5px 20px;
    margin: 3px;
    border-radius: 6px;
    color: ${props => props.color};
    border: 1px solid ${props => props.color};
    cursor: pointer;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    display: inline-block;
    text-transform: uppercase;
    white-space: nowrap;
    width: fit-content;
    place-self: center;
    min-width: 130px;
    text-align: center;
    position: relative;
     
    &:hover {
      background-color: ${props => props.color};
      color: white;
      transition: 0.5s
    }
`;

const Icon = styled.i`
    position: absolute;
    left: 8px;
    margin: auto;
    top: 0;
    bottom: 0;
    height: 16px;
`;

export function MaterialActionButton({ onClick, label, iconClass }) {
  return (
    <MaterialButton onClick={onClick} color="#2D323E">
      <Icon className={iconClass} />
      {label}
    </MaterialButton>
  );
}

MaterialActionButton.propTypes = {
  onClick: PropTypes.func,
  label: PropTypes.string,
  iconClass: PropTypes.string,
};

MaterialActionButton.defaultProps = {
  onClick: () => (null),
  label: 'button',
  iconClass: '',
};

export default MaterialActionButton;
