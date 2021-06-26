import React, { useEffect } from "react";
import {
  Modal,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import SelectBox from "react-native-multi-selectbox";

const ItemInfoComponent = ({
  cartItem,
  toggleModal,
  removeFromCart,
  removeGroup,
  addGroup,
  groups,
}) => {
  return (
    <View style={styles.popup}>
      <View style={styles.close}>
        <Icon.Button
          name="times-circle"
          size={20}
          color="red"
          iconStyle={{ margin: 0 }}
          borderRadius={0}
          backgroundColor="transparent"
          onPress={() => {
            toggleModal();
          }}
        />
      </View>
      <View style={styles.popupContent}>
        <Text>Item: {cartItem.itemName}</Text>
        <Text>Price: {cartItem.price}</Text>
        <View style={styles.groups}>
          <Text>Groups: </Text>
          {/* <SelectBox
            labelStyle={{ fontSize: 0, margin: 0 }}
            label=""
            multiOptionContainerStyle={{ fontSize: 12 }}
            containerStyle={{ fontSize: 12 }}
            optionsLabelStyle={{ fontSize: 12 }}
            listEmptyLabelStyle={{ fontSize: 12 }}
            multiListEmptyLabelStyle={{ fontSize: 14, padding: 0, margin: 0 }}
            options={groups}
            selectedValues={cartItem.group}
            onMultiSelect={(item) => {
              addGroup(item, cartItem.itemName);
            }}
            onTapClose={(item) => {
              removeGroup(item, cartItem.itemName);
            }}
            isMulti
            hideInputFilter
          /> */}

          <FlatList
            horizontal
            data={cartItem.group}
            renderItem={({ item }) => (
              <Text>
                <TouchableOpacity
                  style={styles.group}
                  onPress={() => {
                    removeGroup(item.id, cartItem.itemName);
                  }}
                >
                  <Text style={styles.groupName}>{item.id} </Text>
                  <Icon
                    name="times-circle"
                    size={15}
                    iconStyle={{ margin: 0, padding: 0 }}
                    backgroundColor="transparent"
                    borderRadius={1}
                    color="white"
                  />
                </TouchableOpacity>{" "}
              </Text>
            )}
          />
        </View>
        <TouchableOpacity style={styles.removeItem} onPress={removeFromCart}>
          <Text>Remove from cart.</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  popup: {
    marginTop: 200,
    borderRadius: 10,
    alignSelf: "center",
    width: "80%",
    backgroundColor: "white",
    height: "30%",
  },
  popupContent: {
    margin: 15,
  },
  popupToggles: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  close: {
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  groups: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "flex-start",
  },
  group: {
    padding: 5,
    borderRadius: 10,
    borderColor: "white",
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    backgroundColor: "#00FA9A",
  },
  groupName: {
    color: "white",
  },
  removeItem: {
    marginTop: 20,
    padding: 5,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#ff6173",
    alignSelf: "center",
    width: "50%",
  },
});

export { ItemInfoComponent };
