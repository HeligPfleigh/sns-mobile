import React, { Component } from "react";
import { Dimensions, Animated, Easing, TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "native-base";

const { width, height } = Dimensions.get("window");

const emptyFn = ()=>{};

class PhotoViewer extends Component{
  static defaultProps = {
    onClose: emptyFn
  }

  constructor(props){
    super(props);
    this.animatedValue = new Animated.Value(0);
  }

  componentDidMount(){
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 400,
      easing: Easing.in
    }).start();
  }

  onPressBtn = () => {
    this.props.onClose();
  }

  render(){
    const { image, position } = this.props;
    const top = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [position.pageY, height / 2 - position.height / 2],
    });
    const opacity = this.animatedValue;
    return (
      <Animated.View style={[styles.main, {opacity}]}>
        <Animated.Image source={{uri: image}} style={[styles.image, {top, opacity}]}/>
        <TouchableOpacity style={styles.closeBtn} onPress={this.onPressBtn}>
          <Icon type="MaterialIcons" name="close" style={{ fontSize: 30, color: "white" }} />
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  main:{
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000",
    zIndex: 2,
  },
  image:{
    width,
    height: 300
  },
  closeBtn:{
    position: "absolute",
    top: 20,
    right: 20,
  },
});

export default PhotoViewer;
