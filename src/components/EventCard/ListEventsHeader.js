import React, { Component } from "react";
import { Text, StyleSheet, TouchableOpacity, Animated, Easing } from "react-native";
import { Card, Button, Icon, View } from "native-base";
import { connect } from "react-redux";
import LottieAnimation from "lottie-react-native";

import LottieAsset from "../../assets/lotties";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    minHeight: 50,
  },
});


@connect(
  null,
  dispatch => ({ dispatch })
)
class ListEventsHeader extends Component {
  constructor(props){
    super(props);
    this.state = {
      progress: new Animated.Value(0),
    };
  }

  componentDidMount() {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
    }).start();
  }

  render(){
    return (
      <Card>
        <TouchableOpacity
          style={styles.container}
          >
          <LottieAnimation
            progress={this.state.progress}
            source={LottieAsset.confetti}
          />
          <View style={{alignItems: "flex-end"}}>
          <Button bordered iconLeft small>
            <Icon type="MaterialCommunityIcons" name="plus" />
            <Text style={{marginHorizontal: 10}}>Tạo sự kiện</Text>
          </Button>
          </View>
        </TouchableOpacity>
      </Card>
    );
  }
}

export default ListEventsHeader;
