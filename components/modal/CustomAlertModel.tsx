import React from "react";
import {
  Modal,
  StyleSheet,
  View,
  Text,
  Pressable,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useTheme } from "@/providers/ThemeProvider";

interface UniversalModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  children?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  showButtons?: boolean;
  style?: {
    modalContainer?: ViewStyle;
    title?: TextStyle;
    message?: TextStyle;
    buttonText?: TextStyle;
  };
}

const UniversalModal = ({
  visible,
  onClose,
  title,
  message,
  children,
  confirmText = "OK",
  cancelText = "Cancel",
  onConfirm,
  showButtons = true,
  style = {},
}: UniversalModalProps) => {
  const { theme } = useTheme();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View
          style={[
            styles.modalView,
            { backgroundColor: theme.colors.card },
            style.modalContainer,
          ]}
        >
          {title && (
            <Text
              style={[
                styles.modalTitle,
                { color: theme.colors.text },
                style.title,
              ]}
            >
              {title}
            </Text>
          )}

          {message && (
            <Text
              style={[
                styles.modalMessage,
                { color: theme.colors.textSecondary },
                style.message,
              ]}
            >
              {message}
            </Text>
          )}

          {children}

          {showButtons && (
            <View style={styles.buttonRow}>
              <Pressable
                style={[
                  styles.button,
                  { backgroundColor: theme.colors.border },
                ]}
                onPress={onClose}
              >
                <Text style={[styles.buttonText, style.buttonText]}>
                  {cancelText}
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.button,
                  { backgroundColor: theme.colors.primary },
                ]}
                onPress={() => {
                  onConfirm?.();
                  onClose();
                }}
              >
                <Text style={[styles.buttonText, style.buttonText]}>
                  {confirmText}
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default UniversalModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalView: {
    margin: 20,
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
    minWidth: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    marginBottom: 8,
  },
  modalMessage: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    marginBottom: 16,
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  buttonText: {
    fontFamily: "Poppins-Medium",
    color: "#fff",
    fontSize: 14,
  },
});
