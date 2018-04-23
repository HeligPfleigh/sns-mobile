import React, { Component } from "react";
import { Dimensions, View, TouchableOpacity, Image, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

const emptyFn = () => {};

class PostContainer extends Component{
  static defaultProps = {
    onPress: emptyFn,
  }

  onPressImage = (event) => {
    const {onPress, image} = this.props;
    this.main.measure((fx, fy, height, pageX, pageY) => {
      onPress(image, {
        width, height, pageX, pageY
      });
    });
  }

  render(){
    const { image } = this.props;
    return (
      <View style={styles.main} ref={main => (this.main = main)}>
        <TouchableOpacity
          onPress={this.onPressImage}
          activeOpacity={0.9}>
          <Image source={{uri: image}}
            style={styles.image}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main:{
    backgroundColor: "#fff",
    marginBottom: 30,
    paddingBottom: 10,
  },
  content:{
    flex: 1,
  },
  image:{
    width,
    height: 300,
  },
  title:{
    margin: 10,
    color: "#ccc"
  }
});

export default PostContainer;
