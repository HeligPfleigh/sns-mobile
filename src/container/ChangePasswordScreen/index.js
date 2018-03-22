import React, { Component } from "react";
import { Content, Text, Form, Button, View } from "native-base";
import { required, alphaNumeric, minLength4, maxLength15, comparePassword } from "../../utils/form.valid.utils";
import { InputField } from "../../components/FormFields";
import { Field, reduxForm, formValueSelector } from "redux-form";
import {  compose } from "react-apollo";
import { connect } from "react-redux";

import Layout from "../../components/Layout";
import styles from "./styles";

class ChangePassword extends Component {
  compareValue = value => {
    const { newPassword } = this.props;
    return comparePassword(newPassword, value);
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
        name="newPassword"
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

  onSubmit = () => {}

  render() {
    const { handleSubmit, valid, submitting, pristine } = this.props;

    return (
      <Layout navigation={this.props.navigation}>
        <Content padder style={{ backgroundColor: "#ccc" }}>
          <Text style={{ textAlign: "center" }}>{"Đổi Mật Khẩu"}</Text>
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
  connect(state => ({
    newPassword: selector(state, "newPassword")
  }))
)(ChangePasswordForm);

export default ChangePasswordContainer;
