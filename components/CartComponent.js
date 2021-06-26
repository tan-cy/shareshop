import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, Alert, Modal } from "react-native";
import { AddItemComponent } from "./AddItemComponent";
import Icon from "react-native-vector-icons/FontAwesome";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ItemInfoComponent } from "./ItemInfoComponent";

const CartComponent = (props) => {
  // keep track of items
  const [cart, setCart] = useState([]);
  const [key, setKey] = useState(1);
  const addToCart = (itemName, price, group) => {
    if (itemName == "") {
      Alert.alert("No item name", "Please enter an item name!");
    } else if (cart.find((item) => item.itemName == itemName)) {
      Alert.alert("Already there!", "This item is already in the cart!");
    } else {
      const newCart = [
        ...cart,
        {
          itemName: itemName,
          price: price.toFixed(2),
          group: group,
          key: key.toString(),
        },
      ];
      setCart(newCart);
      props.addPriceToGroup(group, price);
      setKey(key + 1);
    }
  };

  const removeFromCart = (itemName) => {
    // remove from cart
    // remove from group price
  };

  const addGroup = (groupName, itemName) => {};

  const removeGroup = (groupName, itemName) => {
    var idx = 0;
    while (cart[idx].itemName != itemName) {
      idx++;
    }
    var groupToChange = cart[idx].group;
    if (groupToChange.length == 1) {
      Alert.alert("Invalid group", "Item must belong to at least one group.");
    } else {
      // update cart
      const newCart = cart;
      newCart[idx].group = newCart[idx].group.filter(
        (item) => item.id != groupName
      );
      setCart(newCart);

      // update groupTotal for removed group
      const newGroups = props.groups;
      const cartItem = newCart[idx];
      const oldPricePerGroup = cartItem.price / cartItem.group.length;
      const newPricePerGroup = cartItem.price / (cartItem.group.length - 1);
      // remove old price from all groups, add new price to groups not removed
      for (var i = 0; i < newGroups.length; i++) {
        for (var j = 0; j < cartItem.group.length; j++) {
          if (newGroups[i].groupName == cartItem.group[j].id) {
            newGroups[i].groupTotal -= oldPricePerGroup;
            if (newGroups[i].groupName != groupName) {
              newGroups[i].groupTotal += newPricePerGroup;
            }
            break;
          }
        }
      }
      props.setGroups(newGroups);
      console.log(props.groups);
    }
  };

  const [modalVisibility, setModalVisibility] = useState(false);

  const toggleModal = () => {
    setModalVisibility(!modalVisibility);
  };

  return (
    <View>
      <FlatList
        style={{ width: "80%" }}
        data={cart}
        renderItem={({ item }) => (
          <View>
            <View style={styles.cartItems}>
              <Text>{item.itemName}</Text>
              <View style={{ flexDirection: "row" }}>
                <Text>
                  {item.price}
                  {"$\t"}
                </Text>
                <TouchableOpacity onPress={toggleModal}>
                  <Icon name="info-circle" size={20} />
                </TouchableOpacity>
              </View>
            </View>
            <Modal
              visible={modalVisibility}
              animationType="slide"
              transparent={true}
            >
              <ItemInfoComponent
                cartItem={item}
                toggleModal={toggleModal}
                removeFromCart={removeFromCart}
                addGroup={addGroup}
                removeGroup={removeGroup}
                groups={props.groups}
              />
            </Modal>
          </View>
        )}
      />
      <View>
        <AddItemComponent addToCart={addToCart} groups={props.groups}>
          {" "}
          Add an item{" "}
        </AddItemComponent>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItems: {
    paddingTop: 7,
    fontSize: 18,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export { CartComponent };
