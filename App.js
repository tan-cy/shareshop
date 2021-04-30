import React, { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { CartComponent } from "./components/CartComponent";
import { AddGroupsComponent } from "./components/AddGroupsComponent";
import Icon from "react-native-vector-icons/FontAwesome";

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    backgroundColor: "#ffffcc",
    height: "100%",
  },
  cart: {
    marginTop: 20,
    alignSelf: "center",
    width: "90%",
    height: "90%",
  },
  totalButton: {
    backgroundColor: "#00FA9A",
    marginRight: 20,
    marginBottom: 20,
    color: "black",
    borderRadius: 10,
  },
  buttonText: {
    padding: 10,
    color: "black",
    fontSize: 16,
    opacity: 0.5,
  },
  buttons: {
    justifyContent: "space-between",
    alignContent: "flex-end",
    flexDirection: "row",
    width: "100%",
  },
  totalList: {
    paddingTop: 20,
    alignSelf: "center",
    justifyContent: "center",
    width: "90%",
    paddingBottom: 100,
  },
  totalItems: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 7,
    fontSize: 16,
    width: "90%",
    alignContent: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

const Stack = createStackNavigator();

const CartScreen = (props) => {
  // keep track of groups & prices in each group
  const [groups, setGroups] = useState([
    { groupTotal: 0.0, id: "All", item: "All", icon: "" },
  ]);
  const addPriceToGroup = (group, price) => {
    price /= group.length;
    for (var i = 0; i < group.length; i++) {
      for (var j = 0; j < groups.length; j++) {
        if (groups[j].id == group[i].id) {
          groups[j].groupTotal += price;
          break;
        }
      }
    }
  };

  const addGroup = (groupName) => {
    const groupNameNoSpace = groupName.replace(/\s/g, "");
    if (
      groupNameNoSpace != "" &&
      !groups.find((item) => item.id == groupNameNoSpace)
    ) {
      const newGroups = [
        ...groups,
        { groupTotal: 0.0, id: groupName, item: groupName, icon: deleteButton },
      ];
      setGroups(newGroups);
    }
  };

  const removeGroup = (groupName) => {
    setGroups(groups.filter((item) => item.id != groupName));
  };

  const deleteButton = (
    <Icon
      name="times-circle"
      size={20}
      color="red"
      iconStyle={{ margin: 0 }}
      borderRadius={0}
      backgroundColor="transparent"
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cart}>
        <CartComponent
          addPriceToGroup={addPriceToGroup}
          groups={groups}
          setGroups={setGroups}
        />
      </View>
      <View style={styles.buttons}>
        <AddGroupsComponent
          addGroup={addGroup}
          removeGroup={removeGroup}
          currentGroups={groups}
        />
        <TouchableOpacity
          style={styles.totalButton}
          onPress={() => props.navigation.navigate("Totals", groups)}
        >
          <Text style={styles.buttonText}> Calculate Totals </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const TotalsScreen = (props) => {
  const groups = props.route.params;
  for (var i = 0; i < groups.length; i++) {
    if (groups[i].id == "All") {
      const allTotal = groups[i].groupTotal;
      groups.splice(i, 1);
      for (var j = 0; j < groups.length; j++) {
        groups[j].groupTotal += allTotal;
      }
      break;
    }
  }

  let total = 0;
  for (i = 0; i < groups.length; i++) {
    total += groups[i].groupTotal;
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.totalList}>
        <FlatList
          data={groups}
          renderItem={({ item }) => (
            <View style={styles.totalItems}>
              <Text>{item.id}</Text>
              <Text>{item.groupTotal}</Text>
            </View>
          )}
        />
      </View>
      <Text>Total in cart : {total}</Text>
    </SafeAreaView>
  );
};

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Cart">
          <Stack.Screen
            name="Cart"
            component={CartScreen}
            options={{
              headerStyle: {
                backgroundColor: "#ffffcc",
              },
              headerTitleStyle: {
                fontSize: 30,
                textAlign: "left",
              },
            }}
          />
          <Stack.Screen
            name="Totals"
            component={TotalsScreen}
            options={{
              headerStyle: {
                backgroundColor: "#ffffcc",
              },
              headerTitleStyle: {
                fontSize: 30,
                textAlign: "left",
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
