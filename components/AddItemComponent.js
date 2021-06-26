import React, { useState } from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { ItemInputComponent } from "./ItemInputComponent";
import { GroupSelectorComponent } from "./GroupSelectorComponent";

const AddItemComponent = (props) => {
  // cart variables
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState(0.0);
  const [group, setGroup] = useState([{ id: "All", item: "All" }]);

  const nameInput = React.createRef();
  const priceInput = React.createRef();

  return (
    <View>
      <ItemInputComponent
        setItemName={setItemName}
        setPrice={setPrice}
        nameInput={nameInput}
        priceInput={priceInput}
      />
      <View style={{ flexDirection: "row" }}>
        <GroupSelectorComponent
          groups={props.groups}
          group={group}
          setGroup={setGroup}
        />
        <View style={{ marginTop: 5 }}>
          <TouchableOpacity
            style={styles.addToCart}
            onPress={() => {
              props.addToCart(itemName, price, group);
              nameInput.current.clear();
              setItemName("");
              priceInput.current.clear();
              setPrice(0.0);
            }}
          >
            <Text>Add to cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  addToCart: {
    backgroundColor: "#00FA9A",
    padding: 10,
    borderRadius: 10,
    marginLeft: 10,
  },
});

export { AddItemComponent };
