import React from "react";
import { StyleSheet, View } from "react-native";
import SelectBox from "react-native-multi-selectbox";

const GroupSelectorComponent = ({ groups, group, setGroup }) => {
  const addSelectedGroup = (toBeAdded) => {
    if (toBeAdded.id == "All") {
      setGroup([{ id: "All", item: "All" }]);
    } else if (group.length == 1 && group[0].id == "All") {
      setGroup([toBeAdded]);
    } else if (!group.find((item) => item == toBeAdded)) {
      const newGroups = [...group, toBeAdded];
      setGroup(newGroups);
    } else {
      removeSelectedGroup(toBeAdded);
    }
  };
  const removeSelectedGroup = (toBeRemoved) => {
    const newGroups = group.filter((item) => item != toBeRemoved);
    console.log(toBeRemoved);
    setGroup(newGroups);
  };
  return (
    <View style={styles.container}>
      <SelectBox
        labelStyle={{ fontSize: 0, margin: 0 }}
        label=""
        multiOptionContainerStyle={{ fontSize: 12 }}
        containerStyle={{ fontSize: 12 }}
        optionsLabelStyle={{ fontSize: 12 }}
        listEmptyLabelStyle={{ fontSize: 12 }}
        multiListEmptyLabelStyle={{ fontSize: 14, padding: 0, margin: 0 }}
        inputPlaceholder="Select people"
        options={groups}
        selectedValues={group}
        onMultiSelect={addSelectedGroup}
        onTapClose={removeSelectedGroup}
        isMulti
        hideInputFilter
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignContent: "flex-start",
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    color: "black",
    width: "70%",
  },
  inputText: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export { GroupSelectorComponent };
