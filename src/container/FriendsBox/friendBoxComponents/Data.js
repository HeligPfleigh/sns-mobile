import React from "react";
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import { Text, Body, ListItem, Thumbnail } from "native-base";
import { FlatList, TouchableOpacity, StyleSheet, Dimensions } from "react-native";

const Data = ({ data }) => (
  <FlatList
    keyExtractor={() => Math.random()}
    data={data.search}
    renderItem={(item, index) => {
      return (
        <ListItem>
          <TouchableOpacity style={styles.button}>
            <Thumbnail
              square
              source={item.item.profile.picture}
              style={{ height: Dimensions.get("window").height / 8, width: Dimensions.get("window").width / 6 }}
            />

            <Body>
              <Text style={styles.text}> {item.item.username} </Text>
              <Text style={styles.textSmall} note>
                {" "}
                {item.item.building.name}{" "}
              </Text>
            </Body>
          </TouchableOpacity>
        </ListItem>
      );
    }}
  />
);

Data.propTypes = {
  text: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  button: {
    margin: 5,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 8,
    flexDirection: "row"
  },
  text: {
    fontSize: 17,
    padding: 10
  },
  textSmall: {
    fontSize: 13,
    padding: 10
  }
});

const SearchQuery = gql`
  query SearchQuery($keyword: String!) {
    search(keyword: $keyword) {
      username
      profile {
        picture
      }
      building {
        name
      }
    }
  }
`;

export default graphql(SearchQuery, {
  options(ownProps) {
    return {
      variables: {
        keyword: ownProps.text
      }
    };
  }
})(Data);
