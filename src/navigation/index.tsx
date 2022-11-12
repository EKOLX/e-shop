import { useEffect } from "react";
import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import * as SplashScreen from "expo-splash-screen";
import { useDispatch, useSelector } from "react-redux";

import { AppState } from "../store/AppState";
import * as authAction from "../store/actions/auth.action";
import AuthScreen from "../screens/auth.screen";
import ProductScreen from "../screens/product.screen";
import CartScreen from "../screens/cart.screen";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function Navigation() {
  const auth = useSelector((state: AppState) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authAction.checkAuth());
      SplashScreen.hideAsync();
    })();
  }, []);

  return (
    <NavigationContainer>
      {auth.user ? (
        <Drawer.Navigator
          drawerContent={(props) => (
            <DrawerContentScrollView
              {...props}
              contentContainerStyle={{ flex: 1 }}
            >
              <SafeAreaView style={{ flex: 1 }}>
                <DrawerItemList {...props} />
                <DrawerItem
                  style={{ marginTop: "auto" }}
                  label="Sign Out"
                  onPress={() => dispatch(authAction.signOut())}
                />
              </SafeAreaView>
            </DrawerContentScrollView>
          )}
        >
          <Drawer.Screen name="Home" component={ProductScreen} />
          <Drawer.Screen name="Cart" component={CartScreen} />
        </Drawer.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Auth"
            component={AuthScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
