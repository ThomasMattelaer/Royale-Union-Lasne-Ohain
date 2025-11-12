import { Tabs } from "expo-router";
import {
  Octicons,
  FontAwesome,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerTintColor: "#3558a2",
        tabBarActiveTintColor: "#3558a2",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Royale Union Lasne Ohain",
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "Calendar",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="calendar-alt" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: "Stats",
          tabBarIcon: ({ color }) => (
            <Octicons name="goal" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "My Account",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" size={20} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
