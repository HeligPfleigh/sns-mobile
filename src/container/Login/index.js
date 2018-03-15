import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Image, Platform, TouchableOpacity } from "react-native";
import { Field, reduxForm } from "redux-form";
import LinearGradient from "react-native-linear-gradient";
import { Header, Button, Title, Text, View, Icon, Toast, Form } from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { LoginManager, AccessToken } from "react-native-fbsdk";
import SplashScreen from "react-native-splash-screen";
import { gql } from "apollo-boost";
import { graphql, compose } from "react-apollo";
import { AsyncStorage } from "react-native";

import Images from "../../assets/images";
import { InputField } from "../../components/FormFields";
import { required, alphaNumeric, minLength4, maxLength15 } from "../../utils/form.valid.utils";
import * as utils from "../../utils/common";
import { SPINNER_CHANGE, ACCESS_TOKEN } from "../../constants";
import { LOGIN_SUCCESS, LOGIN_FAILED, LOGIN_CLEAR_STATUS } from "./actions";
import styles from "./styles";

export const loginQuery = gql`
  mutation login($account: String!, $password: String!) {
    login(account: $account, password: $password) {
      id_token
    }
  }
`;

@compose(
  connect(
    ({ common, auth }) => ({
      loginStatus: auth.status,
      orientation: common.orientation
    }),
    dispatch => ({ dispatch })
  ),
  graphql(loginQuery, { name: "loginUser" })
)
class LoginForm extends Component {
  constructor(props) {
    super(props);

    if (props.dispatch) {
      props.dispatch(utils.createAction(SPINNER_CHANGE, false));
    }
  }

  // login process func
  onLogin = async variables => {
    this.props.dispatch(utils.createAction(SPINNER_CHANGE, true));
    try {
      const { data: { login } } = await this.props.loginUser({ variables });
      if (!login || !login.id_token) {
        throw new Error("Tài khoản không tồn tại");
      }
      // save token locally
      await AsyncStorage.setItem(ACCESS_TOKEN, login.id_token);
      this.props.dispatch(utils.createAction(LOGIN_SUCCESS));
      this.props.navigation.navigate("Drawer");
    } catch (error) {
      this.props.dispatch(utils.createAction(LOGIN_FAILED));
    }
    this.props.dispatch(utils.createAction(SPINNER_CHANGE, false));
  }

  headerContentRender = (orientation, appTitle, headerBody) => (
    <View padder style={headerBody}>
      <Image source={Images.logo} style={(orientation === "LANDSCAPE" && styles.logo) || {}} />
      {orientation === "LANDSCAPE" && <Title style={appTitle}>Chung Cư Của Tôi</Title>}
    </View>
  )

  formRender = () => (
    <Form style={{ marginLeft: -15, padding: 0 }}>
      <Field
        name="account"
        iconName="ios-mail"
        placeholder="Email hoặc tên đăng nhập"
        component={InputField}
        validate={[required]}
      />
      <Field
        name="password"
        iconName="lock"
        placeholder="Nhập mật khẩu"
        secureTextEntry
        component={InputField}
        validate={[required, minLength4, maxLength15, alphaNumeric]}
      />
    </Form>
  )

  componentWillReceiveProps(nextProps) {
    // alert when login fail
    if (!nextProps.loginStatus) {
      Toast.show({
        text: "Tài khoản không đúng!",
        duration: 2500,
        position: "top",
        textStyle: { textAlign: "center" },
        type: "danger"
      });
      this.props.dispatch(utils.createAction(LOGIN_CLEAR_STATUS));
    }
  }

  _onLoginFbPress = async () => {
    const res = await LoginManager.logInWithReadPermissions(["public_profile"]);
    if (res.grantedPermissions && !res.isCancelled) {
      const data = await AccessToken.getCurrentAccessToken();
      if (data) {
        //todo: handle login here
        //console.log(data.accessToken);
      }
    }
  }

