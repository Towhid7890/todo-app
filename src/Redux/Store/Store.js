// store.js
import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../../Redux/Reducer/taskSlice";
const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});

export default store;
