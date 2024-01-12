// App.js
import React from "react";
import { Provider } from "react-redux";

import TaskList from "./component/Tasklist";
import store from "./Redux/Store/Store";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <TaskList />
      </div>
    </Provider>
  );
};

export default App;
