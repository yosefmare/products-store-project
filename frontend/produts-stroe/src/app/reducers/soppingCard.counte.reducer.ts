import { createSlice } from "@reduxjs/toolkit";

interface CartState {
    itemCount: string[];
}

const initialState: CartState = {
    itemCount: []
};

export const shoppingCardCounter = createSlice({
    name: 'shoppingCardCounter',
    initialState,
    reducers:{
        addItem: (state, action) => {
            state.itemCount.push(action.payload);
        },
        removeItem: (state, action) => {
            const index = state.itemCount.findIndex(item => item === action.payload);
            if (index >= 0) {
                state.itemCount.splice(index, 1);
            }
        },
    }
});

export const { addItem, removeItem } = shoppingCardCounter.actions;
export default shoppingCardCounter.reducer;
