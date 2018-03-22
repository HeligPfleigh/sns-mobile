import React from "react";
import Profile from "../index";
// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";

const navigation = { state: jest.fn() };

it("renders correctly", () => {
	const tree = renderer.create(<Profile navigation={navigation} />).toJSON();
	expect(tree).toMatchSnapshot();
});
