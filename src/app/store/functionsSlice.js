import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	setAlertOpen: null
};

const functionSlice = createSlice({
	name: 'functions',
	initialState,
	reducers: {
		setAlertOpenAction: (state, action) => {
			state.setAlertOpen = action.payload;
		}
	}
});

export const { setAlertOpenAction } = functionSlice.actions;

export default functionSlice.reducer;
