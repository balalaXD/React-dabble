import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Dishes } from './dishes';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { Leaders } from './leaders';
import { InitialFeedback } from './forms';
import { createForms } from 'react-redux-form';

export const ConfigureStore = () => {
  const reducer = combineReducers({
    dishes: Dishes,
    comments: Comments,
    promotions: Promotions,
    leaders: Leaders,
    ...createForms({
      feedback: InitialFeedback
    })
  });

  const enhancer = applyMiddleware(thunk, logger)

  const store = createStore(reducer, enhancer);

  return store;
}
