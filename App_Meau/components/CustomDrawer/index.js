import React from 'react';
import {useLinkBuilder, DrawerActions, CommonActions} from '@react-navigation/native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

const CustomDrawer = (props) => {
  const {state, descriptors, navigation} = props;
  const buildLink = useLinkBuilder();

  return (
    <DrawerContentScrollView {...props}>
      {state.routes.map((route, i) => {
        const isHidden = descriptors[route.key].options?.hidden; // <--- Added this line
        if (isHidden === true) return null; // <--- Added this line

        const focused = i === state.index;
        const {
          title,
          drawerLabel,
          drawerIcon,
          drawerActiveTintColor,
          drawerInactiveTintColor,
          drawerActiveBackgroundColor,
          drawerInactiveBackgroundColor,
          drawerLabelStyle,
          drawerItemStyle,
        } = descriptors[route.key].options;

        return (
          <DrawerItem
            key={route.key}
            label={
              drawerLabel !== undefined
                ? drawerLabel
                : title !== undefined
                  ? title
                  : route.name
            }
            icon={drawerIcon}
            focused={focused}
            activeTintColor={drawerActiveTintColor}
            inactiveTintColor={drawerInactiveTintColor}
            activeBackgroundColor={drawerActiveBackgroundColor}
            inactiveBackgroundColor={drawerInactiveBackgroundColor}
            labelStyle={drawerLabelStyle}
            style={drawerItemStyle}
            to={buildLink(route.name, route.params)}
            onPress={() => {
              navigation.dispatch({
                ...(focused
                  ? DrawerActions.closeDrawer()
                  : CommonActions.navigate(route.name)),
                target: state.key,
              });
            }}
          />
        );
      })}
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;