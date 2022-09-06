import { KeyboardAvoidingView, Platform, TextInput, Image, Alert, TouchableOpacity, Text, View, ScrollView } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { auth, db, storage } from '../firebase'

const UserChats = () => {

  const chatting_with = "user3@usr.com";

  const [messages, setMessages] = useState([]);

  const Chat = () => {
    console.log("Entrou no useEffect");

    let all_messages = [];
    let received_messages = [];
    let sent_messages = [];

    db.collection('Users').doc(auth.currentUser?.email).collection('Chat')
      .where('user._id', '==', chatting_with)
      // .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {

        received_messages = []

        querySnapshot.docs.map(doc => (
          {
            ...doc.data(),
            createdAt: doc.data().createdAt.toDate(),
          }
        ))
          .forEach(doc => received_messages.push(doc))
      })

    db.collection('Users').doc(auth.currentUser?.email).collection('Chat')
      .where('sentTo', '==', chatting_with)
      // // .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {

        sent_messages = []

        querySnapshot.docs.map(doc => (
          {
            ...doc.data(),
            createdAt: doc.data().createdAt.toDate(),
          }
        ))
          .forEach(doc => sent_messages.push(doc))

        all_messages = []
        all_messages.push(...received_messages, ...sent_messages);
        all_messages.sort((a, b) => b.createdAt - a.createdAt);
        setMessages(all_messages);
      })
      setTimeout(Chat, 9000);

  }

  useEffect(Chat, []);

  const onSend = useCallback((messages = []) => {

    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));

    db.collection('Users').doc(auth.currentUser?.email).collection('Chat').add({ ...messages[0], sentTo: chatting_with })
      .then(() => {
        console.log('Message sent!')
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });

    db.collection('Users').doc(chatting_with).collection('Chat').add(messages[0])
      .then(() => {
        console.log('Message sent to', chatting_with)
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });

  }, [])

  return (

    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: auth.currentUser?.email,
      }}
    />

  );

}

export default UserChats;