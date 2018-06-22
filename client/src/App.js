import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import Landing from "./views/Landing";

import Register from "./views/login/Register";
import Login from "./views/login";
import Dashboard from "./views/dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/create-profile/EditProfile";
import AddEditExperience from "./components/create-profile/AddEditExperience";
import AddEditEducation from "./components/create-profile/AddEditEducation";

//Views
import Profiles from "./views/profiles";
import Profile from "./views/profiles/Profile";
import Students from "./views/students/";
import AddEditStudent from "./views/students/AddEditStudent";
import StudentProfile from "./views/students/StudentProfile";
import PostsIndex from "./views/posts/";
import Post from "./views/posts/Post";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";

import PrivateRoute from "./components/PrivateRoute";

if (localStorage.token) {
  setAuthToken(localStorage.token);

  const decoded = jwt_decode(localStorage.token);

  store.dispatch(setCurrentUser(decoded));

  const now = Date.now() / 1000;
  if (decoded.exp < now) {
    store.dispatch(logoutUser());
    store.dispatch(clearCurrentProfile());

    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/add-experience"
                component={AddEditExperience}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/add-education"
                component={AddEditEducation}
              />
            </Switch>
            <Route exact path="/profiles" component={Profiles} />
            <Route exact path="/profile/:handle" component={Profile} />
            <Switch>
              <PrivateRoute exact path="/feed" component={PostsIndex} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/post/:id" component={Post} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/students" component={Students} />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/students/add"
                component={AddEditStudent}
              />
              <PrivateRoute
                exact
                path="/students/:id"
                component={StudentProfile}
              />
              <PrivateRoute
                exact
                path="/students/:id/edit"
                component={AddEditStudent}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
