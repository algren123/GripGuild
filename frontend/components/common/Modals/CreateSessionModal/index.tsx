import useUser from "@/hooks/useUser";
import { createSession } from "@/services/sessionService";
import React from "react";
import { Modal, View, Text, Pressable, StyleSheet } from "react-native";

interface IProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const CreateSessionModal = ({ isVisible, onClose, children }: IProps) => {
  const { user } = useUser();

  const handleFormSubmit = async () => {
    console.log("Form submitted");
    await createSession({
      userId: user?.user_id,
      gymId: "a1c791f3-0a90-4cc7-8dfa-5b86192be995",
      sessionType: "PUBLIC",
      notes: "Test notes",
      date: new Date(),
      skillLevel: "BEGINNER",
      maxParticipants: 10,
      genderPreference: "ALLGENDERS",
    });
  };

  return (
    <Modal animationType="slide" transparent visible={isVisible}>
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <Text>Create Session Modal</Text>
        </View>
        {children}
        <Pressable onPress={handleFormSubmit}>
          <Text style={styles.title}>Create Session</Text>
        </Pressable>
        <Pressable onPress={onClose}>
          <Text style={styles.title}>Close</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    height: "auto",
    width: "100%",
    backgroundColor: "#25292e",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: "absolute",
    bottom: 0,
  },
  titleContainer: {
    height: "auto",
    padding: 20,
    backgroundColor: "#464C55",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "#fff",
    fontSize: 16,
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 50,
    paddingVertical: 20,
  },
});

export default CreateSessionModal;
