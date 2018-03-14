import React from "react";
import { Icon, Item, Input } from "native-base";

const renderInputField = ({ input, iconName, ref, meta: { touched, error, warning }, ...ownProps }) => (
  <Item error={error && touched}>
    <Icon active name={iconName} style={{ color: error && touched ? "#fa0707" : "#fff" }} />
    <Input
      {...input}
      {...ownProps}
      ref={c => (ref = c)}
      style={{ color: "#fff" }}
      autoCorrect={false}
      placeholderTextColor={error && touched ? "#fa0707" : "#c0c0c0"}
    />
  </Item>
);

export default renderInputField;
