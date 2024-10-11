import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Modal, View, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { FontAwesome } from "@expo/vector-icons";
import useUser from "@/hooks/useUser";
import { createSession } from "@/services/sessionService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { SessionType } from "@/constants/SessionType";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { TSkillLevel } from "@/constants/SkillLevels";
import { PortalHost, useModalPortalRoot } from "@rn-primitives/portal";
import { TGenderPreference } from "@/constants/GenderPreference";

interface IProps {
	isVisible: boolean;
	onClose: () => void;
}

type FormData = {
	sessionType: SessionType;
	skillLevel: TSkillLevel;
	maxParticipants: { value: string; label: string };
	genderPreference: TGenderPreference;
	gym: { value: string; label: string };
	date: Date;
};

const gyms = [
	{
		label: "Depot Armley",
		value: "a1c791f3-0a90-4cc7-8dfa-5b86192be995",
	},
	{
		label: "Depot Manchester",
		value: "654321",
	},
	{
		label: "Big Depot",
		value: "213231231",
	},
];

const CreateSessionModal = ({ isVisible, onClose }: IProps) => {
	const queryClient = useQueryClient();
	const { user } = useUser();
	const {
		control,
		reset: formReset,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		defaultValues: {
			sessionType: "PUBLIC",
			skillLevel: "BEGINNER",
			genderPreference: "ALLGENDERS",
			maxParticipants: { label: "2", value: "2" },
			date: new Date(),
			gym: gyms[0],
		},
	});

	const insets = useSafeAreaInsets();
	const { sideOffset, ...rootProps } = useModalPortalRoot();
	const contentInsets = {
		top: insets.top,
		bottom: insets.bottom + Math.abs(sideOffset),
		left: 0,
		right: 12,
	};

	const createSessionMutation = useMutation({
		mutationFn: (data: FormData) =>
			createSession({
				userId: user?.user_id,
				gymId: data.gym.value,
				sessionType: data.sessionType,
				notes: "",
				date: data.date,
				skillLevel: data.skillLevel,
				maxParticipants: Number(data.maxParticipants.value),
				genderPreference: data.genderPreference,
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["allSessions"] });
			queryClient.invalidateQueries({ queryKey: ["userSessions"] });
		},
	});

	const onSubmit = (data: FormData) => {
		console.log(data);
		createSessionMutation.mutate(data, {
			onError: () => Alert.alert("Session was not able to be created", "", [{ text: "Ok" }]),
			onSuccess: () =>
				Alert.alert("Session Created Successfully!", "", [
					{ text: "Ok", onPress: () => formReset() },
				]),
		});
	};

	return (
		<Modal animationType="slide" transparent visible={isVisible}>
			<View
				className="bg-background p-6 rounded-t-xl border-black border-2 h-auto mt-auto mx-auto w-full max-w-xl"
				{...rootProps}
				style={{ height: "65%" }}
			>
				<View className="flex-row justify-between items-center mb-4">
					<Text className="font-bold">Create Session</Text>
					<Button variant="ghost" onPress={onClose}>
						<FontAwesome name="close" size={24} color="black" />
					</Button>
				</View>
				<View className="my-2">
					<Label nativeID="gym">Gym</Label>
					<Controller
						control={control}
						name="gym"
						render={({ field: { onChange, value } }) => (
							<Select defaultValue={value} onValueChange={onChange}>
								<SelectTrigger className="w-full">
									<SelectValue
										className="text-foreground text-sm native:text-lg"
										placeholder="Select Gym"
									/>
								</SelectTrigger>
								<SelectContent
									insets={contentInsets}
									sideOffset={sideOffset}
									side="bottom"
									className="w-full"
									portalHost="modal-example"
								>
									<SelectGroup>
										{gyms.map((gym) => (
											<SelectItem
												key={gym.value}
												label={gym.label}
												value={gym.value}
											>
												<Text>{gym.label}</Text>
											</SelectItem>
										))}
									</SelectGroup>
								</SelectContent>
							</Select>
						)}
					/>
				</View>
				<View className="flex-row gap-20">
					<View className="flex-col gap-2 items-start justify-around">
						<View className="my-2">
							<Label nativeID="sessionType">Session Type</Label>
							<Controller
								control={control}
								rules={{
									required: true,
								}}
								render={({ field: { onChange, value } }) => (
									<RadioGroup
										value={value}
										onValueChange={onChange}
										className="gap-2"
									>
										<RadioGroupItemWithLabel
											value="PUBLIC"
											displayValue="Public"
											onLabelPress={() => onChange("PUBLIC")}
											aria-labelledby="Public"
										/>
										<RadioGroupItemWithLabel
											value="PRIVATE"
											displayValue="Private"
											onLabelPress={() => onChange("PRIVATE")}
											aria-labelledby="Private"
										/>
									</RadioGroup>
								)}
								name="sessionType"
							/>
						</View>
						<View className="my-2">
							<Label nativeID="genderPreference">Gender Preference</Label>
							<Controller
								control={control}
								name="genderPreference"
								render={({ field: { onChange, value } }) => (
									<RadioGroup value={value} onValueChange={onChange}>
										<RadioGroupItemWithLabel
											value="ALLGENDERS"
											displayValue="All Genders"
											onLabelPress={() => onChange("ALLGENDERS")}
											aria-labelledby="All Genders"
										/>
										<RadioGroupItemWithLabel
											value="FEMALEONLY"
											displayValue="Female Only"
											onLabelPress={() => onChange("FEMALEONLY")}
											aria-labelledby="Female Only"
										/>
										<RadioGroupItemWithLabel
											value="MALEONLY"
											displayValue="Male Only"
											onLabelPress={() => onChange("MALEONLY")}
											aria-labelledby="Male Only"
										/>
									</RadioGroup>
								)}
							/>
						</View>
					</View>
					<View className="flex-col gap-4 items-start justify-around">
						<View className="my-2">
							<Label nativeID="maxParticipants">Max Participants</Label>
							<Controller
								control={control}
								name="maxParticipants"
								render={({ field: { onChange, value } }) => (
									<Select defaultValue={value} onValueChange={onChange}>
										<SelectTrigger className="w-[120px]">
											<SelectValue
												className="text-foreground text-sm native:text-lg"
												placeholder="Select"
											/>
										</SelectTrigger>
										<SelectContent
											insets={contentInsets}
											sideOffset={sideOffset}
											className="w-[50px] z-50"
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
												<SelectItem label="7" value="7">
													7
												</SelectItem>
												<SelectItem label="8" value="8">
													8
												</SelectItem>
											</SelectGroup>
										</SelectContent>
									</Select>
								)}
							/>
						</View>
						<View className="my-2">
							<Label nativeID="skillLevel">Skill Level</Label>
							<Controller
								control={control}
								rules={{
									required: true,
								}}
								render={({ field: { onChange, value } }) => (
									<RadioGroup
										value={value}
										onValueChange={onChange}
										className="gap-2"
									>
										<RadioGroupItemWithLabel
											value="BEGINNER"
											displayValue="Beginner (V0 - V3)"
											onLabelPress={() => onChange("BEGINNER")}
											aria-labelledby="Beginner"
										/>
										<RadioGroupItemWithLabel
											value="INTERMEDIATE"
											displayValue="Intermediate (V4 - V6)"
											onLabelPress={() => onChange("INTERMEDIATE")}
											aria-labelledby="Intermediate"
										/>
										<RadioGroupItemWithLabel
											value="ADVANCED"
											displayValue="Advanced (V7+)"
											onLabelPress={() => onChange("ADVANCED")}
											aria-labelledby="Advanced"
										/>
									</RadioGroup>
								)}
								name="skillLevel"
							/>
						</View>
					</View>
				</View>
				<Button className="my-4 z-0" onPress={handleSubmit(onSubmit)}>
					<Text>Create Session</Text>
				</Button>
				<PortalHost name="modal-example" />
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
