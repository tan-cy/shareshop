import * as React from "react";
import { Button, StyleSheet, Text, View, SafeAreaView } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { ItemInputComponent } from "./ItemInputComponent";

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flex: 1,
    backgroundColor: "#ffffcc",
  },

  titles: {
    padding: 20,
    fontSize: 30,
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignSelf: "center",
    width: "90%",
  },

  totalButton: {
    paddingBottom: 50,
    paddingEnd: 20,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    position: "absolute",
    right: 0,
    bottom: 0,
  },

  cartItems: {
    paddingTop: 10,
    paddingLeft: 30,
    fontSize: 15,
  },

  add: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
});

const Stack = createStackNavigator();

function CartScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titles}>Cart</Text>
      <View style={styles.container}>
        <ItemInputComponent> Add an item. </ItemInputComponent>
      </View>
      <View style={styles.totalButton}>
        <Button
          color="#00FA9A"
          title="Calculate Totals"
          onPress={() => navigation.navigate("Totals")}
        />
      </View>
    </SafeAreaView>
  );
}

function TotalsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titles}>Totals</Text>
    </SafeAreaView>
  );
}

const Main = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Cart">
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Totals" component={TotalsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export { Main };
