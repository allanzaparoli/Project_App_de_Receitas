// import PropTypes from 'prop-types';
// import React from 'react';
// import shareIcon from '../images/shareIcon.svg';

// function DoneRecipesFood(props) {
//   const { receita } = props;
//   console.log('receita', receita);
//   const {
//     // id,
//     image,
//     name,
//     category,
//     doneDate,
//     tags,
//     // type,
//     nationality,
//     // alcoholicOrNot
//   } = receita;
//   return (
//     <div className="container-dones" key={ Math.random() }>
//       <img
//         className="img-recipes-done"
//         src={ image }
//         alt="name"
//         data-testid={ `${index}-horizontal-image` }
//       />
//       <p data-testid={ `${index}-horizontal-top-text` }>{ category }</p>
//       <h3 data-testid={ `${index}-horizontal-name` }>{ name }</h3>
//       <p data-testid={ `${index}-horizontal-nationality` }>{ nationality }</p>
//       <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>
//       { tags.map((tag, i) => (
//         <span
//           data-testid={ `${i}-${tag}-horizontal-tag` }
//           key={ i + 1 }
//         >
//           { tag }
//           {' '}
//         </span>))}
//       <br />
//       <button
//         type="button"
//         data-testid={ `${index}-horizontal-share-btn` }
//         // onClick={ () => handleClickShare(id) }
//       >
//         <img src={ shareIcon } alt="shareIcon" />
//       </button>
//     </div>
//   );
// }

// DoneRecipesFood.propTypes = {
//   receita: PropTypes.shape({
//     alcoholicOrNot: PropTypes.string,
//     category: PropTypes.string,
//     doneDate: PropTypes.string,
//     id: PropTypes.string,
//     image: PropTypes.string,
//     name: PropTypes.string,
//     nationality: PropTypes.string,
//     tags: PropTypes.shape({
//       map: PropTypes.func,
//     }).isRequired,
//     // type: PropTypes.string,
//   }).isRequired,
// };

// export default DoneRecipesFood;
