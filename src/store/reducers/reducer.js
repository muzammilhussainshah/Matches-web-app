const initState = {
    errorMsg: '',
    isError: false,
    isLoader: false,
    user: {},
    matches: [],
    interest: [],
    isSearch: [],
}

const reducer = (state = initState, action) => {
    // console.log(state, "THIS_IS_REDUCER")
    switch (action.type) {
        case 'IS_ERROR':
            return {
                ...state,
                isError: action.payload,
            }
        case 'IS_LOADER':
            return {
                ...state,
                isLoader: !state.isLoader,
            }
        case 'FETCH_USER':
            return {
                ...state,
                user: action.payload,
            }
        case 'FETCH_ALL_MATCHES':
            return {
                ...state,
                matches: action.payload,
            }
        case 'FETCH_ALL_INTEREST':
            return {
                ...state,
                interest: action.payload,
            }
        case 'IS_SEARCH':
            return {
                ...state,
                isSearch: action.payload,
            }
        default:
            return state
    }
}
export default reducer