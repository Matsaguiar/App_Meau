import { Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
import { auth, db, storage } from '../firebase'
import { useNavigation } from '@react-navigation/native'
import { css } from '../assets/css/Css'
//import * as Notifications from 'expo-notifications';

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

  // async function schedulePushNotification() {
  //   await Notifications.scheduleNotificationAsync({
  //     content: {
  //       title: "Você tem uma notificação! 📬",
  //       body: '',
  //       data: { data: 'goes here' },
  //     },
  //     trigger: { seconds: 2 },
  //   });
  // }

  const delete_notification = (animal, newOwner) => {
    const email = (auth.currentUser?.email)

    db.collection("Notifications")
    .where("animal", "==", animal)
    .where("owner", "==", email)
    .where("newOwner", "==", newOwner)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          db.collection("Notifications").doc(doc.id).delete()
        });
    }).catch((e) => {
        console.error('Error: ' + e);
      });
  }

  const accept = (animal, newOwner, idAnimal) => {
    const email = (auth.currentUser?.email)

    db.collection("Users").doc(email).collection("Meus_animais").where("name", "==", animal).get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          db.collection("Users").doc(newOwner).collection("Meus_animais").doc(doc.id)
            .set({
              name: doc.data().name,
              species: doc.data().species,
              sex: doc.data().sex,
              size: doc.data().size,
              age: doc.data().age,
              temperament: doc.data().temperament,
              health: doc.data().health,
              sick: doc.data().sick,
              history: doc.data().history,
              adoption: false,
              profilePicture: doc.data().profilePicture,
            });
          db.collection("Users").doc(email).collection("Meus_animais").doc(doc.id).delete()
        })
    })


    db.collection("Animals").doc(idAnimal).update({
      owner: newOwner,
      adoption: false
    })

    db.collection("Notifications").where("animal", "==", animal).where("owner", "==", email).get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          db.collection("Notifications").doc(doc.id).delete()
        })
    })
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        {listNotifications.map(({ animal, newOwner, idAnimal }) => (
          <View style={[css.container]}>
            <Text>{newOwner} está pedindo para adotar o {animal}</Text>
            <TouchableOpacity
            onPress={() => accept(animal, newOwner, idAnimal)}
            style={css.buttonGreen}
          >
            <Text style={css.buttonText}>aceitar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => delete_notification(animal, newOwner)}
            style={css.buttonGreen}
          >
            <Text style={css.buttonText}>recusar</Text>
          </TouchableOpacity>
          </View>
        ))}
        {/* <Button
          title="Disparar notificação"
          onPress={async () => {
            await schedulePushNotification();
          }}
        /> */}
      </ScrollView>
    </View>
  );
};

export default Notification