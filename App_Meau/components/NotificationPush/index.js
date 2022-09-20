import * as Device from 'expo-device';
import { useState, useEffect, useRef } from 'react'
import { auth, db, storage } from '../../firebase'
import * as Notifications from 'expo-notifications'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const NotificationPush = () => {
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
          
          if(doc.get('notify') == false){
            updateNotification(doc.id)
          }
        });
        setListNotifications2(aux);
      }).catch((e) => {
        console.error('Error: ' + e);
      });
    
    //setTimeout(getNotifications, 10000);

  }
  function updateNotification(id){
    console.log('Update state of notification');
    notification_colletion.doc(id).update({
      notify: true
    })
  }

  useEffect(() => {
    schedulePushNotification()
    
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
      schedulePushNotification();
    };
   }, []);

  async function schedulePushNotification() {
    console.log("ddvva: " + listNotifications2.length)
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Você tem um pedido de adoção! 📬",
      },
      trigger: { seconds: 2 },
    });
  }

  return (
    schedulePushNotification()
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

export default NotificationPush