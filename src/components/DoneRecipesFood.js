// import React from 'react';
// import shareIcon from '../images/shareIcon.svg';

// function DoneRecipesFood() {

//   console.log(tags);
//   return (
//     <div className="container-dones" key={ index + Math.random() }>
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
//   category: PropTypes.string.isRequired,
//   doneDate: PropTypes.string.isRequired,
//   //   id: PropTypes.string.isRequired,
//   image: PropTypes.string.isRequired,
//   index: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   nationality: PropTypes.string.isRequired,
//   tags: PropTypes.shape({
//     map: PropTypes.func,
//   }).isRequired,
// };

// export default DoneRecipesFood;
