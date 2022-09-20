import { TextInput, Text, View, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { auth, db, storage } from '../firebase'
import { useNavigation } from '@react-navigation/native';

const UserChats = () => {

  const navigation = useNavigation()
  const [userChats, setUserChats] = useState([]);

  const loadChats = () => {

    const chatList = [];

    db.collection('Users').doc(auth.currentUser?.email).collection('Chats').get()
      .then((querySnapshot) => {

        querySnapshot.forEach((doc) => { chatList.push(doc.data()) });

        setUserChats(chatList);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }

  useEffect(loadChats, []);

  const ItemSeparatorView = () => {
    return (
      //Item Separator
      <View
        style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8' }}
      />
    );
  };

  const renderItem = ({ item }) => {

    return (

      <TouchableOpacity
      
        onPress={() => navigation.navigate("Chat", { chat: item })}
      >
        <Text>{item.name}</Text>
      </TouchableOpacity>

      );
    }

  return (

    <View>

      <Text style={{ fontSize: 25, marginBottom: 15 }}>Minhas Conversas</Text>

      <FlatList
        data={userChats}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ItemSeparatorView}
      />
    </View>

  );

}

export default UserChats;