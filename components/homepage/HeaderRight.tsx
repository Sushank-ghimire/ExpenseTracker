import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { useTheme } from "@/providers/ThemeProvider";

interface Props {
  handleNotificationPress: () => void;
}

const HeaderRight = ({ handleNotificationPress }: Props) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      onPress={handleNotificationPress}
      style={{
        marginRight: 16,
        position: "relative",
        padding: 4,
      }}
      activeOpacity={0.7}
    >
      <Icon name="bells" color={theme.colors.text} size={26} />

      {/* Notification Badge */}
      <View
        style={{
          position: "absolute",
          top: -4,
          right: -2,
          backgroundColor: "red",
          borderRadius: 8,
          paddingHorizontal: 5,
          paddingVertical: 1,
          minWidth: 16,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 10,
            fontWeight: "bold",
          }}
        >
          6
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default HeaderRight;

const styles = StyleSheet.create({});
