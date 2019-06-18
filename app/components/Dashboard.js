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
    this.state = {
      loading: false,
    };
  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Foodie",
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        backgroundColor: 'white'
     
      },
      headerTitleStyle: { color: '#ff5a66' },
      headerRight: (
        <LogoutButton
          onPress={() => {
            this.state = {
              loading: true,
            };
            navigation.navigate("Login");
            AsyncStorage.clear().then(() => {
              firebaseApp.auth().signOut().then(() => {
                alert("Sign Off");
                this.state = {
                  loading: false,
                };
              }).catch((error) => {
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
        <Spinner

          visible={this.state.loading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
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
