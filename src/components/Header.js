import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header(props) {
  const history = useHistory();
  const handleProfileClick = () => {
    history.push('/profile');
  };

  const { title, search, profile } = props;
  return (
    <div>
      <h1 data-testid="page-title">{title}</h1>
      { profile && (
        <img
          src={ profileIcon }
          alt="profile"
          data-testid="profile-top-btn"
        />

      )}
      { search && (
        <img
          src={ searchIcon }
          alt="search"
          data-testid="search-top-btn"
        />
      )}
      <button type="button" onClick={ handleProfileClick }>Perfil</button>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  search: PropTypes.bool.isRequired,
  profile: PropTypes.bool.isRequired,
};

export default Header;
