
import { FETCH_USER_LOGIN_SUCCESS } from "../action/userAction";
const INITIAL_STATE = {
    account: {
        access_token: '',
        refresh_token: '',
        username: '',
        image: '',
        role: '',
    },
    isAuthenticated: false
};
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_LOGIN_SUCCESS:
            // console.log('check action:', action)
            let data = action?.payload?.DT
            return {
                ...state,
                account: {
                    access_token: data?.access_token,
                    refresh_token: data?.refresh_token,
                    username: data?.username,
                    image: data?.image,
                    role: data?.role,
                },
                isAuthenticated: true
            };

        // case DECREMENT:
        //     return {
        //         ...state, count: state.count - 1,
        //     };
        default: return state;
    }
};

export default userReducer;