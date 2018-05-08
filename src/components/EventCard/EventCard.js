import React, { Component } from "react";
import { Text, StyleSheet, TouchableOpacity, View, Image } from "react-native";
import { Card, Button } from "native-base";
import { connect } from "react-redux";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import moment from "moment";

import { colors } from "../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "stretch",
    minHeight: 300,
  },
  imageBannerContainer: {
    flex: 7,
  },
  imageBanner: {
    width: "100%",
    height: 200,
  },
  contentContainer: {
    flex: 2,
    flexDirection:"row",
  },
  leftSideContentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  rightSideContentContainer: {
    flex: 5,
    padding: 5,
    justifyContent: "center",
  },
  headerTextContent: {
    fontWeight: "800",
    fontSize: 16,
    margin: 5,
  },
  textContent: {
    marginHorizontal: 5,
    marginVertical: 2,
  }
});

@connect(
  ({ common, nav }) => ({
    nav: nav,
    orientation: common.orientation
  }),
  dispatch => ({ dispatch })
)
class EventCard extends Component {

  render(){
    const { photos, name, start, end, interests, isInterest, location } = this.props;
    moment.locale("vi");
    return (
      <Card>
        <TouchableOpacity style={styles.container}>

          {/* image banner */}
          <View style={styles.imageBannerContainer}>
            { photos && photos.length ? <Image
              source={{uri: JSON.parse(photos[0]).URL}}
              style={styles.imageBanner}/> : null }
          </View>

          {/* content container */}
          <View style={styles.contentContainer}>
            <View style={styles.leftSideContentContainer}>
              <Text style={{color: "#f44283", fontSize: 16}}>THÁNG</Text>
              <Text style={{fontSize: 16}}>{moment(start).format("M")}</Text>
            </View>
            <View style={styles.rightSideContentContainer}>
              <Text style={styles.headerTextContent}>{name}</Text>
              <Text style={styles.textContent}>{`Bắt đầu: ${moment(start).format("MMMM Do YYYY, h:mm:ss a")}`}</Text>
              <Text style={styles.textContent}>{`Kết thúc: ${moment(end).format("MMMM Do YYYY, h:mm:ss a")}`}</Text>
              <Text style={styles.textContent}>{`Địa điểm: ${location}`}</Text>
              <Text style={styles.textContent}>{`${interests.length} người quan tâm`}</Text>
            </View>
          </View>

          {/* footer container */}
          <View style={{flex: 2, flexDirection:"row", justifyContent: "flex-end"}}>
            <Button iconLeft transparent primary>
            <MaterialIcons name={isInterest ? "star" : "star-border"} size={20} color={colors.PRIMARY}/>
              <Text style={{ marginHorizontal: 5 }}>Quan tâm</Text>
            </Button>
          </View>
        </TouchableOpacity>
      </Card>
    );
  }
}

export default EventCard;
