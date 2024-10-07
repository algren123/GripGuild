import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Modal, View, Text, Pressable } from "react-native";
import { useForm } from "react-hook-form";
import CustomPressable from "@/components/Pressable";
import { FontAwesome } from "@expo/vector-icons";
import useUser from "@/hooks/useUser";
import { createSession } from "@/services/sessionService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SessionType } from "@/constants/SessionType";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { TSkillLevel } from "@/constants/SkillLevels";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PortalHost, useModalPortalRoot } from "@rn-primitives/portal";

interface IProps {
  isVisible: boolean;
  onClose: () => void;
}

const CreateSessionModal = ({ isVisible, onClose }: IProps) => {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const form = useForm();
  const insets = useSafeAreaInsets();
  const { sideOffset, ...rootProps } = useModalPortalRoot();

  const [sessionType, setSessionType] = useState<SessionType>("PUBLIC");
  const [skillLevel, setSkillLevel] = useState<TSkillLevel>("BEGINNER");
  const [maxParticipants, setMaxParticipants] = useState({
    label: "2",
    value: "2",
  });
  // const { gyms } = useGyms();
  // gym = { label: "Depot Armley", value: "123456" }

  function onSessionTypePress(label: string) {
    return () => {
      setSessionType(label as SessionType);
    };
  }

  function onSkillLevelPress(label: string) {
    return () => {
      setSkillLevel(label as TSkillLevel);
    };
  }

  function onChangeMaxParticipants(option: { label: string; value: string }) {
    setMaxParticipants(option);
  }

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

  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  console.log(maxParticipants);

  return (
    <Modal animationType="slide" transparent visible={isVisible}>
      <View className="bg-background h-full" {...rootProps}>
        <View>
          <Text style={{ fontWeight: "bold", textAlign: "center" }}>
            Create Session
          </Text>
          <Pressable onPress={onClose}>
            <FontAwesome name="close" size={24} color="black" />
          </Pressable>
        </View>
        <View>
          {/* @ts-ignore */}
          <RadioGroup value={sessionType} onValueChange={setSessionType}>
            <RadioGroupItemWithLabel
              value="PUBLIC"
              displayValue="Public"
              onLabelPress={onSessionTypePress("PUBLIC")}
              aria-labelledby="Public"
            />
            <RadioGroupItemWithLabel
              value="PRIVATE"
              displayValue="Private"
              onLabelPress={onSessionTypePress("PRIVATE")}
              aria-labelledby="Private"
            />
          </RadioGroup>
          {/* @ts-ignore */}
          <RadioGroup value={skillLevel} onValueChange={setSkillLevel}>
            <RadioGroupItemWithLabel
              value="BEGINNER"
              displayValue="Beginner"
              onLabelPress={onSkillLevelPress("BEGINNER")}
              aria-labelledby="Beginner"
            />
            <RadioGroupItemWithLabel
              value="INTERMEDIATE"
              displayValue="Intermediate"
              onLabelPress={onSkillLevelPress("INTERMEDIATE")}
              aria-labelledby="Intermediate"
            />
            <RadioGroupItemWithLabel
              value="ADVANCED"
              displayValue="Advanced"
              onLabelPress={onSkillLevelPress("ADVANCED")}
              aria-labelledby="Advanced"
            />
          </RadioGroup>
          <Select
            defaultValue={{ value: "2", label: "2" }}
            // @ts-ignore
            onValueChange={onChangeMaxParticipants}
          >
            <SelectTrigger className="w-[250px]">
              <SelectValue
                className="text-foreground text-sm native:text-lg"
                placeholder="Select maximum number of participants"
              />
            </SelectTrigger>
            <SelectContent
              insets={contentInsets}
              sideOffset={sideOffset}
              className="w-[250px]"
              portalHost="modal-example"
            >
              <SelectGroup>
                <SelectItem label="2" value="2">
                  2
                </SelectItem>
                <SelectItem label="3" value="3">
                  3
                </SelectItem>
                <SelectItem label="4" value="4">
                  4
                </SelectItem>
                <SelectItem label="5" value="5">
                  5
                </SelectItem>
                <SelectItem label="6" value="6">
                  6
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {/* 
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
          /> */}
          <PortalHost name="modal-example" />
        </View>
        <CustomPressable
          textElement={<Text>Create Session</Text>}
          onPress={() => createSessionMutation.mutate()}
        />
      </View>
    </Modal>
  );
};

function RadioGroupItemWithLabel({
  value,
  displayValue,
  onLabelPress,
}: {
  value: string;
  displayValue: string;
  onLabelPress: () => void;
}) {
  return (
    <View className={"flex-row gap-2 items-center"}>
      <RadioGroupItem aria-labelledby={`label-for-${value}`} value={value} />
      <Label nativeID={`label-for-${value}`} onPress={onLabelPress}>
        {displayValue}
      </Label>
    </View>
  );
}

export default CreateSessionModal;
