export const initialState = {
    admin: false,
};

// Reducer function to update admin value
export const reducer = (state, action) => {
    switch (action.type) {
        case "SET_ADMIN":
            return {
                ...state,
                admin: true,
            };
        default:
            return state;
    }
};
