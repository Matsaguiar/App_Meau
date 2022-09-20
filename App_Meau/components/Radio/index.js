import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

export default function index({
  options = [], 
  horizontal = false, 
  onChangeSelect, 
  selected}){
  return (
    <View style={horizontal ? styles.horizontal : styles.vertical}>
      {
        options.map((opt, index) => (
          <TouchableOpacity 
            onPress={() => onChangeSelect(opt, index)}
            style={[styles.optContainer, {marginLeft: horizontal ? 20 : 0, marginTop: horizontal ? 0 : 10}]}
          >
            <View style={styles.outLineCircle}>
              {selected == index && <View style={styles.innerCircle}/>}
            </View>
            <Text style={styles.txt}>{opt}</Text>
          </TouchableOpacity>
        ))
      }
    </View>
  )
}

const styles = StyleSheet.create({
  horizontal: {
    flexDirection: 'row',
  },
  optContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  outLineCircle: {
    width: 20, 
    height: 20,
    borderRadius: 10,
    borderColor: '#777',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  innerCircle: {
    width: 10, 
    height: 10,
    borderRadius: 4,
    backgroundColor: '#444',
  },
  txt:{
    fontSize: 20,
    marginLeft: 4,
  },
})