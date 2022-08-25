import { Text, View, ScrollView } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
import { auth, db, storage } from '../firebase'
import { useNavigation } from '@react-navigation/native'
import { Audio } from 'expo-av';

//pAREI NA INSTALAÇÃO DO AUDIO

const Notification = () => {
  const navigation = useNavigation()
  const user_collection = db.collection('Users');
  const notification_colletions = db.collection('Notifications');
  const [listNotifications, setListNotifications] = useState([]);
  const [sound, setSound] = React.useState();

  const getNotifications = async () => {
    console.log('Searching for news notifications');
    const email = db.collection('Users').doc(auth.currentUser?.email)
    let aux = [];

    await db.collection('notifications')
      .where('owner', '==', email).get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

          const noti = {
            //idAnimal: doc.get('idAnimal'),
            animal: doc.get('animal'),
            owner: doc.get('owner'),
            newOwner: doc.get('newOwner'),
          };
          aux.push(noti);

          //if(doc.get('notified') == false){
          playSoundNotification();
          updateNotification(doc.id)
          //}

        });
      }).catch((e) => {
        console.error('Error: ' + e);
      });
    setListNotifications(aux);
    setTimeout(getNotifications, 10000);
  }


  async function playSoundNotification() {
    const { sound } = await Audio.Sound.createAsync(require('../src/meow.mp3'));
    setSound(sound);
    await sound.playAsync()
  }

  // function updateNotification(id) {
  //   console.log('Update state of notification');
  //   const update = firebase.firestore();
  //   update.collection('notifications').doc(id).update({
  //     notified: true
  //   })
  // }

  useEffect(() => {
    getNotifications();
  }, []);

  return(
    <View style={{ flex: 1 }}>
    <ScrollView>
      {listNotifications.map(({ animal, owner, newowner}) => (
        <View>
          <Text>{newowner} está pedindo para adotar o {animal}</Text>
        </View>
      ))}
    </ScrollView>
  </View>
  );
};

export default Notification