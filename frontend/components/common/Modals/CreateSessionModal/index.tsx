import React from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  Button,
} from "react-native";
import { useController, useForm } from "react-hook-form";
import { FontAwesome } from "@expo/vector-icons";
import useUser from "@/hooks/useUser";
import { createSession } from "@/services/sessionService";
import Dropdown from "@/components/common/Dropdown";

interface IProps {
  isVisible: boolean;
  onClose: () => void;
}

const CreateSessionModal = ({ isVisible, onClose }: IProps) => {
  const { user } = useUser();
  const { control, handleSubmit } = useForm();
  // const { gyms } = useGyms();
  // gym = { label: "Depot Armley", value: "123456" }

  const gyms = [
    {
      label: "Depot Armley",
      value: "123456",
    },
    {
      label: "Depot Manchester",
      value: "654321",
    },
  ];

  const TextFormInput = ({ name, control }: any) => {
    const { field } = useController({
      control,
      defaultValue: "",
      name,
    });

    return <TextInput value={field.value} onChangeText={field.onChange} />;
  };

  const NumberFormInput = ({ name, control }: any) => {
    const { field } = useController({
      control,
      defaultValue: 0,
      name,
    });

    return <TextInput value={field.value} onChangeText={field.onChange} />;
  };

  const RadioFormInput = ({ name, control, options }: any) => {
    const { field } = useController({
      control,
      defaultValue: options[0].value,
      name,
    });

    return (
      <View style={styles.pickerContainer}>
        {options.map((option: any) => (
          <Pressable
            key={option.value}
            onPress={() => field.onChange(option.value)}
          >
            <Text style={styles.title}>{option.label}</Text>
          </Pressable>
        ))}
      </View>
    );
  };

  const SelectFormInput = ({ name, control, options }: any) => {
    const { field } = useController({
      control,
      defaultValue: options[0],
      name,
    });

    return (
      <View style={styles.pickerContainer}>
        <Dropdown data={options} />
      </View>
    );
  };

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
          <Text style={{ color: "white" }}>Create Session</Text>
          <Pressable onPress={onClose}>
            <FontAwesome name="close" size={24} color="white" />
          </Pressable>
        </View>
        <View style={styles.formContainer}>
          <SelectFormInput name="gym" control={control} options={gyms} />
          <RadioFormInput
            name="type"
            control={control}
            options={[
              { label: "Public", value: "PUBLIC" },
              { label: "Private", value: "PRIVATE" },
              { label: "Friends Only", value: "FRIENDSONLY" },
            ]}
          />
          <RadioFormInput
            name="skillLevel"
            control={control}
            options={[
              { label: "Beginner", value: "BEGINNER" },
              { label: "Intermediate", value: "INTERMEDIATE" },
              { label: "Advanced", value: "ADVANCED" },
            ]}
          />
          <NumberFormInput name="maxParticipants" control={control} />
          <RadioFormInput
            name="genderPreference"
            control={control}
            options={[
              { label: "All Genders", value: "ALLGENDERS" },
              { label: "Male Only", value: "MALEONLY" },
              { label: "Female Only", value: "FEMALEONLY" },
            ]}
          />
          <TextFormInput name="notes" control={control} />
        </View>
        <Button title="Create Session" onPress={handleFormSubmit} />
        <View></View>
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
  formContainer: {},
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 50,
    paddingVertical: 20,
  },
});

export default CreateSessionModal;
