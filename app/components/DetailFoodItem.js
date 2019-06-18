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

export default class DetailFood extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: false,
        };
      }
}