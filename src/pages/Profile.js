import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AppContext from '../context/AppContext';

function Profile() {
  const { login } = useContext(AppContext);
  const { email } = login;

  const history = useHistory();

  const doneRecipesClick = () => {
    history.push('/done-recipes');
  };

  const FavoriteRecipesClick = () => {
    history.push('/favorite-recipes');
  };

  const logoutClick = () => {
    history.push('/');
    localStorage.clear();
  };

  return (
    <div>
      <Header title="Profile" profile />
      <p data-testid="profile-email">{ email }</p>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ doneRecipesClick }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ FavoriteRecipesClick }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ logoutClick }
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}

export default Profile;
