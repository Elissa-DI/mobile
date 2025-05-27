// import React from "react";
// import {
//   View,
//   Text,
//   Image,
//   FlatList,
//   TouchableOpacity,
//   Alert,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { SafeAreaView } from "react-native-safe-area-context";
// import CustomHeader from "@/components/common/customHeader";

// const ProfilePage = () => {
//   const navigationButtons = [
//     { title: "Edit Profile" },
//     { title: "Privacy Settings" },
//     { title: "Notifications" },
//     { title: "Logout", isLogout: true },
//   ];

//   const handlePress = (title: string) => {
//     if (title === "Logout") {
//       Alert.alert("Logout", "You have been logged out.");
//     } else {
//       Alert.alert(title, `You tapped on "${title}".`);
//     }
//   };

//   return (
//     <SafeAreaView className="flex-1 bg-white">
//       <CustomHeader title="Profileee" />
//       <View className="px-4">
//         <View className="items-center mt-4 mb-6">
//           <Image
//             source={{
//               uri: "https://i.pravatar.cc/150?img=2",
//             }}
//             className="w-24 h-24 rounded-full"
//           />
//           <Text className="text-xl font-semibold mt-4">Jane Doe</Text>
//           <Text className="text-gray-500">jane.doe@example.com</Text>
//         </View>

//         <FlatList
//           data={navigationButtons}
//           keyExtractor={(item) => item.title}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               onPress={() => handlePress(item.title)}
//               className={`flex-row justify-between items-center my-2 py-3 px-5 rounded-full shadow-sm ${
//                 item.isLogout ? "bg-red-100" : "bg-gray-100"
//               }`}
//             >
//               <Text
//                 className={`font-medium ${
//                   item.isLogout ? "text-red-600" : "text-gray-800"
//                 }`}
//               >
//                 {item.title}
//               </Text>
//               <Ionicons
//                 name="chevron-forward"
//                 size={16}
//                 color={item.isLogout ? "rgb(220, 38, 38)" : "#4B5563"} // red-600 or gray-600
//               />
//             </TouchableOpacity>
//           )}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// export default ProfilePage;
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "@/components/common/customHeader";
import { useAuth } from "@/contexts/AuthContext";
import { router } from "expo-router";

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const navigationButtons = [
    { title: "Edit Profile" },
    { title: "Privacy Settings" },
    { title: "Notifications" },
    { title: "Logout", isLogout: true },
  ];

  const handlePress = (title: string) => {
    if (title === "Logout") {
      setShowLogoutModal(true);
    } else {
      console.log(`Tapped on ${title}`);
    }
  };

  const confirmLogout = async () => {
    setShowLogoutModal(false);
    await logout();
    router.replace("/(auth)/login");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <CustomHeader title="Profile" />

      <View className="px-4">
        <View className="items-center mt-4 mb-6">
          <Image
            source={{
              uri: "https://i.pravatar.cc/150?img=2",
            }}
            className="w-24 h-24 rounded-full"
          />
          <Text className="text-xl font-semibold mt-4">
            {user?.username || "Unnamed User"}
          </Text>
          <Text className="text-gray-500">
            {user?.email || "No email provided"}
          </Text>
        </View>

        <FlatList
          data={navigationButtons}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handlePress(item.title)}
              className={`flex-row justify-between items-center my-2 py-3 px-5 rounded-full shadow-sm ${
                item.isLogout ? "bg-red-100" : "bg-sky-100"
              }`}
            >
              <Text
                className={`font-medium ${
                  item.isLogout ? "text-red-600" : "text-gray-800"
                }`}
              >
                {item.title}
              </Text>
              <Ionicons
                name="chevron-forward"
                size={16}
                color={item.isLogout ? "rgb(220, 38, 38)" : "#4B5563"}
              />
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Logout Modal */}
      <Modal
        visible={showLogoutModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-40">
          <View className="bg-white rounded-lg p-6 w-11/12 max-w-sm">
            <Text className="text-lg font-bold mb-2">Confirm Logout</Text>
            <Text className="text-gray-600 mb-4">Are you sure you want to logout?</Text>

            <View className="flex-row justify-end space-x-3">
              <TouchableOpacity
                onPress={() => setShowLogoutModal(false)}
                className="px-4 py-2 rounded bg-gray-200"
              >
                <Text className="text-gray-700 font-medium">Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={confirmLogout}
                className="px-4 py-2 rounded bg-red-600"
              >
                <Text className="text-white font-medium">Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ProfilePage;
