import React, { Component } from "react";
import { View, Image, Alert } from "react-native";
import { connect } from "react-redux";
import { Field, reduxForm, formValueSelector, reset } from "redux-form";
import { Text } from "react-native";
import { Button, CheckBox, ListItem, List, Form } from "native-base";
import LinearGradient from "react-native-linear-gradient";
import { InputField } from "../../components/FormFields";
import styles from "./styles";
import Images from "../../assets/images";
import { userSignup } from "./actions";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  email,
  required,
  comparePassword,
  minLength4,
  maxLength15,
  alphaNumeric,
  hasSpecialChart
} from "../../utils/form.valid.utils";

const formName = "signUp";
const selector = formValueSelector(formName);
@connect(
  ({ common, signup, ...state }) => ({
    orientation: common.orientation,
    tempPassword: selector(state, "password"),
    signUpStatus: signup.status,
    signUpSuccess: signup.signUpSuccess
  }),
  dispatch => ({
    userSignup: user => dispatch(userSignup(user)),
    resetForm: form => dispatch(reset(form))
  })
)
class SignUpForm extends Component {
  state = { checkBox: false }

  handleCheckBox = () => {
    this.setState({ checkBox: !this.state.checkBox });
  }

  compareValue = value => {
    const { tempPassword } = this.props;
    return comparePassword(tempPassword, value);
  }

  onPressSubmit = () => {
    if (this.props.signUpSuccess) {
      this.props.navigation.navigate("Login");
      this.props.resetForm(formName);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.signUpStatus && nextProps.signUpStatus !== this.props.signUpStatus) {
      setTimeout(() => {
        Alert.alert(
          "Information",
          nextProps.signUpStatus.success || nextProps.signUpStatus.email || nextProps.signUpStatus.username,
          [{ text: "OK", onPress: this.onPressSubmit }],
          {
            cancelable: false
          }
        );
      }, 200);
    }
  }

  handelUserSignup = values => {
    // this.props.userSignup(values);
  }

  render() {
    const { handleSubmit, valid, submitting, pristine } = this.props;
    return (
      <LinearGradient colors={["#010a13", "#044f6e", "#1db6bc", "#20b7be"]} style={styles.linearGradient}>
        <KeyboardAwareScrollView keyboardShouldPersistTaps="always" bounces={false} style={{ flex: 1, width: "100%" }}>
          <View style={{ alignItems: "center" }}>
            <View style={{ marginTop: 40 }}>
              <Text style={styles.textHeaderModal}>SIGN UP FOR AN ACCOUNT</Text>
            </View>
            <View style={{ margin: 5 }}>
              <Image source={Images.avatar} resizeMode="contain" style={{ height: 100, width: 100, margin: 10 }} />
            </View>
            <View style={{ alignItems: "center" }}>
              <Button transparent style={styles.btnChangeAvatar} onPress={() => {}}>
                <Text style={styles.textBtnChangeAvatar}>Change Avatar</Text>
              </Button>
            </View>
            <View style={styles.modal}>
              <Form style={{ marginLeft: -15, padding: 0 }}>
                <Field
                  name="firstName"
                  iconName="person"
                  placeholder="First Name"
                  component={InputField}
                  validate={[required]}
                />
                <Field
                  name="lastName"
                  iconName="person"
                  placeholder="Last Name"
                  component={InputField}
                  validate={[required]}
                />
                <Field
                  name="email"
                  iconName="mail"
                  placeholder="Email"
                  validate={[required, email]}
                  component={InputField}
                />
                <Field
                  name="username"
                  iconName="person"
                  placeholder="username"
                  component={InputField}
                  validate={[required, hasSpecialChart]}
                />
                <Field
                  name="password"
                  iconName="lock"
                  placeholder="Password"
                  secureTextEntry
                  validate={[required, minLength4, maxLength15, alphaNumeric]}
                  component={InputField}
                />
                <Field
                  name="tempPassword"
                  iconName="lock"
                  placeholder="Re-enter Password"
                  secureTextEntry
                  validate={[required, minLength4, maxLength15, alphaNumeric, this.compareValue]}
                  component={InputField}
                />
              </Form>

              <View style={{ marginTop: 15 }}>
                <List>
                  <ListItem style={{ marginLeft: 5, borderBottomWidth: 0 }}>
                    <CheckBox checked={this.state.checkBox} onPress={this.handleCheckBox} />
                    <Text style={{ color: "#fff", marginLeft: 15, fontSize: 14 }}>
                      {"I agree to the Term & Conditions"}
                    </Text>
                  </ListItem>
                </List>
              </View>
              <View style={{ alignItems: "center", alignSelf: "stretch" }}>
                <Button
                  block
                  style={styles.btnSummit}
                  onPress={handleSubmit(this.handelUserSignup)}
                  disabled={!valid || pristine || submitting || !this.state.checkBox}
                >
                  <Text style={styles.textBtnSummit}>Create Account</Text>
                </Button>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </LinearGradient>
    );
  }
}

const SignUpContainer = reduxForm({
  form: formName
})(SignUpForm);

export default SignUpContainer;
