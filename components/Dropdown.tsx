import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const Dropdown = () => {
  const [selectedValue, setSelectedValue] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select an option:</Text>
      <RNPickerSelect
        onValueChange={(value) => setSelectedValue(value)}
        items={[
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
          { label: 'Option 3', value: 'option3' },
        ]}
        placeholder={{ label: 'Select...', value: null }}
        value={selectedValue}
        style={pickerSelectStyles}
        useNativeAndroidPickerStyle={false} // Needed for custom styles on Android
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    color: 'black',
    backgroundColor: '#f9f9f9',
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    color: 'black',
    backgroundColor: '#f9f9f9',
  },
});

export default Dropdown;