  render() {
    const { orientation, handleSubmit, valid, submitting, pristine } = this.props;
    let headerStyle = styles.header;
    let headerBody = {
      alignItems: "center",
      flexDirection: "column"
    };

    let appTitle = { color: "#fff", top: 10 };
    let linksWrapper = {
      alignItems: "center",
      flexDirection: "column"
    };

    const btnLink = { alignItems: "center", top: -13 };
    const textLink = { backgroundColor: "transparent", fontSize: 13, color: "#fff" };

    if (orientation === "LANDSCAPE") {
      headerStyle = styles.headerLandscape;
      headerBody = {
        ...headerBody,
        justifyContent: "center",
        flexDirection: "row"
      };
      appTitle = {
        ...appTitle,
        top: 0,
        fontSize: 38
      };
      linksWrapper = {
        ...linksWrapper,
        flexDirection: "row",
        justifyContent: "space-between"
      };
    }

    return (
      <LinearGradient colors={["#010a13", "#044f6e", "#1db6bc", "#20b7be"]} style={styles.container}>
        {Platform.OS === "ios" && (
          <Header iosBarStyle="light-content" style={headerStyle}>
            {this.headerContentRender(orientation, appTitle, headerBody)}
          </Header>
        )}

        {Platform.OS !== "ios" && this.headerContentRender(orientation, appTitle, headerBody)}

        <View padder>
          <View padder>{this.formRender()}</View>
          <View padder style={styles.btnLoginWrapper}>
            <Button
              block
              style={styles.btnLogin}
              onPress={handleSubmit(this.onLogin)}
              disabled={!valid || pristine || submitting}
            >
              <Text>Đăng nhập</Text>
            </Button>
          </View>
          <View padder style={linksWrapper}>
            <View padder style={btnLink}>
              <Text
                style={textLink}
                onPress={() => {
                  this.props.navigation.navigate("ForgotPassword");
                }}
              >
                {"Quên mật khẩu?"}
              </Text>
            </View>
            <View style={styles.orWrapper}>
              <View style={styles.orDivider} />
              <View style={styles.orTextWrapper}>
                <Text style={styles.orText}>Hoặc</Text>
              </View>
              <View style={styles.orDivider} />
            </View>
            <View padder style={btnLink}>
              <TouchableOpacity
                onPress={this._onLoginFbPress}
                style={{ backgroundColor: "transparent", flexDirection: "row", alignItems: "center" }}
              >
                <MaterialCommunityIcons size={30} name="facebook-box" color="#318DEE" />
                <Text style={textLink}>Facebook</Text>
              </TouchableOpacity>
            </View>
            <View padder style={(orientation === "LANDSCAPE" && btnLink) || {}}>
              <Text style={{ ...textLink, fontSize: orientation !== "LANDSCAPE" ? 16 : 13 }}>
                {"Bạn chưa có tài khoản? "}
                <Icon
                  name="arrow-dropright-circle"
                  style={{ fontSize: orientation === "LANDSCAPE" ? 18 : 15, color: "#fff" }}
                  onPress={() => {
                    this.props.navigation.navigate("SignUp");
                  }}
                />
              </Text>
            </View>
          </View>
        </View>

        {/* {(Platform.OS === "ios" || orientation !== "LANDSCAPE") && (
          <Footer style={styles.footerWrapper}>
            <View style={styles.footerContent}>
              <View padder>
                <Text style={{ color: "#fff", fontSize: 13 }}>Copyright © 2018, MTT JSC Software.</Text>
              </View>
            </View>
          </Footer>
        )} */}
      </LinearGradient>
    );
  }
}

LoginForm.propTypes = {
  dispatch: PropTypes.any,
  loginStatus: PropTypes.bool,
  orientation: PropTypes.string,
  userLogin: PropTypes.func
};

const LoginContainer = reduxForm({
  form: "login"
})(LoginForm);

export default LoginContainer;
