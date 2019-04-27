import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isStarted: false,
      questions: [
        { question: "Are you hydrated?", answer: "yes", advice: "If not, have a glass of water" },
        { question: "Have you eaten in the past 3 hours?", answer: "yes", advice: "If not, get some food" },
      ],
      questionNo: 0,
      advice: false,
    }
    this.start = () => {
      this.setState({
        isStarted: true,
      })
    }
    this.answer = (answerValue) => {
      this.number = this.state.questionNo + 1
      if (answerValue == this.state.questions[this.state.questionNo].answer) {
        this.setState({
          questionNo: this.number
        })
      }
      else {
        this.setState({
          advice: true
        })
      }
    }
  }
  render() {


    if (!this.state.isStarted) {
      return (
        <View style={styles.container}>
          <Text>Everything is awful and I'm not okay</Text>
          <Text>Questions to ask before giving up</Text>
          <Button type='outline' color="black" onPress={() => { this.start() }} title='Start'></Button>
        </View>
      )
    }
    else if (this.state.isStarted && !this.state.advice) {
      return (
        <View style={styles.container}>
          <Text>{this.state.questions[this.state.questionNo].question}</Text>
          <Button type='outline' color="black" onPress={() => { this.answer('yes') }} title='yes'></Button>
          <Button type='outline' color="black" onPress={() => { this.answer('no') }} title='no'></Button>
       
        </View>
      )
    }
    else if (this.state.advice) {
      return (
        <View style={styles.container}>
          <Text>{this.state.questions[this.state.questionNo].advice}</Text>       
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
