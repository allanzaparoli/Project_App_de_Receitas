import React from 'react';
import PropTypes from 'prop-types';

function Recipes({ children }) {
  return (
    <div>{children}</div>
  );
}

Recipes.propTypes = {
  children: PropTypes.node,
};

Recipes.defaultProps = {
  children: null,
};

export default Recipes;
