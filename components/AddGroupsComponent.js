import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Modal,
  TouchableOpacity,
  FlatList,
} from "react-native";

const AddGroupsComponent = ({ currentGroups, addGroup, removeGroup }) => {
  const [group, setGroup] = useState("All");

  const groupInput = React.createRef();

  // modal variables
  const [modalVisibility, setModalVisibility] = useState(false);
  const toggleModal = () => {
    setModalVisibility(!modalVisibility);
  };

  return (
    <View>
      <TouchableOpacity style={styles.addButton} onPress={toggleModal}>
        <Text style={styles.buttonText}> Add people </Text>
      </TouchableOpacity>
      <Modal
        visible={modalVisibility}
        animationType="slide"
        transparent={true}
        presentationStyle="overFullScreen"
      >
        <View style={styles.popup}>
          <View style={styles.popupContent}>
            <Text style={{ textAlign: "center" }}> Current People </Text>
            <View style={{ height: "65%" }}>
              <View style={styles.list}>
                <FlatList
                  showsVerticalScrollIndicator={true}
                  persistentScrollbar={true}
                  data={currentGroups}
                  renderItem={({ item }) => (
                    <View style={styles.items}>
                      <Text>{item.id}</Text>
                      <TouchableOpacity onPress={() => removeGroup(item.id)}>
                        <Text>{item.icon}</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                />
              </View>
            </View>
            <TextInput
              style={{ textAlign: "center", marginBottom: 10 }}
              ref={groupInput}
              clearButtonMode="always"
              selectTextOnFocus={true}
              placeholder="new person"
              onChangeText={(newGroup) => setGroup(newGroup)}
            />
            <View style={styles.popupToggles}>
              <TouchableOpacity style={styles.close} onPress={toggleModal}>
                <Text>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addGroup}
                onPress={() => {
                  addGroup(group);
                  groupInput.current.clear();
                }}
              >
                <Text>Add person</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: "#00FA9A",
    marginLeft: 20,
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
  addGroup: {
    width: "35%",
    backgroundColor: "#00FA9A",
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
    alignSelf: "flex-end",
  },
  close: {
    width: "25%",
    backgroundColor: "#ff6173",
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  list: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  items: {
    width: "100%",
    fontSize: 20,
    paddingBottom: 3,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
export { AddGroupsComponent };
