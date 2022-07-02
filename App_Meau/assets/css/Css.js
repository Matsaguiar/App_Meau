import { StyleSheet } from "react-native";

const css = StyleSheet.create({
    container_home: {
      flex: 1,
      backgroundColor: '#f0f',
      alignItems: 'center',
      justifyContent: 'center',
    },

    container: {
      flex: 1,
      backgroundColor: '#DDD',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    input : {
      height: 35,
      borderWidth : 2,
      color: 'black'
    },
  
    separator: {
      marginVertical: 8,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
  
    title: {
      fontSize: 30,
      color: '#000',
    }
  });

  export { css };