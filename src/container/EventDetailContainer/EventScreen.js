import React, { Component } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import moment from "moment";
import { Icon } from "native-base";

import { colors } from "../../constants";

const styles = StyleSheet.create({
  banner: {
    width: "100%",
    height: 200,
  },
  header: {
    minHeight: 60,
    flexDirection: "row",
  },
  leftSideContentContainer: {
    flex: 2,
    backgroundColor: "#9999ff",
    justifyContent: "center",
    alignItems: "center",
  },
  rightSideContentContainer: {
    flex: 5,
    padding: 5,
    backgroundColor: "#e5e5ff",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTextContent: {
    fontWeight: "800",
    fontSize: 16,
    margin: 5,
  },
  eventInfo: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: colors.PRIMARY,
    margin: 5,
  },
});

class InfoTag extends Component {
  render() {
    const { iconType, iconName, text } = this.props;
    return (
      <View style={{flexDirection: "row", margin: 5}}>
        <View style={{flex: 1, justifyContent:"center", alignItems:"center"}}>
          <Icon type={iconType} name={iconName} style={{fontSize: 20, color: colors.LIGHT_GRAY}}/>
        </View>
        <View style={{flex: 5, justifyContent:"flex-start"}}>
          <Text>{text}</Text>
        </View>
      </View>
    );
  }
}

class EventScreen extends Component {
  render() {
    const { photos, name, start, end, location, message } = this.props.event;
    return (
      <View style={{ flex: 1 }}>
        {/* banner */}
        {photos && photos.length ? (
          <Image source={{ uri: JSON.parse(photos[0]).URL }} style={styles.banner} />
        ) : null}

        {/* header */}
        <View style={styles.header}>
          <View style={styles.leftSideContentContainer}>
            <Text style={{color: "#f44283", fontSize: 16}}>THÁNG</Text>
            <Text style={{fontSize: 16}}>{moment(start).format("M")}</Text>
          </View>
          <View style={styles.rightSideContentContainer}>
            <Text style={styles.headerTextContent}>{name}</Text>
          </View>
        </View>

        {/* event info */}
        <View style={styles.eventInfo}>
          <InfoTag iconType="MaterialCommunityIcons" iconName="clock-start" text={start}/>
          <InfoTag iconType="MaterialCommunityIcons" iconName="clock-end" text={end}/>
          <InfoTag iconType="MaterialIcons" iconName="location-on" text={location}/>
        </View>

        {/* event description */}
        <View style={styles.eventInfo}>
          <Text style={styles.headerTextContent}>Mô tả sự kiện</Text>
          <Text>{message}</Text>
        </View>
      </View>
    );
  }
}

export default EventScreen;
