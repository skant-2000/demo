// action types
export const VALID_USER_DETAIL = "VALID_USER_DETAIL"

export const SET_USER_POST = "SET_USER_POST"

export const LOGOUT_USER = "LOGOUT_USER"

// Action Creators
export const setValidUser = (data) => ({
    type: VALID_USER_DETAIL,
    payload: data
})

export const setUserPost = (data) => ({
    type: SET_USER_POST,
    payload: data
})

export const fetchUserPost = (owner) => {
    let filtered;
    return(dispatch) => {
        fetch('http://localhost:8080/orders')
        .then(res => res.json())
        .then(data => filtered = data.filter(order => order.owner_name === owner))
        .then(() => dispatch(setUserPost(filtered)))
    }
}

export const logoutUser = () => ({
    type: LOGOUT_USER,
})