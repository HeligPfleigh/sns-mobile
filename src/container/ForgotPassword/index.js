import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Text } from "react-native";
import { Item, Input, Icon, Button } from "native-base";
import LinearGradient from "react-native-linear-gradient";
import { email, required } from "../../utils/form.valid.utils";
import styles from "./styles";

@connect(({ common }) => ({
  orientation: common.orientation
}))
class ForgotPasswordForm extends Component {
  textInput
  renderInput = ({ input, label, type, meta: { touched, error, warning } }) => (
    <Item error={error && touched}>
      <Icon
        active
        name={input.name === "email" ? "mail" : "unlock"}
        style={{ color: error && touched ? "#fa0707" : "#fff" }}
      />
      <Input
        ref={c => (this.textInput = c)}
        placeholder={input.name === "email" ? "Email" : "Password"}
        placeholderTextColor="#fff"
        secureTextEntry={input.name === "password" ? true : false}
        {...input}
        style={{ color: "#fff" }}
      />
    </Item>
  )

  render() {
    const { orientation } = this.props;
    const cardHeight = orientation === "LANDSCAPE" ? styles.heightmodalLandscape : styles.heightmodalPotrait;
    return (
      <LinearGradient colors={["#010a13", "#044f6e", "#1db6bc", "#20b7be"]} style={styles.linearGradient}>
        <View style={[cardHeight, styles.modal]}>
          <Text style={styles.textHeaderModal}>RESET YOUR PASSWORD</Text>
          <Text style={{ color: "#fff", margin: 10 }}>
            Enter your email address below and click on the Request password reset button. We will contact you shortly
          </Text>
          <View style={{ margin: 10 }}>
            <Field name="email" component={this.renderInput} validate={[email, required]} />
          </View>
          <View style={{ alignItems: "center", alignSelf: "stretch" }}>
            <Button block style={styles.btnSummit} onPress={() => {}}>
              <Text style={styles.textBtnSummit}>Request password reset</Text>
            </Button>
          </View>
        </View>
      </LinearGradient>
    );
  }
}

const ForgotPasswordContainer = reduxForm({
  form: "ForgotPassword"
})(ForgotPasswordForm);

export default ForgotPasswordContainer;
