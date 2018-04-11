import React, { Component } from "react";
import { Content, Header, Icon, Left, Button, Body, Title, Right, Container } from "native-base";
import { ActivityIndicator } from "react-native";
import Layout from "../../components/Layout";
import styles from "./styles";
import { graphql } from "react-apollo";
import { gql } from "apollo-boost";
import Wall from "./Details/Wall";

class FriendProfile extends Component {
  render() {
    if (this.props.loading) {
      return <ActivityIndicator style={{ justifyContent: "center" }} />;
    }

    if (this.props.data.user) {
      const info = this.props.data.user;
      return (
        <Layout navigation={this.props.navigation} style={styles.container}>
          <Container>
            <Header>
              <Left>
                <Button transparent onPress={() => this.props.navigation.goBack()}>
                  <Icon name="ios-arrow-back" />
                </Button>
              </Left>
              <Body>
                <Title style={{ fontSize: 15 }}> Thông tin cá nhân </Title>
              </Body>
              <Right>
                <Button transparent onPress={() => this.props.navigation.goBack()}>
                  <Icon name="md-settings" />
                </Button>
              </Right>
            </Header>
            <Content padder style={{ backgroundColor: "#fff" }}>
              <Wall info={info} />
            </Content>
          </Container>
        </Layout>
      );
    }
    return <ActivityIndicator style={{ justifyContent: "center" }} />;
  }
}

const FriendQuery = gql`
  query user($_id: String!) {
    user(_id: $_id) {
      _id
      username
      totalFriends
      isFriend
      posts {
        _id
        message
        messagePlainText
        totalLikes
        totalComments
        author {
          username
          profile {
            picture
          }
          username
          _id
        }
        comments {
          message
          messagePlainText
          totalReply
          parent
          createdAt
          updatedAt
        }
        isLiked
        createdAt
        updatedAt
      }
      phone {
        number
      }
      profile {
        picture
        gender
        dob
        address
      }
      email {
        address
      }
      building {
        name
      }
    }
  }
`;
const FriendProfileWithData = graphql(FriendQuery, {
  options: ownProps => {
    return {
      variables: { _id: ownProps.navigation.state.params.id }
    };
  }
})(FriendProfile);

export default FriendProfileWithData;
