import LogIn from "./pages/LogIn";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import HorizontalPost from "./pages/HorizontalPost";
import PrivateRoute from "./pages/PrivateRoute";
import UserProvider from "./context/UserProvider";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <UserProvider>
      <Switch>
        <PrivateRoute path="/" component={Home} exact />
        <Route path="/login" component={LogIn} />
        <Route path="/profile/:displayName" component={Profile} />
        <Route path="/post/:id" component={HorizontalPost} />
      </Switch>
    </UserProvider>
  );
}

export default App;
