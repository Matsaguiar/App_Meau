import { KeyboardAvoidingView, Platform, TextInput, Image, Alert, TouchableOpacity, Text, View, ScrollView } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { auth, db, storage } from '../firebase'

const UserChats = () => {

    const chatting_with = "user2@usr.com";

    
    const [messages, setMessages] = useState([]);

    useEffect(() => {

        const chat = db.collection('Users').doc(auth.currentUser?.email).collection('Chat').orderBy('createdAt', 'desc')
        .onSnapshot(querySnapshot => { setMessages(
            querySnapshot.docs.map(doc => (

                {
                    ...doc.data(),
                    createdAt: doc.data().createdAt.toDate(),
                }
            )));
        })
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages =>   GiftedChat.append(previousMessages, messages).sort((a, b) => b.createdAt - a.createdAt))
    
        db.collection('Users').doc(auth.currentUser?.email).collection('Chat').add(messages[0])
        .then(() => {
            console.log('Message sent!')
        })            
        .catch((error) => {
            console.error("Error adding document: ", error);
        });

        db.collection('Users').doc(chatting_with).collection('Chat').add(messages[0])
        .then(() => {
            console.log('Message sent! to user2')
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