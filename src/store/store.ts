import { createStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers/reducers';

const store = createStore(rootReducer);

export { store };
