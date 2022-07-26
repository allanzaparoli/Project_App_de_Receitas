import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

function CardDone() {
  const history = useHistory();
  const [share, setShare] = useState(false);
  const number = 1000;

  if (!localStorage.doneRecipes) localStorage.setItem('doneRecipes', JSON.stringify([]));
  const callLocalStorage = () => {
    const doneRecipesStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    return doneRecipesStorage;
  };

  const handleClickShare = (id) => {
    const url = `http://localhost:3000/foods/${id}`;
    console.log(url);
    navigator.clipboard.writeText(url);
    setShare(true);
  };

  setTimeout(() => {
    if (share) {
      setShare(false);
    }
  }, number);

  const handleClickDone = (id, type) => {
    if (type === 'food') {
      history.push(`/foods/${id}`);
    } else {
      history.push(`/drinks/${id}`);
    }
  };

  return (
    <div>
      { share && <span>Link copied!</span> }
      { callLocalStorage && callLocalStorage()
        .map((recipe, index) => (
          <div className="container-dones" key={ index + 1 }>
            <div className="container-dones-img">
              <button
                className="btn-done"
                type="button"
                onClick={ () => handleClickDone(recipe.id, recipe.type) }
              >
                <img
                  className="img-recipes-done"
                  src={ recipe.image }
                  alt={ recipe.name }
                  data-testid={ `${index}-horizontal-image` }
                />
              </button>
            </div>
            <div className="container-dones-info">
              <div className="container-dones-info-share">
                { (recipe.type === 'food')
                  ? (
                    <p
                      className="text-done"
                      data-testid={ `${index}-horizontal-top-text` }
                    >
                      { `${recipe.nationality} - ${recipe.category}` }
                    </p>
                  )
                  : (
                    <p
                      className="text-done"
                      data-testId={ `${index}-horizontal-top-text` }
                    >
                      { recipe.alcoholicOrNot }
                    </p>
                  )}
                <button
                  className="btn-done shareIcon"
                  src={ shareIcon }
                  type="button"
                  data-testid={ `${index}-horizontal-share-btn` }
                  onClick={ () => handleClickShare(recipe.id) }
                >
                  <img className="shareIcon" src={ shareIcon } alt="shareIcon" />
                </button>
              </div>
              <button
                className="btn-done"
                type="button"
                onClick={ () => handleClickDone(recipe.id, recipe.type) }
              >
                <h3
                  className="text-done"
                  data-testid={ `${index}-horizontal-name` }
                >
                  { recipe.name }
                </h3>
              </button>
              <p
                className="text-done"
                data-testid={ `${index}-horizontal-done-date` }
              >
                { `Done in: ${recipe.doneDate.split('T')[0]}` }
              </p>
              <div className="container-dones-info-name">
                { (recipe.tags)
                    && recipe.tags.map((tag, i) => (
                      <span
                        className="text-done"
                        key={ i + 1 }
                        data-testid={ `${index}-${tag}-horizontal-tag` }
                      >
                        { ' '}
                        {tag}
                      </span>
                    ))}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default CardDone;
