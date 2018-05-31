import React, { Component } from "react";
import { Text, TouchableOpacity, Image, DatePickerIOS, ScrollView } from "react-native";
import { Button, Icon, View, Input, Item } from "native-base";
import { MEDIA_SERVER } from "../../../constants";
import ImagePicker from "react-native-image-crop-picker";
import ME_QUERY from "../../../graphql/queries/me";
import UPDATE_PROFILE from "../../../graphql/mutations/updateProfile";
import { graphql } from "react-apollo";
import axios from "axios";
import { Keyboard } from "react-native";
import RadioForm from "react-native-simple-radio-button";

const radio_props = [{ label: "nam", value: "nam" }, { label: "nữ", value: "nữ" }];

class SettingOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastName: "",
      firstName: "",
      address: "",
      gender: "male",
      image: null,
      dob: new Date()
    };
  }
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
  setDOB(newDate) {
    this.setState({ dob: newDate });
  }

  submit = async () => {
    let photo = [];
    if (this.state.image) {
      const body = new FormData();
      const url = `${MEDIA_SERVER}/api/upload`;
      this.state.image.forEach(image => {
        let filename = image.path.replace(/^.*[\\\/]/, "");
        let file = {
          uri: image.path,
          name: filename,
          type: image.mime
        };
        body.append("files", file);
      });
      try {
        const response = await axios.post(url, body);
        // store all information get from media server
        photo = await response.data.map(item => item.URL);
      } catch (err) {
        throw err;
      }
    }

    await this.props
      .updateProfile({
        picture: photo,
        gender: this.state.gender,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        dob: this.state.dob
      })
      .then(res => {
        this.props.close();
      })
      .catch(err => {
        throw err;
      });

    Keyboard.dismiss();
  }

  render() {
    const uploadImage = this.state.image
      ? this.state.image.map((item, idx) => (
          <Image key={idx} source={{ uri: item.path }} style={{ width: "100%", height: 200, marginVertical: 10 }} />
        ))
      : null;
    return (
      <ScrollView style={{ margin: 20 }}>
        <Item inlineLabel>
          <Input
            value={this.state.lastName}
            placeholder="Chạm để điền tên họ"
            onChangeText={value => this.setState({ lastName: value })}
            underlineColorAndroid="rgba(0,0,0,0)"
          />
        </Item>
        <Item inlineLabel>
          <Input
            value={this.state.firstName}
            placeholder="Chạm để điền tên"
            onChangeText={value => this.setState({ firstName: value })}
            underlineColorAndroid="rgba(0,0,0,0)"
          />
        </Item>
        <Item inlineLabel>
          <Input
            value={this.state.address}
            placeholder="Chạm để điền địa chỉ"
            onChangeText={value => this.setState({ address: value })}
            underlineColorAndroid="rgba(0,0,0,0)"
          />
        </Item>

        <Item inlineLabel>
          <Input value={this.state.gender} disabled placeholder="Giới tính" underlineColorAndroid="rgba(0,0,0,0)" />
        </Item>
        <RadioForm
          style={{ marginTop: 10 }}
          radio_props={radio_props}
          buttonSize={10}
          initial={1}
          formHorizontal={true}
          labelColor={"black"}
          animation={false}
          onPress={value => {
            this.setState({ gender: value });
          }}
        />
        <Item inlineLabel>
          <Input placeholder="Ảnh đại diện" disabled />
        </Item>

        <TouchableOpacity onPress={this.handlePressOpenGalery.bind(this)}>
          <Icon type="MaterialIcons" name="attachment" style={{ fontSize: 30 }} />
        </TouchableOpacity>
        <View>{uploadImage}</View>

        <Item inlineLabel>
          <Input disabled placeholder="Sinh nhật" underlineColorAndroid="rgba(0,0,0,0)" />
        </Item>
        <DatePickerIOS mode="date" date={this.state.dob} onDateChange={this.setDOB.bind(this)} />
        <Button
          info
          block
          style={{ marginTop: 50, justifyContent: "center", marginLeft: 5 }}
          onPress={this.submit.bind(this)}
        >
          <Text style={{ color: "white" }}> Hoàn tất </Text>
        </Button>
        <View style={{ height: 300 }} />
      </ScrollView>
    );
  }
}

const SettingOptionsWithData = graphql(UPDATE_PROFILE, {
  props: ({ mutate }) => ({
    updateProfile: profile =>
      mutate({
        variables: { profile },
        refetchQueries: [
          {
            query: ME_QUERY
          }
        ]
      })
  })
})(SettingOptions);

export default SettingOptionsWithData;
