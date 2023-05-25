import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/home/index';
import LoginScreen from './screens/login/index';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer> 
      <Stack.Navigator initialRouteName='Home' >
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Login' component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
