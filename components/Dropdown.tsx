import React from 'react';
import { View, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { ChevronDown } from 'lucide-react-native';

interface PickerOption {
  label: string;
  value: string;
}

interface DynamicPickerProps {
  selectedValue: string;
  onValueChange: (value: string) => void;
  options: PickerOption[];
}

const DynamicPicker: React.FC<DynamicPickerProps> = ({ selectedValue, onValueChange, options }) => {
  return (
    <View style={styles.pickerContainer}>
      <View style={styles.selectStyle}>
        <RNPickerSelect
          value={selectedValue}
          onValueChange={onValueChange}
          items={options}
          useNativeAndroidPickerStyle={false} // Ensures custom styles are applied on Android
          style={pickerSelectStyles}
        />
        <ChevronDown size={20} color="#888" style={styles.chevronIcon} />
      </View>
    </View>
  );
};

export default DynamicPicker;


const styles = StyleSheet.create({
  pickerContainer: {
    margin:0,
    padding:0
  },
  selectStyle: {
    position:'relative',
        justifyContent: "space-between",
        alignItems:'center',
        backgroundColor: "white",
        borderRadius: 10,
        paddingHorizontal:10,
        width: "100%",
        alignSelf: "center",
      borderColor:'grey',
      borderWidth:1,
  },
  chevronIcon:{
    position:"absolute",
    right:10,
    padding:10,
    top:8
  }
});

const pickerSelectStyles = StyleSheet.create({

    inputIOS: {
      flex:1,
      fontSize: 16,
      marginLeft:10,
      marginRight:100,
      marginTop:18,
      marginBottom:18,
      textAlign:'left',
      color: 'black',
      backgroundColor: '#f0f0f0',
    },

    inputAndroid: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      color: 'black',
      backgroundColor: '#f0f0f0',
      marginBottom: 10,
    },

  });
  