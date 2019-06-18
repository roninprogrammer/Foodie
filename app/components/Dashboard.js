import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  FlatList,
  Image,
  View
} from 'react-native';
import LogoutButton from '../features/LogoutButton';
import mealData from '../api/meal';
import MealItem from "../features/MealItem";


export default class Restaurants extends React.Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Foodie",
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0
      },
      headerRight: (
        <LogoutButton
          onPress={() => {
            navigation.navigate("Cart");
          }}
        />
      )
    };
  };
  handleNaviagation = () => {
    this.props.navigation.navigate("Dishes");
  };
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={mealData}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <MealItem
              name={item.name}
              image={item.image}
              description={item.description}
              calories={item.calories}
              handleNaviagation={this.handleNaviagation}
            />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 8,
    marginBottom: 8
  }
});
