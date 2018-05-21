import React, { Component } from "react";
import { Text, StyleSheet, TouchableOpacity, Image, DatePickerIOS, ScrollView } from "react-native";
import { Button, Icon, View, Body, Input, Picker, Item, ListItem } from "native-base";
import { POST_PRIVACY } from "../../constants";
import ImagePicker from "react-native-image-crop-picker";
import GET_BUILDINGS from "../../graphql/queries/buildings";
import ME_QUERY from "../../graphql/queries/me";
import LIST_EVENT from "../../graphql/queries/listEvent";
import CREATE_NEW_EVENT from "../../graphql/mutations/createNewEvent";
import update from "immutability-helper";
import { graphql, compose, withApollo } from "react-apollo";

class EventSelections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      building: undefined,
      location: "",
      info: "",
      event: "",
      friends: "",
      chosenDateStart: new Date(),
      chosenDateEnd: new Date(),
      invitedFriends: []
    };
  }

  submit() {
    this.props
      .createNewEvent({
        privacy: POST_PRIVACY[this.props.privacyIndex],
        photos: [
          '{"namenode":"snode-01","_id":"5ae98fc68b81ee005934cc75","mimetype":"image/jpeg","originalname":"DE4E1BCE-FEE3-4F74-8D8C-09636EF73244.jpg","path":"/840/11e/c56/1525256134595_5ae98fc68b81ee005934cc75_o.jpg","size":1896240,"createdAt":"2018-05-02T10:15:34.595Z","URL":"https://scontent.mttjsc.com/v/snode-01//840/11e/c56/1525256134595_5ae98fc68b81ee005934cc75_o.jpg"}'
        ],
        name: this.state.event,
        location: this.state.location,
        start: this.state.chosenDateStart,
        end: this.state.chosenDateEnd,
        message:
          '{"entityMap":{},"blocks":[{"key":"2c0b8","text":"mo ta su kien 01","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}',
        invites: this.state.invitedFriends
      })
      .then(res => {
        this.props.close();
      })
      .catch(err => {
        throw err;
      });
  }

  doQuery = async ({ client }) => {
    const i = await this.props.client.query({
      query: ME_QUERY
    });
    await this.setState({
      friends: i.data.me.friends
    });
  }

  add = async (index, username) => {
    let filteredFriends = await this.state.friends.filter((e, i) => {
      return i !== index;
    });
    await this.setState(state => {
      this.state.friends = filteredFriends;
      return state;
    });
    await this.state.invitedFriends.push(username);
  }

  setDateStart(newDate) {
    this.setState({ chosenDateStart: newDate });
  }

  setDateEnd(newDate) {
    this.setState({ chosenDateEnd: newDate });
  }

  onBuildingChange = value => this.setState({ building: value })

  handlePressOpenGalery() {
    const i = ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      multiple: true,
      mediaType: "photo"
    })
      .then(i => {
        this.setState({
          image: i
        });
      })
      .catch(err => {
        throw err;
      });
  }

  render() {
    const { image } = this.state;
    const { getBuildings, getMe } = this.props;

    const uploadImage = this.state.image
      ? this.state.image.map((item, idx) => (
          <Image key={idx} source={{ uri: item.path }} style={{ width: "100%", height: 200, marginVertical: 10 }} />
        ))
      : null;

    let buildingsInfo;
    if (!getBuildings.loading) {
      buildingsInfo = (
        <Picker
          mode="dropdown"
          placeholder="Chạm để chọn toà nhà bạn đang ở"
          selectedValue={this.state.building}
          onValueChange={this.onBuildingChange}
        >
          {getBuildings.buildings.map(item => <Item key={item._id} label={item.name} value={item._id} />)}
        </Picker>
      );
    } else {
      buildingsInfo = <Text>Đang tải thông tin từ server</Text>;
    }
    return (
      <View style={{ margin: 10 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {buildingsInfo}

          <Item inlineLabel>
            <Input placeholder="Ảnh sự kiện :" disabled underlineColorAndroid="rgba(0,0,0,0)" />
          </Item>

          <TouchableOpacity onPress={this.handlePressOpenGalery.bind(this)}>
            <Icon type="MaterialIcons" name="attachment" style={{ fontSize: 30 }} />
          </TouchableOpacity>

          <View>{uploadImage}</View>

          <Item inlineLabel>
            <Input
              value={this.state.event}
              placeholder="Chạm để điền sự kiện"
              onChangeText={value => this.setState({ event: value })}
              underlineColorAndroid="rgba(0,0,0,0)"
            />
          </Item>

          <Item inlineLabel>
            <Input
              value={this.state.location}
              placeholder="Chạm để điền nơi tổ chức"
              onChangeText={value => this.setState({ location: value })}
              underlineColorAndroid="rgba(0,0,0,0)"
            />
          </Item>

          <Item inlineLabel>
            <Input
              value={this.state.info}
              placeholder="Chạm để điền thông tin"
              onChangeText={value => this.setState({ info: value })}
              underlineColorAndroid="rgba(0,0,0,0)"
            />
          </Item>

          <Item inlineLabel>
            <Input disabled placeholder="Ngày bắt đầu :" underlineColorAndroid="rgba(0,0,0,0)" />
          </Item>
          <Item inlineLabel>
            <Input
              value={this.state.chosenDateStart.toString()}
              disabled
              onChangeText={value => this.setState({ info: value })}
              underlineColorAndroid="rgba(0,0,0,0)"
            />
          </Item>

          <DatePickerIOS date={this.state.chosenDateStart} onDateChange={this.setDateStart.bind(this)} />

          <Item inlineLabel>
            <Input disabled placeholder="Ngày kết thúc :" underlineColorAndroid="rgba(0,0,0,0)" />
          </Item>
          <Item inlineLabel>
            <Input
              value={this.state.chosenDateEnd.toString()}
              disabled
              onChangeText={value => this.setState({ info: value })}
              underlineColorAndroid="rgba(0,0,0,0)"
            />
          </Item>
          <DatePickerIOS date={this.state.chosenDateEnd} onDateChange={this.setDateEnd.bind(this)} />

          <Button info style={{ marginLeft: 5 }} onPress={this.doQuery.bind(this)}>
            <Text style={{ color: "white" }}> Mời bạn cùng tham gia </Text>
            <Icon active name="ios-add" style={{ color: "white" }} />
          </Button>

          <View>
            {this.state.friends === ""
              ? null
              : this.state.friends.map((item, index) => {
                  return (
                    <ListItem key={index}>
                      <Body>
                        <Text key={index} style={{ fontSize: 17 }}>
                          {item.username}
                        </Text>
                      </Body>
                      <View>
                        <Button transparent danger onPress={this.add.bind(this, index, item._id)}>
                          <Icon active name="ios-add" />
                        </Button>
                      </View>
                    </ListItem>
                  );
                })}
          </View>

          <Button
            info
            style={{ marginTop: 50, justifyContent: "center", marginLeft: 5 }}
            onPress={this.submit.bind(this)}
          >
            <Text style={{ color: "white" }}> Hoàn tất </Text>
          </Button>

          <View style={{ height: 300 }} />
        </ScrollView>
      </View>
    );
  }
}

const EventSelectionsWithData = compose(
  withApollo,
  graphql(CREATE_NEW_EVENT, {
    props: ({ mutate }) => ({
      createNewEvent: input =>
        mutate({
          variables: { input },

        })
    })
  }),
  graphql(GET_BUILDINGS, {
    name: "getBuildings",
    options: () => ({
      variables: { query: "" }
    })
  })
)(EventSelections);

export default EventSelectionsWithData;
