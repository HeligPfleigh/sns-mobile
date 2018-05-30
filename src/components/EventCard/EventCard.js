import React, { Component } from "react";
import { Text, StyleSheet, TouchableOpacity, View, Image, Dimensions } from "react-native";
import { Card, Button, Icon } from "native-base";
import { connect } from "react-redux";
import moment from "moment";
import "moment/locale/vi.js";
import { NavigationActions } from "react-navigation";
import interestEvent from "../../graphql/mutations/interestEvent";
import { colors } from "../../constants";
import { graphql, compose } from "react-apollo";
import EVENT_QUERY from "../../graphql/queries/event";
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "stretch",
    minHeight: 300,
    width: deviceWidth - 20
  },
  imageBannerContainer: {
    flex: 7,
    padding:10
  },
  imageBanner: {
    width: "100%",
    height: 200
  },
  contentContainer: {
    flex: 2,
    flexDirection: "row"
  },
  leftSideContentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  rightSideContentContainer: {
    flex: 5,
    padding: 5,
    justifyContent: "center"
  },
  headerTextContent: {
    fontWeight: "800",
    fontSize: 16,
    margin: 5
  },
  textContent: {
    marginHorizontal: 5,
    marginVertical: 2
  }
});

class EventCard extends Component {
  _pressOnEventDetail = () => {
    const { _id } = this.props;
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: "EventDetailScreen",
        params: {
          eventID: _id
        }
      })
    );
  }
  goEvent() {
    this.props
      .goEvent({
        variables: { eventId: this.props._id },
        refetchQueries: [
          {
            query: EVENT_QUERY,
            variables: { _id: this.props._id }
          }
        ]
      })
      .then(res => {
        return;
      })
      .catch(err => {
        throw err;
      });
  }

  render() {
    const { photos, name, start, end, interests, isInterest, location } = this.props;
    moment.locale("vi");

    return (
      <Card>
        <TouchableOpacity style={styles.container} onPress={this._pressOnEventDetail}>
          {/* image banner */}
          <View style={styles.imageBannerContainer}>
            {photos && photos.length ? (
              <Image source={{ uri: JSON.parse(photos[0]).URL }} style={styles.imageBanner} />
            ) : null}
          </View>

          {/* content container */}
          <View style={styles.contentContainer}>
            <View style={styles.leftSideContentContainer}>
              <Text style={{ color: "#f44283", fontSize: 16 }}>THÁNG</Text>
              <Text style={{ fontSize: 16 }}>{moment(start).format("M")}</Text>
            </View>
            <View style={styles.rightSideContentContainer}>
              <Text style={styles.headerTextContent}>{name}</Text>
              <Text style={styles.textContent}>{`Bắt đầu: ${moment(start).format("Do MMMM YYYY, h:mm:ss a")}`}</Text>
              <Text style={styles.textContent}>{`Kết thúc: ${moment(end).format("Do MMMM YYYY, h:mm:ss a")}`}</Text>
              <Text style={styles.textContent}>{`Địa điểm: ${location}`}</Text>
              <Text style={styles.textContent}>{`${interests.length} người quan tâm`}</Text>
            </View>
          </View>

          {/* footer container */}
          <View style={{ flex: 2, flexDirection: "row", justifyContent: "flex-end" }}>
            <Button iconLeft transparent primary onPress={this.goEvent.bind(this)}>
              <Icon
                type="MaterialIcons"
                name={isInterest ? "star" : "star-border"}
                style={{ fontSize: 20, color: colors.PRIMARY }}
              />
              <Text style={{ marginHorizontal: 5 }}>Quan tâm</Text>
            </Button>
          </View>
        </TouchableOpacity>
      </Card>
    );
  }
}

const EventCardWithData = compose(
  connect(
    ({ common, nav }) => ({
      nav: nav,
      orientation: common.orientation
    }),
    dispatch => ({ dispatch })
  ),
  graphql(interestEvent, { name: "goEvent" })
)(EventCard);
export default EventCardWithData;
