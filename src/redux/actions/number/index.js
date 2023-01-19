export const actionNumberRouter = (data) => (dispatch) => {
    dispatch({
      type: "Number",
      payload: data
    })
  }