import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/home/index';
import LoginScreen from './screens/login/index';


const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer> 
      <Stack.Navigator initialRouteName='Login' >
        <Stack.Screen name='Login' component={LoginScreen} options={{gestureEnabled: false, headerShown: false}} />
        <Stack.Screen name='Home' component={HomeScreen} options={{gestureEnabled: false, headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;



