import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import { colors } from "../../constants";

const styles = StyleSheet.create({
  singleImageContainer: {
    width: "100%",
    height: 300,
    margin: 2,
  },
  multiImagesContainer: {
    height: 300,
    width:"100%",
  },
});

class FeedCardPhotos extends Component{
  render(){
    const { photos } = this.props;

    if (!photos || !photos.length) { return null; }

    if (photos.length === 1) {
      return <Image source={{uri: JSON.parse(photos[0]).URL}} style={styles.singleImageContainer}/>;
    }

    if (photos.length === 2) {
      return (
        <View style={styles.multiImagesContainer}>
          <Image source={{uri: JSON.parse(photos[0]).URL}} style={{width: "100%", height: "60%", margin: 2}}/>
          <View style={{width: "100%", height: "40%", margin: 2, backgroundColor: colors.LIGHT_GRAY, justifyContent:"center", alignItems:"center"}}>
            <Text style={{color: colors.WHITE, fontSize: 20}}> +1 </Text>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.multiImagesContainer}>
        <Image source={{uri: JSON.parse(photos[0]).URL}} style={{width: "100%", height: "60%", margin: 2}}/>
        <View style={{width: "100%", height: "40%", margin: 2, flexDirection:"row"}}>
          <Image source={{uri: JSON.parse(photos[1]).URL}} style={{width: "60%", height: "100%"}}/>
          <View style={{width: "40%", height: "100%", backgroundColor: colors.LIGHT_GRAY, justifyContent:"center", alignItems:"center"}}>
            <Text style={{color: colors.WHITE, fontSize: 20}}> +{photos.length - 2} </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default FeedCardPhotos;
