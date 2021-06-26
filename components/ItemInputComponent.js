import React from "react";
import { StyleSheet, TextInput, View, SafeAreaView } from "react-native";

const ItemInputComponent = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.itemInput}>
        <TextInput
          maxLength={40}
          style={{ width: "100%" }}
          clearButtonMode="always"
          selectTextOnFocus={true}
          placeholder="add item"
          onChangeText={(newItem) => props.setItemName(newItem)}
          ref={props.nameInput}
        />
      </View>
      <View style={styles.priceInput}>
        <TextInput
          style={{ width: "100%", textAlign: "right" }}
          selectTextOnFocus={true}
          keyboardType="numeric"
          placeholder="$0.00"
          ref={props.priceInput}
          onChangeText={(newPrice) => {
            props.setPrice(parseFloat(newPrice) + 0);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    color: "black",
    fontSize: 16,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  itemInput: {
    width: "75%",
  },
  priceInput: {
    width: "20%",
  },
});
export { ItemInputComponent };
