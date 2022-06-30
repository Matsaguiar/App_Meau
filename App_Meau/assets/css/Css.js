import { StyleSheet } from "react-native";

const css = StyleSheet.create({
    container: {
      flex: 5,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});

const styles = StyleSheet.create({
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
  
    tilte: {
      fontSize: 30,
      color: '#000',
    }
  });

  export { css };