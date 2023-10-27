import React, { useState, useRef ,useEffect} from 'react';
import { PixelRatio, StyleSheet, Text, View, PanResponder, Animated, TouchableOpacity } from 'react-native';
import Styles from '../Styles/Styles';
import {firebase} from '../config'
import { useNavigation } from '@react-navigation/native';
const REACTIONS = [
  { label: "Worst", src: require('../assets/worried.png'), bigSrc: require('../assets/worried_big.png') },
  { label: "Not Good", src: require('../assets/sad.png'), bigSrc: require('../assets/sad_big.png') },
  { label: "Fine", src: require('../assets/ambitious.png'), bigSrc: require('../assets/ambitious_big.png') },
  { label: "Happy", src: require('../assets/smile.png'), bigSrc: require('../assets/smile_big.png') },
  { label: "Superb", src: require('../assets/surprised.png'), bigSrc: require('../assets/surprised_big.png') },
];
const WIDTH = 350;
const DISTANCE =  WIDTH / REACTIONS.length;
const END = WIDTH - DISTANCE;



const Feedback = ({route}) => {
  const navigation = useNavigation();
   
  const updateOverallRating = () => {
    const database = firebase.database();
    const busesRef = database.ref("buses");
    const usersRef = database.ref("users");
    
    const busNumber = route.params?.data;
    const userId = firebase.auth().currentUser.uid;

    // Update the "overallRating" for the specific bus
    busesRef.orderByChild("busNo").equalTo(busNumber).on("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        const busKey = childSnapshot.key;
        const newRating = 5; // Replace with your desired rating

        busesRef.child(busKey).update({ overallRating: newRating })
          .then(() => {
            console.log('Overall rating updated successfully.');

            // After updating the rating, update the coins
            // First, fetch the current user's coins value
            usersRef.child(userId).once("value", function(userSnapshot) {
              const userCoins = userSnapshot.val().coins;
              
              // Perform your desired logic to update the coins
              const newCoins = userCoins + 1; 
              // Update the coins value in the user's profile
              usersRef.child(userId).update({ coins: newCoins })
                .then(() => {
                  console.log('Coins updated successfully.');
                  navigation.navigate('MyList'); 

                })
                .catch((error) => {
                  console.error('Error updating coins:', error);
                });
            });
          })
          .catch((error) => {
            console.error('Error updating overall rating:', error);
          });
      });
    });
  };
 
  const [feedback, setFeedback] = useState(3);
  const _pan = useRef(new Animated.Value(2 * DISTANCE)).current;
  const _panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (e, gestureState) => {
        _pan.setOffset(_pan._value);
        _pan.setValue(0);
      },
      onPanResponderMove: Animated.event([null, { dx: _pan }], { useNativeDriver: false }),

      onPanResponderRelease: () => {
        _pan.flattenOffset();

        let offset = Math.max(0, _pan._value + 0);
        if (offset < 0) return _pan.setValue(0);
        if (offset > END) return _pan.setValue(END);

        const modulo = offset % DISTANCE;
        offset = (modulo >= DISTANCE/2) ? (offset+(DISTANCE-modulo)) : (offset-modulo);

        updatePan(offset);
      }
    })
  ).current;

  useEffect(() => {
    console.log(feedback);
  }, [feedback]);

  const updatePan = (toValue) => {
    Animated.spring(_pan, { toValue, friction: 7, useNativeDriver: false }).start();;
    const selectedEmoji = Math.round(toValue / DISTANCE); // Calculate the selected emoji index
    // Map the selected index to the range [1, 5]
    const feedbackValue = Math.min(5, Math.max(1, selectedEmoji + 1));
    setFeedback(feedbackValue); // Update the feedback state
    console.log(feedbackValue);
  }

  return (
    <View style={styles.container}>
      <View style={styles.wrap}>
        <Text style={styles.welcome}>
        Share your experience in scaling
        </Text>

        <View style={styles.line} />

        <View style={styles.reactions}>
          {REACTIONS.map((reaction, idx) => {
            const u = idx * DISTANCE;
            let inputRange = [u-20, u, u+20];
            let scaleOutputRange = [1, 0.25, 1];
            let topOutputRange = [0, 10, 0];
            let colorOutputRange = ['#999', '#222', '#999'];

            if (u-20 < 0) {
              inputRange = [u, u+20];
              scaleOutputRange = [0.25, 1];
              topOutputRange = [10, 0];
              colorOutputRange = ['#222', '#999'];
            }

            if (u+20 > END) {
              inputRange = [u-20, u];
              scaleOutputRange = [1, 0.25];
              topOutputRange = [0, 10];
              colorOutputRange = ['#999', '#222'];
            }

            return (
              <TouchableOpacity onPress={() => updatePan(u)} activeOpacity={0.9} key={idx}>
                <View style={styles.smileyWrap}>
                  <Animated.Image
                    source={reaction.src}
                    style={[styles.smiley, {
                      transform: [{
                        scale: _pan.interpolate({
                          inputRange,
                          outputRange: scaleOutputRange,
                          extrapolate: 'clamp',
                        })
                      }]
                    }]}
                    
                  />
                </View>

                <Animated.Text style={[styles.reactionText, {
                  top: _pan.interpolate({
                    inputRange,
                    outputRange: topOutputRange,
                    extrapolate: 'clamp',
                  }),
                  color: _pan.interpolate({
                    inputRange,
                    outputRange: colorOutputRange,
                    extrapolate: 'clamp',
                  })
                }]}>
                  {reaction.label}
                </Animated.Text>
              </TouchableOpacity>
            );
          })}
          <Animated.View {..._panResponder.panHandlers} style={[styles.bigSmiley, {
            transform: [{
              translateX: _pan.interpolate({
                inputRange: [0, END],
                outputRange: [0, END],
                extrapolate: 'clamp',
              })
            }]
          }]}>
            {REACTIONS.map((reaction, idx) => {
              let inputRange = [(idx-1)*DISTANCE, idx*DISTANCE, (idx+1)*DISTANCE];
              let outputRange = [0, 1, 0];

              if (idx == 0) {
                inputRange = [idx*DISTANCE, (idx+1)*DISTANCE];
                outputRange = [1, 0];
              }

              if (idx == REACTIONS.length - 1) {
                inputRange = [(idx-1)*DISTANCE, idx*DISTANCE];
                outputRange = [0, 1];
              }
              return (
                <Animated.Image
                  key={idx}
                  source={reaction.bigSrc}
                  style={[styles.bigSmileyImage, {
                    opacity: _pan.interpolate({
                      inputRange,
                      outputRange,
                      extrapolate: 'clamp',
                    })
                  }]}
                />
              );
            })}
          </Animated.View>
        </View>
        <View style ={{alignItems:'center'}}>
        <TouchableOpacity  style={Styles.button} onPress={updateOverallRating}>
          <Text style={{ fontSize: 22, fontWeight: 'bold',color:"#FFFFFF" }}>
            Share
          </Text>
        </TouchableOpacity>

        </View>
        
      </View>
     

    </View>
  );
};

const size = 50;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F2E9E4',
    justifyContent:'center'
  },
  wrap: {
    width: WIDTH,
    marginBottom: 50,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    marginTop:50,
    color: '#777',
    fontWeight: '600',
    marginBottom: 50,
    color:'#22223B'
  },
  reactions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  smileyWrap: {
    width: DISTANCE,
    height: DISTANCE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smiley: {
    width: size,
    height: size,
    borderRadius: size/2,
    backgroundColor: '#c7ced3',
  },
  bigSmiley: {
    width: DISTANCE,
    height: DISTANCE,
    borderRadius: DISTANCE/2,
    backgroundColor: '#ffb18d',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  bigSmileyImage: {
    width: DISTANCE,
    height: DISTANCE,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  reactionText: {
    fontSize: 14,
    color:'#105955',
    textAlign: 'center',
    color: '#999',
    fontWeight: '400',
    marginTop: 5,
    fontWeight:'bold'
  },
  line: {
    height: 4 / PixelRatio.get(),
    backgroundColor: '#eee',
    width: WIDTH - (DISTANCE-size),
    left: (DISTANCE-size) / 2,
    top: DISTANCE/2 + (2 / PixelRatio.get()),
  }
});

export default Feedback;
