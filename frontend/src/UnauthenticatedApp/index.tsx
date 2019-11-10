import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api";
import NotFoundPage from "../App/NotFoundPage";
import { getRefreshToken } from "../localStorage";
import { setUser } from "../store/auth/actions";
import { getUser } from "../store/auth/selectors";
import ForgotPasswordPage from "./ForgotPasswordPage";
import PasswordlessPage from "./PasswordlessPage";
import ResetPasswordPage from "./ResetPasswordPage";
import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";
import theme from "./theme";
import VerifyAccountPage from "./VerifyAccountPage";

const UnauthenticatedApp: React.FC = () => {
  const user = useSelector(getUser);
  const dispatch = useDispatch();

  const tokenLogin = async () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      return;
    }
    const loggedIn = await api.auth.tokenLogin(refreshToken);
    if (!loggedIn) {
      toast.error("Incorrect username or password");
      return;
    }
    const user = await api.users.getOwnUser();
    if (!user) {
      toast.error("Something went wrong");
      return;
    }
    dispatch(setUser(user));
  };

  useEffect(() => {
    if (user) {
      return;
    }
    tokenLogin();
  }, [user]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Switch>
        <Route exact path="/" component={SignInPage} />
        <Route exact path="/login" component={SignInPage} />
        <Route exact path="/signup" component={SignUpPage} />
        <Route exact path="/reset_password" component={ForgotPasswordPage} />

        <Route
          exact
          path="/auth/passwordless/:token"
          component={PasswordlessPage}
        />
        <Route
          exact
          path="/users/reset_password/:token"
          component={ResetPasswordPage}
        />
        <Route
          exact
          path="/users/verify_email/:token"
          component={VerifyAccountPage}
        />

        <Route component={NotFoundPage} />
      </Switch>
    </ThemeProvider>
  );
};

export default UnauthenticatedApp;