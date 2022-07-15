import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AppContext from '../context/AppContext';

function Drinks() {
  const { recipesFilter } = useContext(AppContext);
  const history = useHistory();

  const recipeLimit = (array) => {
    const numMax = 12;

    if (array && array.length === 1) {
      const id = recipesFilter[0].idDrink;
      history.push(`/drinks/${id}`);
    }

    if (!array) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }

    if (array && array.length > numMax) {
      return array.slice(0, numMax);
    }

    return array;
  };

  return (
    <div>
      <Header title="Drinks" profile search />
      { recipeLimit(recipesFilter).map((recipe, index) => (
        <div key={ index } className="recipes" data-testid={ `${index}-recipe-card` }>
          <h2 data-testid={ `${index}-card-name` }>{ recipe.strDrink }</h2>
          <img
            src={ recipe.strDrinkThumb }
            alt="strDrinkThumb"
            data-testid={ `${index}-card-img` }
          />
          <p>{ recipe.idDrink }</p>
        </div>
      ))}
      <Footer />
    </div>
  );
}

export default Drinks;
