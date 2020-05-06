const SearchFilter = (state = "", action) => {

    switch (action.type) {
        case "CHANGE-INPUT":
            return action.search

        default:
            return state
    }
}

export default SearchFilter;