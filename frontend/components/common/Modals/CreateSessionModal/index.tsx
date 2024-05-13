import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";
import { Controller, useController, useForm } from "react-hook-form";
import CustomPressable from "@/components/Pressable";
import { FontAwesome } from "@expo/vector-icons";
import useUser from "@/hooks/useUser";
import { createSession } from "@/services/sessionService";
import Dropdown from "@/components/common/Dropdown";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Colors from "@/constants/Colors";

interface IProps {
  isVisible: boolean;
  onClose: () => void;
}

const CreateSessionModal = ({ isVisible, onClose }: IProps) => {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // const { gyms } = useGyms();
  // gym = { label: "Depot Armley", value: "123456" }

  const createSessionMutation = useMutation({
    mutationFn: () =>
      createSession({
        userId: user?.user_id,
        gymId: "a1c791f3-0a90-4cc7-8dfa-5b86192be995",
        sessionType: "PUBLIC",
        notes: "Test notes",
        date: new Date(),
        skillLevel: "BEGINNER",
        maxParticipants: 10,
        genderPreference: "ALLGENDERS",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allSessions"] });
      queryClient.invalidateQueries({ queryKey: ["userSessions"] });
    },
  });

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

  return (
    <Modal animationType="slide" transparent visible={isVisible}>
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <Text
            style={{ color: "black", fontWeight: "bold", textAlign: "center" }}
          >
            Create Session
          </Text>
          <Pressable onPress={onClose}>
            <FontAwesome name="close" size={24} color="black" />
          </Pressable>
        </View>
        <View style={styles.formContainer}>
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
          <Text style={styles.label}>Notes</Text>
          <Controller
            name="notes"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Notes"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </View>
        <CustomPressable
          textElement={<Text>Create Session</Text>}
          onPress={() => createSessionMutation.mutate()}
        />
        <View></View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    paddingTop: 20,
    padding: 8,
    backgroundColor: Colors.light.background,
    color: Colors.light.text,
  },
  titleContainer: {
    padding: 20,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
  },
  formContainer: {},
  label: {
    color: Colors.light.text,
    margin: 20,
    marginLeft: 0,
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
