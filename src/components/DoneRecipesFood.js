import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipesFood() {
  const history = useHistory();
  const [share, setShare] = useState(false);
  const number = 1000;

  const callLocalStorage = () => {
    const doneRecipesStorage = JSON.parse(localStorage.getItem('doneRecipes')) ?? [];
    return doneRecipesStorage.filter((recipe) => recipe.type === 'food');
  };

  //   callLocalStorage().map((item) => console.log(item.join(',')));

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

  const handleClickImg = (id) => {
    history.push(`/foods/${id}`);
  };

  return (
    <div>
      { share && <span>Link copied!</span> }
      { callLocalStorage().map((recipe, index) => (
        <div className="container-dones" key={ index + 1 }>
          <div className="container-dones-img">
            <button type="button" onClick={ () => handleClickImg(recipe.id) }>
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
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                { `${recipe.nationality} - ${recipe.category}` }
              </p>
              <button
                src={ shareIcon }
                type="button"
                data-testid={ `${index}-horizontal-share-btn` }
                onClick={ () => handleClickShare(recipe.id) }
              >
                <img className="shareIcon" src={ shareIcon } alt="shareIcon" />
              </button>
            </div>
            <h3 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h3>
            <p
              data-testid={ `${index}-horizontal-done-date` }
            >
              { `Done in: ${recipe.doneDate}` }
            </p>
            <div className="container-dones-info-name">
              { console.log(recipe.tags)}
              { (recipe.tags
                    || recipe.tags === null
                    || recipe.tags === undefined
                    || recipe.tags === '')
                    || recipe.tags.map((tag, i) => (
                      <span
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

export default DoneRecipesFood;
