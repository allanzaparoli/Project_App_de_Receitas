// import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import shareIcon from '../images/shareIcon.svg';

// function DoneRecipesDrinks() {
//   const history = useHistory();
//   const [share, setShare] = useState(false);
//   const number = 1000;

//   const callLocalStorage = () => {
//     const doneRecipesStorage = JSON.parse(localStorage.getItem('doneRecipes')) ?? [];
//     return doneRecipesStorage.filter((recipe) => recipe.type === 'drink');
//   };

//   const handleClickShare = (id) => {
//     const url = `http://localhost:3000/drinks/${id}`;
//     navigator.clipboard.writeText(url);
//     setShare(true);
//   };

//   setTimeout(() => {
//     if (share) {
//       setShare(false);
//     }
//   }, number);

//   const handleClickImg = (id) => {
//     history.push(`/drinks/${id}`);
//   };

//   return (
//     <div>
//       { share && <span>Link copied!</span> }
//       { callLocalStorage()/* .filter((recipe) => recipe.type === 'drink') */
//         .map((recipe, index) => (
//           <div className="container-dones" key={ index + 1 }>
//             <div className="container-dones-img">
//               <button type="button" onClick={ () => handleClickImg(recipe.id) }>
//                 <img
//                   className="img-recipes-done"
//                   src={ recipe.image }
//                   alt={ recipe.name }
//                   data-testid={ `${index}-horizontal-image` }
//                 />
//               </button>
//             </div>
//             <div className="container-dones-info">
//               <div className="container-dones-info-share">
//                 <p
//                   data-testId={ `${index}-horizontal-top-text` }
//                 >
//                   { console.log(recipe.alcoholicOrNot) }
//                 </p>
//                 <button
//                   src={ shareIcon }
//                   type="button"
//                   data-testid={ `${index}-horizontal-share-btn` }
//                   onClick={ () => handleClickShare(recipe.id) }
//                 >
//                   <img src={ shareIcon } alt="shareIcon" />
//                 </button>
//               </div>
//               <h3 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h3>
//               <p
//                 data-testid={ `${index}-horizontal-done-date` }
//               >
//                 { `Done in: ${recipe.doneDate}` }
//               </p>
//             </div>
//           </div>
//         ))}
//     </div>
//   );
// }

// export default DoneRecipesDrinks;
