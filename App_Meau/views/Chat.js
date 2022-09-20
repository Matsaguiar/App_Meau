import { KeyboardAvoidingView, Platform, TextInput, Image, Alert, TouchableOpacity, Text, View, ScrollView } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { auth, db, storage } from '../firebase'

const UserChats = ({ route }) => {

  const chatting_with = route.params.person.name;

  const [messages, setMessages] = useState([]);

  const Chat = () => {
    console.log("Conversando com: " + chatting_with);

    let all_messages = [];
    let received_messages = [];
    let sent_messages = [];

    let check = db.collection('Users').doc(auth.currentUser?.email).collection('Chats').doc(chatting_with).get()
    if(!check.exists){
      db.collection('Users').doc(auth.currentUser?.email).collection('Chats').doc(chatting_with).set({
        name: chatting_with,
      })
      .then(() => {
        console.log("Chat with " + chatting_with + " created!");
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error inserting chat with: ", chatting_with);
        console.log(error);
      });
      
      db.collection('Users').doc(chatting_with).collection('Chats').doc(auth.currentUser?.email).set({
        name: auth.currentUser?.email,
      })
      .then(() => {
        console.log("Chat with " + auth.currentUser?.email + " created!");
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error inserting chat with: ", auth.currentUser?.email);
        console.log(error);
      });


    }

    db.collection('Users').doc(auth.currentUser?.email).collection('Messages')
      .where('user._id', '==', chatting_with)
      // .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {

        received_messages = [];

        querySnapshot.docs.map(doc => (
          {
            ...doc.data(),
            createdAt: doc.data().createdAt.toDate(),
          }
        ))
        .forEach(doc => received_messages.push(doc))

        all_messages = [...received_messages, ...sent_messages];
        all_messages.sort((a, b) => b.createdAt - a.createdAt);
        setMessages(all_messages);
        console.log("ON SNAPSHOT RECEIVED MESSAGES")
      })

    db.collection('Users').doc(auth.currentUser?.email).collection('Messages')
      .where('sentTo', '==', chatting_with)
      // // .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {

        console.log("ON SNAPSHOT SENT MESSAGES")

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
  }

  useEffect(Chat, []);

  const onSend = useCallback((messages = []) => {

    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));

    db.collection('Users').doc(auth.currentUser?.email).collection('Messages').add({ ...messages[0], sentTo: chatting_with })
      .then(() => {
        console.log('Message sent!')
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });

    db.collection('Users').doc(chatting_with).collection('Messages').add(messages[0])
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