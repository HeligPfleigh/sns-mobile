import React, { Component } from "react";
import { Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { Card } from "native-base";
import { connect } from "react-redux";
import LottieAnimation from "lottie-react-native";
import { NavigationActions } from "react-navigation";

const deviceWidth = Dimensions.get("window").width;

import { colors } from "../../constants";
import LottieAsset from "../../assets/lotties";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    alignSelf: "stretch",
    minHeight: 300,
    width: deviceWidth
  },
});

@connect(
  null,
  dispatch => ({ dispatch })
)
class ListEventsFooter extends Component {
  componentDidMount() {
    this.animation.play();
  }

  render(){
    return (
      <Card>
        <TouchableOpacity
          style={styles.container}
          onPress={() => this.props.dispatch(NavigationActions.navigate({routeName: "ListEventsScreen"}))}>
          <LottieAnimation
            ref={animation => { this.animation = animation;}}
            source={LottieAsset.events_footer}
          />
          <Text style={{marginBottom: 40, fontSize: 20, color: colors.PRIMARY}}>{"Nhấn để xem thêm các\n\tsự kiện khác"}</Text>
        </TouchableOpacity>
      </Card>
    );
  }
}

export default ListEventsFooter;
