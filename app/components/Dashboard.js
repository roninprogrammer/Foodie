import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  AsyncStorage,
  FlatList,
  Image,
  View
} from 'react-native';
import {NavigationActions, StackNavigator} from 'react-navigation';
import LogoutButton from '../features/LogoutButton';
import mealData from '../api/meal';
import MealItem from "../features/MealItem";
import firebaseApp from '../config/firebase';
import tracker from '../config/analytics';
import Spinner from 'react-native-loading-spinner-overlay';
import AppStyles from '../config/AppStyles';


export default class Dashboard extends React.Component {
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
            AsyncStorage.clear().then(()=>{
            firebaseApp.auth().signOut().then(()=>{
              navigation.navigate({routeName:'SignedOut'});
                //tracker.trackEvent('Auth', 'User Loggedout');
            }).catch((error)=>{
                console.log(error);
                alert(error);
            })
        })
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
