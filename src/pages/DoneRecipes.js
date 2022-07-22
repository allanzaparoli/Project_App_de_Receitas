import React, { useState } from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import '../css/doneRecipes.css';
// import DoneRecipesFood from '../components/DoneRecipesFood';

function DoneRecipes() {
  const [share, setShare] = useState(false);
  const number = 1000;

  const teste = [
    {
      id: '52771',
      type: 'comida',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'bebida',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ];

  localStorage.setItem('doneRecipes', JSON.stringify(teste));

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

  const callLocalStorage = () => {
    const getLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'));

    if (getLocalStorage !== null) {
      const retunStorage = getLocalStorage
        .map(({
          id,
          image,
          name,
          category,
          doneDate,
          tags,
          type,
          nationality,
          alcoholicOrNot,
        }, index) => {
          if (type === 'comida') {
            return (
              // <DoneRecipesFood receira={ receita } />
              <div className="container-dones" key={ index + 1 }>
                <div className="container-dones-img">
                  <img
                    className="img-recipes-done"
                    src={ image }
                    alt="name"
                    data-testid={ `${index}-horizontal-image` }
                  />
                </div>
                <div className="container-dones-info">
                  <div className="container-dones-info-share">
                    <p data-testid={ `${index}-horizontal-top-text` }>{ category }</p>
                    <p>-</p>
                    <p
                      data-testid={ `${index}-horizontal-nationality` }
                    >
                      { nationality }
                    </p>
                    <button
                      type="button"
                      data-testid={ `${index}-horizontal-share-btn` }
                      onClick={ () => handleClickShare(id) }
                    >
                      {/* { share && <span>Link copied!</span>} */}
                      <img className="shareIcon" src={ shareIcon } alt="shareIcon" />
                    </button>
                  </div>
                  <h3 data-testid={ `${index}-horizontal-name` }>{ name }</h3>
                  <p
                    data-testid={ `${index}-horizontal-done-date` }
                  >
                    { `Don in: ${doneDate}` }
                  </p>
                  <div className="container-dones-info-name">
                    { tags.map((tag, i) => (
                      <span
                        data-testid={ `${index}-${tag}-horizontal-tag` }
                        key={ i + 1 }
                      >
                        { tag }
                      </span>))}
                  </div>
                </div>
              </div>
            );
          }
          return (
            <div className="container-dones" key={ index + 1 }>
              <div className="container-dones-img">
                <img
                  className="img-recipes-done"
                  src={ image }
                  alt="name"
                  data-testid={ `${index}-horizontal-image` }
                />
              </div>
              <div className="container-dones-info">
                <div className="container-dones-info-share">
                  <p
                    data-testid={ `${index}-horizontal-alcoholicOrNot` }
                  >
                    { alcoholicOrNot }
                  </p>
                  <button
                    type="button"
                    data-testid={ `${index}-horizontal-share-btn` }
                    onClick={ () => handleClickShare(id) }
                  >
                    {/* { share && <span>Link copied!</span> } */}
                    <img src={ shareIcon } alt="shareIcon" />
                  </button>
                </div>
                <h3 data-testid={ `${index}-horizontal-name` }>{ name }</h3>
                <p
                  data-testid={ `${index}-horizontal-done-date` }
                >
                  { `Done in: ${doneDate}` }
                </p>
              </div>
            </div>
          );
        });
      return retunStorage;
    }
  };

  return (
    <div>
      <Header title="Done Recipes" profile />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        // onClick={}
        name="All"
        value="All"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        // onClick={}
        name="Food"
        value="Food"
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        // onClick={}
        name="Drinks"
        value="Drinks"
      >
        Drinks
      </button>
      { callLocalStorage() }
      { share && <span>Link copied!</span> }
    </div>
  );
}

export default DoneRecipes;
