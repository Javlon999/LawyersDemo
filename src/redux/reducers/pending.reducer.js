import { alertConstants } from '../../constants';

export function pending(state = {}, action) {
    switch (action.type) {
        case alertConstants.SUCCESS:
            return {
                type: 'pending-success',
                message: action.message
            };
        case alertConstants.ERROR:
            return {
                type: 'pending-danger',
                message: action.message
            };
        case alertConstants.CLEAR:
            return {};
        default:
            return state
    }
}
//user