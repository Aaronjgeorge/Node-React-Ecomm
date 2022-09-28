import { configureStore } from '@reduxjs/toolkit';

import itemReducer from './item';
import userReducer from './user';

//main store where all the slices are managed and dispatched

const store = configureStore({
  reducer: { item: itemReducer,user: userReducer },
});

export default store;