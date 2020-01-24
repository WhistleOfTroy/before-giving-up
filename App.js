import React from 'react';
import { StyleSheet, Text, View, Image, Switch, ImageBackground } from 'react-native';
import { CustomButton } from './components/customButton.js';
import { LongButton } from './components/longButton';
import { AsyncStorage } from 'react-native';

import * as Font  from 'expo-font';

export default class App extends React.Component {
  UNSAFE_componentWillMount() {
    this._loadAssetsAsync();
    this._retrieveData();
  }

  _loadAssetsAsync = async () => {
    await Font.loadAsync({
      Courier: require('./assets/fonts/courier.ttf'),
    });
    this.setState({ loaded: true });
  };
  _storeData = async () => {
    try {
      await AsyncStorage.setItem('darkMode', this.state.darkMode);
      console.log(this.state.darkMode)
    } catch (error) {
      // Error saving data
    }
  };
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('darkMode');
      if (value !== null) {
        // We have data!!
        console.log(value);
        this.setState({ darkMode: value })
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      darkMode: false,
      loaded: false,
      isStarted: false,
      isFinished: false,
      questions: [
        { question: "Are you hydrated?", answer: "yes", image: require('./assets/icons/water.png'), advice: "If not, have a glass of water." },
        { question: "Have you eaten in the past 3 hours?", answer: "yes", image: require('./assets/icons/food.png'), advice: "If not, get some food - something with protein, not just simple carbs. Perhaps some nuts or hummus?" },
        { question: "Have you showered in the past day?", answer: "yes", image: require('./assets/icons/shower.png'), advice: "If not, take a shower right now." },
        { question: "Have you stretched your legs in the past day?", answer: "yes", image: require('./assets/icons/walk.png'), advice: "If not, do so right now. If you don't have the energy for a run or trip to the gym, just walk around the block, then keep walking as long as you please. If the weather's crap, drive to a big store and go on a brisk walk through the aisles you normally skip." },
        { question: "Have you said something nice to someone in the past day?", answer: "yes", image: require('./assets/icons/say.png'), advice: "Say something nice to someone, whether online or in person. Make it genuine: wait until you see something really wonderful about someone, and tell them about it." },
        { question: "Have you moved your body to music in the past day?", answer: "yes", image: require('./assets/icons/music.png'), advice: "If not, jog for the lenght of an EDM song at your favorite tempo, or just dance around the room for the length of an upbeat song." },
        { question: "Have you cuddled a living being in the past two days?", answer: "yes", image: require('./assets/icons/friends.png'), advice: "If not, do so. Don't be afraid to ask for hugs from your friends or your friends' pets. Most of them will enjoy the cuddles too: you're not imposing on the.m" },
        { question: "Have you seen a therapist in the past few days?", answer: "yes", image: require('./assets/icons/therapy.png'), advice: "If not, hang on until your next therapy visit and talk through things with them." },
        { question: "Have you changed any of your medications in the past couple of weeks, includding skiped doses or a change in generic prescription brand?", answer: "no", image: require('./assets/icons/meds.png'), advice: "That may be messing with your head. Give things a few days, then talk to your doctor if it doesn't settle down." },
        { question: "If daytime: are you dressed?", answer: "yes", image: require('./assets/icons/clothes.png'), advice: "If not, put on clean clothes that aren't pajamas. Give yourself permission to wear something special, whether it's a funny t-shirt or a pretty dress." },
        { question: "If nighttime: are you sleepy and fatiqued but resisting going to sleep?", answer: "no", image: require('./assets/icons/night.png'), advice: "Put on pajamas, make yourself cozy in bed with a teddy bear and the sound of falling rain, and close your eyes for fifteen minutes - no electronic screens allowed. If you're still awake after that, you can get up again; no pressure." },
        { question: "Do you feel ineffective?", answer: "no", image: require('./assets/icons/clock.png'), advice: "Pause right now and get something small completed, whether it's responding to an e-mail, loading up the dishwasher, or packing your gym bag for the next trip. Good job!" },
        { question: "Do you feel unattractive?", answer: "no", image: require('./assets/icons/person.png'), advice: "Take a selfie. Your friends will remind you how great you look, and you'll help fight society's restrictions on what beauty can look like." },
        { question: "Do you feel paralysed by indecision?", answer: "no", image: require('./assets/icons/question.png'), advice: "Give yourself ten minutes to sit back and figure out game plan for the day. If a particular decision or problem is still being a roadblock, simply set it aside for now and pick something else that seems doable. Right now, the important part is to break through that stasis, even if it means doing something trivial." },
        { question: "Have you over-excerted yourself lately - physically, emotionally, socially, or intelectually?", answer: "no", image: require('./assets/icons/jigsaw.png'), advice: "That can take a toll that lingers for days. Give yourself a break in that are, whether it's physical rest, taking time alone, or relaxing with some silly entertainment." },
        { question: "Have you waited a week?", answer: "yes", image: require('./assets/icons/calendar.png'), advice: "Sometimes our perception of life is skewed, and we can't even tell that we're not thinking clearly, and there's no obvious external cause. It happens. Keep yourself going for a full week, whatever it takes, and see if you still feel the same way then." },

      ],
      questionNo: 0,
      advice: false,
    }
    this.start = () => {
      this.setState({
        isStarted: true,
      })
    }
    this.restart = () => {
      this.setState({
        isStarted: false,
        questionNo: 0,
        advice: false,
        isFinished: false,
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
    this.toggleTheme = (value) => {
      this.setState({ darkMode: value })
      this._storeData();
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
        this.setState({
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
        <View style={this.state.darkMode ? darkStyles.container : styles.container}>
          <ImageBackground source={this.state.darkMode? require('./assets/darkwatercolor.jpg') : require('./assets/watercolor.jpg')} style = {{witdh:'100%', height:'100%'}} imageStyle={{resizeMode: 'stretch'}}>
          <View style={this.state.darkMode ? darkStyles.container : styles.container}>
            <Text style={this.state.darkMode ? darkStyles.titleText : styles.titleText}>Everything is awful and I'm not okay</Text>
            <View style={styles.paddingView}></View>
            <Text style={this.state.darkMode ? darkStyles.questionText : styles.questionText}>Questions to ask before giving up</Text>
            <View style={styles.paddingView}></View>
            <CustomButton onPress={() => { this.start() }} title='START' darkMode={this.state.darkMode}></CustomButton>
          </View>
          <View style={this.state.darkMode ? darkStyles.themeContainer : styles.themeContainer}>
            <View style={styles.buttonBar}>
              <Text style={this.state.darkMode ? darkStyles.themeText : styles.themeText}> Dark theme</Text>
              <Switch
              trackColor= {{true: 'grey'}}
              thumbColor = '#181b21'
                onValueChange={value => this.setState({ darkMode: value })}
                value={this.state.darkMode}
              ></Switch>
            </View>
          </View>
          </ImageBackground>
        </View>
      )
    }
    else if (this.state.isStarted && !this.state.advice && !this.state.isFinished) {
      return (
        <ImageBackground source={this.state.darkMode? require('./assets/darkwatercolor.jpg') : require('./assets/watercolor.jpg')} style = {{witdh:'100%', height:'100%', justifyContent: 'center', alignItems: 'center', alignContent: 'center'}} imageStyle={{resizeMode: 'stretch'}}>
        <View style={this.state.darkMode ? darkStyles.container : styles.container}>
          
          <Image
            source={this.state.questions[this.state.questionNo].image}
            style={styles.image}
          />
          <View style={styles.paddingView}></View>
          <Text style={this.state.darkMode ? darkStyles.questionText : styles.questionText}>{this.state.questions[this.state.questionNo].question}</Text>
          <View style={styles.paddingView}></View>
          <View style={styles.buttonBar}>
            <CustomButton darkMode={this.state.darkMode} onPress={() => { this.answer('yes') }} title='yes'></CustomButton>
            <CustomButton darkMode={this.state.darkMode} onPress={() => { this.answer('no') }} title='no'></CustomButton>
          </View>
        </View>
        </ImageBackground>

      )
    }
    else if (this.state.advice && this.state.questionNo != 16) {
      return (
        <ImageBackground source={this.state.darkMode? require('./assets/darkwatercolor.jpg') : require('./assets/watercolor.jpg')} style = {{witdh:'100%', height:'100%', justifyContent: 'center', alignItems: 'center', alignContent: 'center'}} imageStyle={{resizeMode: 'stretch'}}>
        <View style={this.state.darkMode ? darkStyles.container : styles.container}>
          <Text style={this.state.darkMode ? darkStyles.questionText : styles.questionText}>{this.state.questions[this.state.questionNo].advice}</Text>
          <View style={styles.paddingView}></View>
          <LongButton darkMode={this.state.darkMode} onPress={() => { this.backToQuestions() }} title='Back to questions'></LongButton>
        </View>
        </ImageBackground>
      )
    }
    else if (this.state.isFinished || this.state.questionNo == 16) {
      return (
        <ImageBackground source={this.state.darkMode? require('./assets/darkwatercolor.jpg') : require('./assets/watercolor.jpg')} style = {{witdh:'100%', height:'100%', justifyContent: 'center', alignItems: 'center', alignContent: 'center'}} imageStyle={{resizeMode: 'stretch'}}>
        <View style={this.state.darkMode ? darkStyles.container : styles.container}>
          <Text style={this.state.darkMode ? darkStyles.questionText : styles.questionText}>That is it for today.</Text>
          <View style={styles.paddingView}></View>
          <LongButton darkMode={this.state.darkMode} onPress={() => this.restart()} title='Restart' />
        </View>
        </ImageBackground>
      )
    }
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 7,
    width:'100%',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: "center"
  },
  paddingView: {
    height: 30,
  },
  themeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  themeText: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Courier'
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
  image: {
    width: 100,
    height: 100
  },
  buttonBar: {
    flexDirection: 'row',
    alignContent: "space-between",
  },
});
const darkStyles = StyleSheet.create({
  container: {
    flex: 7,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: "center",
  },
  themeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  themeText: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Courier',
    color: "white",
  },
  titleText: {
    fontSize: 30,
    textAlign: 'center',
    fontFamily: 'Courier',
    color: "white",
  },
  questionText: {
    fontSize: 25,
    textAlign: 'center',
    fontFamily: 'Courier',
    color: "white",
  },
  image: {
    width: 100,
    height: 100
  },
  buttonBar: {
    flexDirection: 'row',
    alignContent: "space-between",
  },
});
