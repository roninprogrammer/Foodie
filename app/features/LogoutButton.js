import React from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";

class LogoutButton extends React.Component {

    constructor(props) {
        super(props);
        this.handleNavigate = this.handleNavigate.bind(this);
    }


    handleNavigate = () => {
        this.props.onPress();
    };


    render() {
        return (
            <TouchableOpacity onPress={this.handleNavigate}>
                <Image
                    style={{ width: 32, height: 32, marginRight: 16 }}
                    source={require('../../assets/image/logout.png')}
                />
            </TouchableOpacity>
        );
    }
}

export default LogoutButton;