import store from '../store'

export function setInfo(info) {
    store.dispatch({
        type: 'SET_INFO',
        payload: info
    })
}