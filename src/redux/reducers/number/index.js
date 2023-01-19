const initialState = {
    numberdata:''
}
  
const numberRouter = (state = initialState, { type, payload }) => {
switch (type) {
    case "Number":
    return { ...state, numberData: payload }
    default:
    return state
}
}
export default numberRouter
  