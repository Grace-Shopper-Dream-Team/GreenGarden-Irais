import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import singleProductReducer from "./singleProduct";
import singleOrderReducer from "./singleOrder";
import products from "./products";
import usersReducer from "./allUsersView";
import inventoryReducer from "./inventory";

const reducer = combineReducers({
  auth,
  singleProduct: singleProductReducer,
  singleOrder: singleOrderReducer,
  products,
  users: usersReducer,
  inventory: inventoryReducer,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
