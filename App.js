import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { CustomButton } from './components/customButton.js';
import { LongButton } from './components/longButton';

import { Font } from 'expo';

export default class App extends React.Component {
  componentWillMount() {
    this._loadAssetsAsync();
  }

  _loadAssetsAsync = async () => {
    await Font.loadAsync({
      Courier: require('./assets/fonts/courier.ttf'),
    });
    this.setState({ loaded: true });
};
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      isStarted: false,
      isFinished: false,
      questions: [
        { question: "Are you hydrated?", answer: "yes", advice: "If not, have a glass of water." },
        { question: "Have you eaten in the past 3 hours?", answer: "yes", advice: "If not, get some food - something with protein, not just simple carbs. Perhaps some nuts or hummus?" },
        { question: "Have you showered in the past day?", answer: "yes", advice: "If not, take a shower right now." },
        { question: "Have you stretched your legs in the past day?", answer: "yes", advice: "If not, do so right now. If you don't have the energy for a run or trip to the gym, just walk around the block, then keep walking as long as you please. If the weather's crap, drive to a big store and go on a brisk walk through the aisles you normally skip." },
        { question: "Have you said something nice to someone in the past day?", answer: "yes", advice: "Say something nice to someone, whether online or in person. Make it genuine: wait until you see something really wonderful about someone, and tell them about it." },
        { question: "Have you moved your body to music in the past day?", answer: "yes", advice: "If not, jog for the lenght of an EDM song at your favorite tempo, or just dance around the room for the length of an upbeat song." },
        { question: "Have you cuddled a living being in the past two days?", answer: "yes", advice: "If not, do so. Don't be afraid to ask for hugs from your friends or your friends' pets. Most of them will enjoy the cuddles too: you're not imposing on the.m" },
        { question: "Have you seen a therapist in the past few days?", answer: "yes", advice: "If not, hang on until your next therapy visit and talk through things with them." },
        { question: "Have you changed any of your medications in the past couple of weeks, includding skiped doses or a change in generic prescription brand?", answer: "no", advice: "That may be messing with your head. Give things a few days, then talk to your doctor if it doesn't settle down." },
        { question: "If daytime: are you dressed?", answer: "yes", advice: "If not, put on clean clothes that aren't pajamas. Give yourself permission to wear something special, whether it's a funny t-shirt or a pretty dress." },
        { question: "If nighttime: are you sleepy and fatiqued but resisting going to sleep?", answer: "no", advice: "Put on pajamas, make yourself cozy in bed with a teddy bear and the sound of falling rain, and close your eyes for fifteen minutes - no electronic screens allowed. If you're still awake after that, you can get up again; no pressure." },
        { question: "Do you feel ineffective?", answer: "no", advice: "Pause right now and get something small completed, whether it's responding to an e-mail, loading up the dishwasher, or packing your gym bag for the next trip. Good job!" },
        { question: "Do you feel unattractive?", answer: "no", advice: "Take a selfie. Your friends will remind you how great you look, and you'll help fight society's restrictions on what beauty can look like." },
        { question: "Do you feel paralysed by indecision?", answer: "no", advice: "Give yourself ten minutes to sit back and figure out game plan for the day. If a particular decision or problem is still being a roadblock, simply set it aside for now and pick something else that seems doable. Right now, the important part is to break through that stasis, even if it means doing something trivial." },
        { question: "Have you over-excerted yourself lately - physically, emotionally, socially, or intelectually?", answer: "no", advice: "That can take a toll that lingers for days. Give yourself a break in that are, whether it's physical rest, taking time alone, or relaxing with some silly entertainment." },
        { question: "Have you waited a week?", answer: "yes", advice: "Sometimes our perception of life is skewed, and we can't even tell that we're not thinking clearly, and there's no obvious external cause. It happens. Keep yourself going for a full week, whatever it takes, and see if you still feel the same way then." },

      ],
      questionNo: 0,
      advice: false,
    }
    this.start = () => {
      this.setState({
        isStarted: true,
      })
    }
    this.backToQuestions = () => {
       if (this.state.questionNo < 15) {
      this.setState({
        questionNo: this.state.questionNo + 1,
        advice: false
      })
    }
    else {
      this.setState({
        isFinished: true,
        advice: false
      })
    }
    }
    this.answer = (answerValue) => {
      if (answerValue == this.state.questions[this.state.questionNo].answer && (this.state.questionNo < 15)) {
        this.setState({
          questionNo: this.state.questionNo + 1
        })
      }
      else if (answerValue != this.state.questions[this.state.questionNo].answer && (this.state.questionNo < 16)) {
        this.setState({
          advice: true
        })
      }
      else if (this.state.questionNo >= 15) {
        this.setState ({
          isFinished: true
        })
      }
    }
  }
 
  render() {
   if (!this.state.loaded) {
     return (
     <View></View>
      )
   }
    if (!this.state.isStarted && this.state.loaded) {
      return (
        <View style={styles.container}>
          <Text style={styles.titleText}>Everything is awful and I'm not okay</Text>
          <Text style={styles.questionText}>Questions to ask before giving up</Text>
          <CustomButton onPress={() => { this.start() }} title='START'></CustomButton>
        </View>
      )
    }
    else if (this.state.isStarted && !this.state.advice && !this.state.isFinished) {
      return (
        <View style={styles.container}>
          <Text style={styles.questionText}>{this.state.questions[this.state.questionNo].question}</Text>
          <View style={styles.buttonBar}>
            <CustomButton onPress={() => { this.answer('yes') }} title='yes'></CustomButton>
            <CustomButton onPress={() => { this.answer('no') }} title='no'></CustomButton>
          </View>

        </View>
      )
    }
    else if (this.state.advice && this.state.questionNo != 16) {
      return (
        <View style={styles.container}>
          <Text style={styles.questionText}>{this.state.questions[this.state.questionNo].advice}</Text>
           <LongButton onPress={() => { this.backToQuestions() }} title='Back to questions'></LongButton>
        </View>
      )
    }
    else if (this.state.isFinished || this.state.questionNo == 16) {
      return (
      <View style={styles.container}>
          <Text style={styles.questionText}>That is it for today.</Text>
        </View>
      )
    }
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: "center",
    borderLeftWidth: 30,
    borderRightWidth: 30,
    borderColor: 'white'
  },
  titleText: {
    fontSize: 30,
    textAlign: 'center',
    fontFamily: 'Courier',
  },
  questionText: {
    fontSize: 25,
    textAlign: 'center',
    fontFamily: 'Courier'


  },
  buttonBar: {
    flexDirection: 'row',
    alignContent: "space-between",

  },
});
