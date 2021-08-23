import LogIn from "./pages/LogIn";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import IndividualPost from "./pages/IndividualPost";
import PrivateRoute from "./pages/PrivateRoute";
import UserProvider from "./context/UserProvider";
import Page404 from "./pages/Page404";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <UserProvider>
      <Switch>
        <PrivateRoute path="/" component={Home} exact />
        <Route path="/login" component={LogIn} />
        <Route path="/profile/:displayName" component={Profile} />
        <Route path="/post/:id" component={IndividualPost} />
        <Route path="*" component={Page404} />
      </Switch>
    </UserProvider>
  );
}

export default App;
