import { Text, View, ScrollView, Button, TouchableOpacity } from 'react-native'
import * as Device from 'expo-device';
import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { auth, db, storage } from '../firebase'
import { useNavigation } from '@react-navigation/native'
import { css } from '../assets/css/Css'
import * as Notifications from 'expo-notifications';
import * as Permissions from "expo-permissions";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Notification = () => {
  const navigation = useNavigation()
  const user_collection = db.collection('Users');
  const notification_colletion = db.collection('Notifications');
  const [listNotifications, setListNotifications] = useState([]);
  const [listNotifications2, setListNotifications2] = useState([]);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const getNotifications = () => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    console.log('Searching for news notifications');
    const email = (auth.currentUser?.email)
    //console.log(email)

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

    notification_colletion
      .where('owner', '==', email)
      .where('notify', '==', false).get()
      .then((querySnapshot) => {
        const aux = [];
        querySnapshot.forEach((doc) => {
          aux.push(doc.data())

          if (doc.get('notify') == false) {
            updateNotification(doc.id)
          }
        });
        setListNotifications2(aux);
      }).catch((e) => {
        console.error('Error: ' + e);
      });

    //setTimeout(getNotifications, 10000);

  }
  function updateNotification(id) {
    console.log('Update state of notification');
    notification_colletion.doc(id).update({
      notify: true
    })
  }

  useEffect(() => {
    schedulePushNotification();

    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    getNotifications();
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function schedulePushNotification() {
    console.log("ddvva: " + setListNotifications2.length)
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Você tem um pedido de adoção! 📬",
      },
      trigger: { seconds: 2 },
    });
  }

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
    Alert.alert('Pedido de adoção recusado!')
    console.log('Pedido de adoção recusado!')
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
    Alert.alert('Adoção concluída com sucesso!')
    console.log('Adoção concluída com sucesso!')
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

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

export default Notification