import { StyleSheet } from "react-native";

const css = StyleSheet.create({
    container_home: {
      flex: 10,
      backgroundColor: '#ffffff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    container: {
      flex: 5,
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
    },

    bg: {
      backgroundColor: "#fff"
    },

    loginForm: {
      width: "80%"
    },

    loginInput: {
      backgroundColor: "#f5f5f5",
      fontSize: 19,
      padding: 7,
      marginBottom: 15
    },

    loginLogomarca: {
      marginBottom: 10
    },

    buttonContainer: {
      width: '60%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
    },

    button: {
      backgroundColor: '#0782F9',
      width: '100%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
    },

    buttonOutline: {
      backgroundColor: 'white',
      marginTop: 5,
      borderColor: '#0782F9',
      borderWidth: 2,
    },

    buttonText: {
      color: 'white',
      fontWeight: '700',
      fontSize: 16,
    }, 

    buttonOutlineText: {
      color: '#0782F9',
      fontWeight: '700',
      fontSize: 16,
    },

    buttonSignOut: {
      flex: 1, 
      justifyContent: 'center',
      alignItems: 'center',
    }

  });

  export { css };