import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../css/header.css';
import SearchBar from './SearchBar';

function Header(props) {
  const [searchBar, setSearchBar] = useState(false);

  const history = useHistory();

  const handleProfileClick = () => {
    history.push('/profile');
  };

  const { title, search, profile } = props;
  return (
    <div>
      <div className="header">
        { profile && (
          <div>
            <button
              type="button"
              onClick={ handleProfileClick }
            >
              <img
                src={ profileIcon }
                alt="profile"
                data-testid="profile-top-btn"
              />
            </button>
          </div>
        )}
        <h1 data-testid="page-title">{title}</h1>
        { search && (
          <button type="button" onClick={ () => setSearchBar(!searchBar) }>
            <img
              src={ searchIcon }
              alt="search"
              data-testid="search-top-btn"
            />
          </button>
        )}
      </div>
      <div className="bar">
        { searchBar && (
          <SearchBar />
        )}
      </div>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  search: PropTypes.bool,
  profile: PropTypes.bool.isRequired,
};

Header.defaultProps = {
  search: false,
};

export default Header;
