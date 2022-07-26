import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/profile.css';

function Profile() {
  const emailSaved = JSON.parse(localStorage.getItem('user'))?.email;

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
      <p className="email-profile" data-testid="profile-email">{ emailSaved }</p>
      <div className="container-btn-profile">
        <button
          className="btn-profile"
          type="button"
          data-testid="profile-done-btn"
          onClick={ doneRecipesClick }
        >
          Done Recipes
        </button>
        <button
          className="btn-profile"
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ FavoriteRecipesClick }
        >
          Favorite Recipes
        </button>
        <button
          className="btn-profile"
          type="button"
          data-testid="profile-logout-btn"
          onClick={ logoutClick }
        >
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
