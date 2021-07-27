/*A reducer is a function that determines changes to an application's state. 
It uses the action it receives to determine this change.*/
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = [], action) => {

  switch(action.type){
    case 'FETCH_ALL':
      return action.payload;
    case 'CREATE':
      return [...state, action.payload ];
    default:
      return state;
      //break;

  }
}