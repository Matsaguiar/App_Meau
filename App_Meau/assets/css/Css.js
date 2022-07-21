import { StyleSheet } from "react-native";

const css = StyleSheet.create({
    container_home: {
      flex: 10,
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
    
    specificContainer:{
      padding: 5
    },

    input : {
      height: 35,
      borderWidth : 2,
      color: 'black'
    },
  
    separator: {
      marginVertical: 8,
      borderBottomColor: '#737373',
    },
    
    titleOla:{
      fontSize: 72,
      color: '#ffd358'
    },

    title: {
      fontSize: 35,
      color: '#757575',
      alignItems: 'center',
    },

    bg: {
      backgroundColor: "#fff"
    },

    loginForm: {
      width: "80%"
    },

    loginInput: {
      backgroundColor: "#fff",
      fontSize: 19,
      padding: 7,
      marginBottom: 15,
      borderBottomWidth: StyleSheet.hairlineWidth,
    },

    loginLogomarca: {
      marginBottom: 10
    },

    buttonContainer: {
      width: '60%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },

    buttonYellow: {
      backgroundColor: '#ffd358',
      width: '100%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
    },

    buttonGreen: {
      backgroundColor: '#88c9bf',
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
      color: '#434343',
      fontWeight: '400',
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
    },

    greenText:{
      marginTop:20,
      marginVertical: 8,
      color: '#88C9bf',
    },

    forgetPassword:{
      marginTop:5,
      marginVertical: 8,
    }

  });

  export { css };