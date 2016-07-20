export const modalShow = makeAction('MODAL_SHOW');
export const editShow = makeAction('ADD_RULES');
export const storeShow = makeAction('STORE_MODAL');
export const deleteItem = makeAction('DELETE_ITEM');

function makeAction (type) {
  return ({ dispatch }, ...args) => dispatch(type, ...args)
}
