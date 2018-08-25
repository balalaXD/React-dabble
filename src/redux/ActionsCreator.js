import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addComment = (comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: comment
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {
  const newComment = {
    dishId,
    rating,
    author,
    comment
  }
  newComment.date = new Date().toISOString();

  return fetch(baseUrl + 'comments', {
    method: 'POST',
    body: JSON.stringify(newComment),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin'
  })
  .then(resolve, reject)
  .then(response => response.json())
  .then(response => { dispatch(addComment(response))})
  .catch(error => {
    console.log('post comments', error.message);
    alert('Your comment could not be posted\nError: '+error.message);
  })
}

const resolve = response => {
  if (response.ok) {
    return response;
  } else { // Like 404 Not Found
    var error = new Error('Error ' + response.status + ': ' + response.statusText)
    error.response = response;
    throw error
  }
}

const reject = error => { // Like when you server shut down
  var errmess = new Error(error.message)
  throw errmess
}


export const fetchDishes = () => {
  return (dispatch) => {
    dispatch(dishesLoading())

    return fetch(baseUrl + 'dishes')
    .then(resolve, reject)
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes)))
    .catch(error => dispatch(dishesFailed(error.message)))
  }
}

export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errmess
});

export const addDishes = (dishes) => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes
});


export const fetchComments = () => (dispatch) => {
  dispatch(commentsLoading())

  return fetch(baseUrl + 'comments')
  .then(resolve, reject)
  .then(response => response.json())
  .then(comments => dispatch(addComments(comments)))
  .catch(error => dispatch(commentsFailed(error.message)))
};

export const commentsLoading = () => ({
  type: ActionTypes.COMMENTS_LOADING
});

export const commentsFailed = (errmess) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errmess
});

export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments
});


export const fetchPromos = () => (dispatch) => {
  dispatch(promosLoading());

  return fetch(baseUrl + 'promotions')
  .then(resolve, reject)
  .then(response => response.json())
  .then(promos => dispatch(addPromos(promos)))
  .catch(error => dispatch(promosFailed(error.message)))
}

export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errmess
});

export const addPromos = (promos) => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos
});
