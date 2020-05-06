
const a_ZFilter = (state = [], action) => {

    switch (action.type) {
        case "FILTER_NAME_AZ":
            return action.filter.sort((a, b) => (a.Product_Name.toUpperCase() > b.Product_Name.toUpperCase()) ? 1 : -1)
        case "FILTER_NAME_ZA":
            return action.filter.sort((a, b) => (b.Product_Name.toUpperCase() > a.Product_Name.toUpperCase()) ? 1 : -1)
        case "CLICK":
            return state.filter(el => el.Product_Category.toUpperCase() === action.value.toUpperCase())
        case "FILTER_MAX_MIN":
            return action.filter.sort((a, b) => (a.Price > b.Price) ? 1 : -1)
        case "FILTER_MIN_MAX":
            return action.filter.sort((a, b) => (b.Price > a.Price) ? 1 : -1)
        case "CLICK":
            return state.filter(el => el.Price === action.value)
        case "INITIAL":
            return action.value
        default:
            return state
    }
}

export default a_ZFilter;