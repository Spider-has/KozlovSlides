import { combineReducers, createStore } from '@reduxjs/toolkit';
import { slideBarReducer } from './reducers';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

const rootReducer = combineReducers({
    slideBar: slideBarReducer,
});

const store = createStore(rootReducer);

export { store };

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { useAppSelector };
