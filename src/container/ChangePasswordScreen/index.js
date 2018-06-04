import React, { Component } from "react";
import { Content, Text, Form, Button, View, Toast, Header, Left, Right, Body, Icon, Title } from "native-base";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { compose, graphql } from "react-apollo";
import { connect } from "react-redux";
import { gql } from "apollo-boost";

import { required, alphaNumeric, minLength4, maxLength15, comparePassword } from "../../utils/form.valid.utils";
import { InputField } from "../../components/FormFields";
import { SPINNER_CHANGE } from "../../constants";
export const CHANGE_PASSWORD_SUCCESS = "CHANGE_PASSWORD_SUCCESS";
export const CHANGE_PASSWORD_FAIL = "CHANGE_PASSWORD_FAIL";
import { logOut } from "../Sidebar/actions";
import * as utils from "../../utils/common";
import Layout from "../../components/Layout";
import styles from "./styles";

export const changeUserPassword = gql`
  mutation changeUserPassword($username: String!, $password: String!, $oldPassword: String) {
    changeUserPassword(username: $username, password: $password, oldPassword: $oldPassword)
  }
`;

class ChangePassword extends Component {
  compareValue = value => {
    const { password } = this.props;
    return comparePassword(password, value);
  }

  formRender = () => (
    <Form style={{ marginLeft: -15, padding: 0 }}>
      <Field
        name="oldPassword"
        iconName="lock"
        placeholder="Nhập mật khẩu hiện tại"
        secureTextEntry
        component={InputField}
        validate={[required, minLength4, maxLength15, alphaNumeric]}
      />
      <Field
        name="password"
        iconName="lock"
        placeholder="Nhập mật khẩu mới"
        secureTextEntry
        component={InputField}
        validate={[required, minLength4, maxLength15, alphaNumeric]}
      />
      <Field
        name="repeatedPassword"
        iconName="lock"
        placeholder="Nhập mật khẩu mới"
        secureTextEntry
        component={InputField}
        validate={[required, minLength4, maxLength15, alphaNumeric, this.compareValue]}
      />
    </Form>
  )

  onSubmit = async variables => {
    this.props.dispatch(utils.createAction(SPINNER_CHANGE, true));
    const { username } = this.props;
    const { oldPassword, password } = variables;
    const new_var = { username: username, password: password, oldPassword: oldPassword };
    try {
      await this.props.changePassword(new_var);
      Toast.show({
        text: "Đổi password thành công",
        duration: 2500,
        position: "top",
        textStyle: { textAlign: "center" },
        type: "success"
      });
      this.props.dispatch(utils.createAction(CHANGE_PASSWORD_SUCCESS));
      setTimeout(() => this.props.logOut(this.props.navigation), 300);
    } catch (error) {
      const errorMessage =
        (error && error.graphQLErrors && error.graphQLErrors[0].message) || "Đổi password không thành công";
      Toast.show({
        text: errorMessage,
        duration: 2500,
        position: "top",
        textStyle: { textAlign: "center" },
        type: "danger"
      });
      this.props.dispatch(utils.createAction(CHANGE_PASSWORD_FAIL));
    }
    this.props.dispatch(utils.createAction(SPINNER_CHANGE, false));
  }

  render() {
    const { handleSubmit, valid, submitting, pristine } = this.props;
    return (
      <Layout navigation={this.props.navigation} >
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="ios-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title> Đổi mật khẩu </Title>
          </Body>
          <Right />
        </Header>
        <Content padder style={{ backgroundColor: "rgba(85,186,255, 1)" }}>
          {this.formRender()}
          <View padder style={styles.btnLoginWrapper}>
            <Button
              block
              style={styles.btnLogin}
              onPress={handleSubmit(this.onSubmit)}
              disabled={!valid || pristine || submitting}
            >
              <Text>Đổi mật khẩu</Text>
            </Button>
          </View>
        </Content>
      </Layout>
    );
  }
}
const selector = formValueSelector("ChangePasswordForm");

const ChangePasswordForm = reduxForm({
  form: "ChangePasswordForm"
})(ChangePassword);

const ChangePasswordContainer = compose(
  connect(
    state => ({
      username: state.userInfo && state.userInfo.username,
      password: selector(state, "password"),
      oldPassword: selector(state, "oldPassword")
    }),
    dispatch => ({
      logOut: navigation => dispatch(logOut(navigation))
    })
  ),
  graphql(changeUserPassword, { name: "changePassword" })
)(ChangePasswordForm);

export default ChangePasswordContainer;
