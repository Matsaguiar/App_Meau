import { Text, View, ScrollView, Button } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
import { auth, db, storage } from '../firebase'
import { useNavigation } from '@react-navigation/native'
import { css } from '../assets/css/Css'
import * as Notifications from 'expo-notifications';

const Notification = () => {
  const navigation = useNavigation()
  const user_collection = db.collection('Users');
  const notification_colletion = db.collection('Notifications');
  const [listNotifications, setListNotifications] = useState([]);

  const getNotifications = () => {
    console.log('Searching for news notifications');
    const email = (auth.currentUser?.email)
    console.log(email)

    notification_colletion
      .where('owner', '==', email).get()
      .then((querySnapshot) => {
        const aux = [];
        querySnapshot.forEach((doc) => {
          aux.push(doc.data())
        });
        setListNotifications(aux);
      }).catch((e) => {
        console.error('Error: ' + e);
      });
    setTimeout(getNotifications, 10000);
  }

  useEffect(getNotifications, []);

  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Você tem uma notificação! 📬",
        body: '',
        data: { data: 'goes here' },
      },
      trigger: { seconds: 2 },
    });
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        {listNotifications.map(({ animal, newOwner }) => (
          <View style={[css.container]}>
            <Text>{newOwner} está pedindo para adotar o {animal}</Text>
          </View>
        ))}
        <Button
          title="Disparar notificação"
          onPress={async () => {
            await schedulePushNotification();
          }}
        />
      </ScrollView>
    </View>
  );
};

export default Notification