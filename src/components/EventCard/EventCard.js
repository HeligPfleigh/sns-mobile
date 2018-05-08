import React, { Component } from "react";
import { Text, StyleSheet, TouchableOpacity, Dimensions, View, Image } from "react-native";
import { Card, Button, Icon } from "native-base";
import { connect } from "react-redux";
const deviceWidth = Dimensions.get("window").width;

import { colors } from "../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "stretch",
    minHeight: 300,
    width: deviceWidth - 20
  },
});

const emptyFn = () => {};

@connect(
  ({ common, nav }) => ({
    nav: nav,
    orientation: common.orientation
  }),
  dispatch => ({ dispatch })
)
class EventCard extends Component {
  static defaultProps = {
    onToggleSharingModal: emptyFn,
  }

  render(){
    const { photos, name, start, end, interests } = this.props;
    return (
      <Card>
        {/* image banner */}
        <TouchableOpacity style={styles.container}>
          <View style={{flex: 7}}>
            { photos && photos.length ? <Image
              source={{uri: JSON.parse(photos[0]).URL}}
              style={{width: "100%", height: 200}}/> : null }
          </View>
          <View style={{flex: 2, flexDirection:"row"}}>
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
              <Text style={{color: "#f44283", fontSize: 16}}>THÁNG</Text>
              <Text style={{fontSize: 16}}>8</Text>
            </View>
            <View style={{flex: 5, padding: 5, justifyContent: "center"}}>
              <Text style={{fontWeight: "800", fontSize: 16, margin: 5}}>{name}</Text>
              <Text style={{ marginHorizontal: 5, marginVertical: 2 }}>{`Bắt đầu: ${start}`}</Text>
              <Text style={{ marginHorizontal: 5, marginVertical: 2 }}>{`Kết thúc: ${end}`}</Text>
              <Text style={{ marginHorizontal: 5, marginVertical: 2 }}>{`${interests.length} người quan tâm`}</Text>
            </View>
          </View>
          <View style={{flex: 2, flexDirection:"row"}}>
            <View style={{flex: 2}}/>
            <View style={{flex: 1}}>
              <Button iconLeft transparent primary>
                <Icon name="star" color="black"/>
                <Text style={{ marginHorizontal: 5 }}>Quan tâm</Text>
              </Button>
            </View>
          </View>
        </TouchableOpacity>
      </Card>
    );
  }
}

export default EventCard;
