import { StyleSheet } from "react-native";

const css = StyleSheet.create({
    container_home: {
      flex: 1,
      backgroundColor: '#ffffff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    container: {
      flex: 1,
      backgroundColor: '#fff',
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
      fontSize: 35,
      color: '#000',
      alignItems: 'center',
      justifyContent: 'center'
    },

    bg: {
      backgroundColor: "#f5f5f5"
    },

    login__msg: (text='none')=>( {
      fontWeight: "bold",
      fontSize: 22,
      color: "red",
      marginTop: 10,
      marginBottom: 15,
      display: text
    }), 

    login__form: {
      width: "80%"
    },

    login__input: {
      backgroundColor: "#fff",
      fontSize: 19,
      padding: 7,
      marginBottom: 15
    },

    login__button: {
      padding: 12,
      backgroundColor: "#fff",
      alignSelf: "center",
      borderRadius: 5
    },
    
    login__buttonText: {
      fontWeight: "bold",
      fontSize: 22,
      color: "#333"
    }, 

    login__logomarca: {
      marginBottom: 10
    }

  });

  export { css };