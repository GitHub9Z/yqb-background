export default (state, { type, payload }) => {
  switch (type) {
    case 'SET_INFO':
      return Object.assign({}, state, {
          info: payload
      })
    default: 
      return state || {};
  }
};
