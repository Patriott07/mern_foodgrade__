import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store';

// Define a type for the slice state
export interface CounterState {
  info : Object
}

// Define the initial state using that type
const initialState: CounterState = {
  info : {

  }

}

export const counterSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    resetInfo: state => {
      state.info = {} 
    },
    login: (state, property: PayloadAction<Object>) => {
      state.info = property.payload;
    },
  }
})

export const { resetInfo, login } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.user.value

export default counterSlice.reducer;