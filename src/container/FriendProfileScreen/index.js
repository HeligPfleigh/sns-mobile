import React, { Component } from "react";
import { Content, Text } from "native-base";
import { View, Image } from "react-native";
import Layout from "../../components/Layout";
import styles from "./styles";
import { fakeAvatar } from "../../constants";
import { graphql, compose } from "react-apollo";
import { gql } from "apollo-boost";

class FriendProfile extends Component {
  render() {
    if (this.props.loading) {
      return <ActivityIndicator size="small" color="#00ff00" />;
    }

    if (this.props.error) {
      return <Text>An unexpected error occurred</Text>;
    }

    console.log(this.props);

    return (
      <Layout navigation={this.props.navigation}>
        <Content padder style={{ backgroundColor: "#fff" }}>
          <View style={styles.header}>
            <Text style={{ textAlign: "center", fontSize: 20 }}>{"Thông tin cá nhân"}</Text>
            <Image source={{ fakeAvatar }} style={styles.avatar} />
            <Text />
          </View>
        </Content>
      </Layout>
    );
  }
}

const FriendQuery = gql`
  query user ( $_id : String! ) {
    user ( _id : $_id ) {
      username
      email {
        address
      }
      fullName
    }
  }
`;
const FriendProfileWithData = graphql(FriendQuery, {
  options: (ownProps) => {
    console.log(ownProps.navigation.state.params.id);
    return {
      variables: { _id: ownProps.navigation.state.params.id }
    };
  }
})(FriendProfile);

export default FriendProfileWithData;
