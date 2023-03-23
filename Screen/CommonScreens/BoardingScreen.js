import React, { useState } from 'react';
import { StyleSheet, Text, View , Image} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

const OnboardingScreens = [
  {
    title: 'Welcome to Event Mate \n\n Manage Your any event with us...\n',
    subtitle: 'Manage Your any event with us...',
    image: <Image source={require('../../assets/boarding3.jpg')} /> ,
    backgroundColor: '#F5A623',
  },
  {
    title: 'Get Started \n\n Let\'s get started and start event planning...\n',
    subtitle: 'Let\'s get started and start event planning...',
    image: <Image source={require('../../assets/boarding1.jpg')} />,
    backgroundColor: '#F67B70',
  },
  {
    title: 'Ready to Go\n \n You are all set and ready to plan your awesome events!\n',
    subtitle: 'You are all set and ready to plan your awesome events!',
    image: <Image source={require('../../assets/boarding2.jpg')} />,
    backgroundColor: '#678FB4',
  },
];


const OnboardingScreen = ({ navigation }) => {
  const [showOnboarding, setShowOnboarding] = useState(true);

  const handleFinishOnboarding = () => {
    setShowOnboarding(false);
    navigation.navigate('LoginScreen');
  };

  return (
      <Onboarding
      pages={OnboardingScreens}
      onDone={handleFinishOnboarding}
      showSkip={true}
      showNext={true}
      bottomBarColor={'transparent'}
      titleStyles={styles.title}
      subTitleStyles={styles.subtitle}
      imageContainerStyles={styles.imageContainer}
      imageStyles={styles.image}
      dotContainerStyles={styles.dotContainer}
      nextLabel={'Next'}
      skipLabel={'Skip'}
      onSkip={() => setShowOnboarding(false)}
      onFinish={() => setShowOnboarding(false)}
    />
  );
};

const styles = StyleSheet.create({
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'normal',
    marginBottom: 20,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
  },
  dotContainer: {
    position: 'absolute',
    bottom: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OnboardingScreen;
 
