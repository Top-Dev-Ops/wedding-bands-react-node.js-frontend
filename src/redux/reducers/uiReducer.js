import { SET_LOADING, STOP_LOADING, SET_HAND_VIEW, STOP_HAND_VIEW, SET_FULL_SCREEN, STOP_FULL_SCREEN } from '../types';

const initialState = {
    loading: false,
    hand_view: false,
    full_screen: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_LOADING:
            return { ...state, loading: true };
        case STOP_LOADING:
            return { ...state, loading: false };
        case SET_HAND_VIEW:
            return { ...state, hand_view: true };
        case STOP_HAND_VIEW:
            return { ...state, hand_view: false };
        case SET_FULL_SCREEN:
            return { ...state, full_screen: true };
        case STOP_FULL_SCREEN:
            return { ...state, full_screen: false };
        default:
            return state;
    }
}