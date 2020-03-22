import {registerConstants} from './register.constants';
import {stateParams} from "../../states/types";
import Immutable from "immutable";

const initialState = Immutable.fromJS({
        isLoading: false,
        error: '',
    }
);

export default function registration(state = initialState, {type, payload}: stateParams) {
    switch (type) {
        case registerConstants.REGISTER_REQUEST:
            return state.merge({isLoading: true, error: ''});
        case registerConstants.REGISTER_FAILURE:
            return state.merge({error: payload, isLoading: false});
        default:
            return state
    }
}
