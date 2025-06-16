import {NavigationContainer} from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./src/Pages/Home";
import Clima from "./src/Pages/Clima"

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
        name="Home" 
        component={Home} 
        options={{
         headerShown: false
        }}
        />
        <Stack.Screen
          name="Clima"
          component={Clima}
          options={{
           headerShown:false,
          }}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
