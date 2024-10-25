interface IUser {
	user_id: string;
	name: string;
	email: string;
	providerId: string;
	avatarUrl: string;
	created_at: Date;
	updated_at: Date;
	location: string;
	bio: string;
	climbing_level: string;
	gender: string;
	sessions_joined: number;
}

export type TUserParticipant = {
	user: {
		avatarUrl: string;
		name: string;
	};
};

export default IUser;
