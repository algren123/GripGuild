import { TSkillLevel } from "@/constants/SkillLevels";

export interface ISessionParticipant {
	participant_id: string;
	createdAt: Date;
	updatedAt: Date;
	user_id: string;
	session_id: string;
	joinedAt: Date;
	lobbyActive: boolean;
}

export interface ISession {
	session_id: string;
	created_at: Date;
	creator_id: string;
	date: string;
	gym_id: string;
	type: "PUBLIC" | "PRIVATE";
	skill_level: TSkillLevel;
	max_participants: number;
	gender_pref: "ALLGENDERS" | "MALEONLY" | "FEMALEONLY";
	notes?: string;
	creator: {
		name: string;
		avatarUrl: string;
	};
	gym: {
		name: string;
	};
	participants: ISessionParticipant[];
}
