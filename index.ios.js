/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
  TouchableWithoutFeedback,
} from 'react-native';
import Animation from 'lottie-react-native';

export default class wot extends Component {

  animationProgress: Animated.Value

  state: {
    bookmarked: boolean
  }

  constructor() {
    super();
    this.animationProgress = new Animated.Value(0);

    this.state = {
      bookmarked: false,
    };
  }

  componentDidMount() {
    this.playAnimation();
  }

  playAnimation() {
    this.animationProgress.setValue(0);
    Animated.timing(this.animationProgress, {
      toValue: 1,
      duration: 5000,
    }).start(() => this.playAnimation());
  }

  pressIn = () => {
    if (this.state.bookmarked) {
      this.animationProgress.setValue(1);
    } else {
      this.animationProgress.setValue(0.285);
    }
  }

  press = () => {
    if (this.state.bookmarked) {
      this.animationProgress.setValue(0);
    } else {
      Animated.timing(this.animationProgress, {
        toValue: 1,
        duration: 1000,
        easing: Easing.ease,
      }).start();
    }
    this.setState({ bookmarked: !this.state.bookmarked });
  }

  pressOut = () => {
    // this.animationProgress.setValue(Number(!this.state.bookmarked));
  }

  render() {

    const rotate = this.animationProgress.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    })

    const translateX = this.animationProgress.interpolate({
      inputRange: [0, 1],
      outputRange: [-100, 100],
    });

    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'pink'
        }}
      >
        <Animated.View
          style={{
            backgroundColor: 'green',
            transform: [
              { rotate }, 
              { translateX },
            ],
          }}
        >
          <Animation 
            style={{
              height: 100,
              width: 100,
            }}
            source={require('./animations/smile1.json')}
            progress={this.animationProgress}
          />

        </Animated.View>
      </View>
    )
    // return (
    //   <View style={styles.container}>
    //     <TouchableWithoutFeedback
    //       onPressIn={this.pressIn}
    //       onPress={this.press}
    //       onPressOut={this.pressOut}
    //       delayPressOut={1000}
    //       style={{
    //         flex: 1,
    //       }}
    //     >
    //       <Animation
    //         source={require('./animations/test.json')}
    //         style={{
    //           justifyContent: 'center',
    //           width: 400,
    //           height: 400,
    //         }}
    //         progress={this.animationProgress}
    //       />
    //     </TouchableWithoutFeedback>
    //   </View>
    // );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

AppRegistry.registerComponent('wot', () => wot);
