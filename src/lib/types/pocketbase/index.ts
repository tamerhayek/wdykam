/**
 * This file was @generated using pocketbase-typegen
 */

import type PocketBase from 'pocketbase';
import type { RecordService } from 'pocketbase';

export enum Collections {
	Authorigins = '_authOrigins',
	Externalauths = '_externalAuths',
	Mfas = '_mfas',
	Otps = '_otps',
	Superusers = '_superusers',
	Answers = 'answers',
	Participants = 'participants',
	Questions = 'questions',
	Users = 'users'
}

// Alias types for improved usability
export type IsoDateString = string;
export type RecordIdString = string;
export type HTMLString = string;

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString;
	collectionId: string;
	collectionName: Collections;
	expand?: T;
};

export type AuthSystemFields<T = never> = {
	email: string;
	emailVisibility: boolean;
	username: string;
	verified: boolean;
} & BaseSystemFields<T>;

// Record types for each collection

export type AuthoriginsRecord = {
	collectionRef: string;
	created?: IsoDateString;
	fingerprint: string;
	id: string;
	recordRef: string;
	updated?: IsoDateString;
};

export type ExternalauthsRecord = {
	collectionRef: string;
	created?: IsoDateString;
	id: string;
	provider: string;
	providerId: string;
	recordRef: string;
	updated?: IsoDateString;
};

export type MfasRecord = {
	collectionRef: string;
	created?: IsoDateString;
	id: string;
	method: string;
	recordRef: string;
	updated?: IsoDateString;
};

export type OtpsRecord = {
	collectionRef: string;
	created?: IsoDateString;
	id: string;
	password: string;
	recordRef: string;
	sentTo?: string;
	updated?: IsoDateString;
};

export type SuperusersRecord = {
	created?: IsoDateString;
	email: string;
	emailVisibility?: boolean;
	id: string;
	password: string;
	tokenKey: string;
	updated?: IsoDateString;
	verified?: boolean;
};

export enum AnswersAnswerOptions {
	'one' = 'one',
	'two' = 'two',
	'three' = 'three',
	'four' = 'four'
}
export type AnswersRecord = {
	answer?: AnswersAnswerOptions;
	created?: IsoDateString;
	id: string;
	participant?: RecordIdString;
	related_question?: RecordIdString;
	updated?: IsoDateString;
};

export type ParticipantsRecord = {
	avatar?: string;
	created?: IsoDateString;
	id: string;
	name?: string;
	updated?: IsoDateString;
};

export enum QuestionsCorrectAnswerOptions {
	'one' = 'one',
	'two' = 'two',
	'three' = 'three',
	'four' = 'four'
}
export type QuestionsRecord = {
	answer_four?: string;
	answer_one?: string;
	answer_three?: string;
	answer_two?: string;
	correct_answer?: QuestionsCorrectAnswerOptions;
	created?: IsoDateString;
	id: string;
	image_four?: string;
	image_one?: string;
	image_three?: string;
	image_two?: string;
	question?: string;
	updated?: IsoDateString;
};

export type UsersRecord = {
	avatar?: string;
	created?: IsoDateString;
	email: string;
	emailVisibility?: boolean;
	id: string;
	name?: string;
	password: string;
	tokenKey: string;
	updated?: IsoDateString;
	verified?: boolean;
};

// Response types include system fields and match responses from the PocketBase API
export type AuthoriginsResponse<Texpand = unknown> = Required<AuthoriginsRecord> &
	BaseSystemFields<Texpand>;
export type ExternalauthsResponse<Texpand = unknown> = Required<ExternalauthsRecord> &
	BaseSystemFields<Texpand>;
export type MfasResponse<Texpand = unknown> = Required<MfasRecord> & BaseSystemFields<Texpand>;
export type OtpsResponse<Texpand = unknown> = Required<OtpsRecord> & BaseSystemFields<Texpand>;
export type SuperusersResponse<Texpand = unknown> = Required<SuperusersRecord> &
	AuthSystemFields<Texpand>;
export type AnswersResponse<Texpand = unknown> = Required<AnswersRecord> &
	BaseSystemFields<Texpand>;
export type ParticipantsResponse<Texpand = unknown> = Required<ParticipantsRecord> &
	BaseSystemFields<Texpand>;
export type QuestionsResponse<Texpand = unknown> = Required<QuestionsRecord> &
	BaseSystemFields<Texpand>;
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>;

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	_authOrigins: AuthoriginsRecord;
	_externalAuths: ExternalauthsRecord;
	_mfas: MfasRecord;
	_otps: OtpsRecord;
	_superusers: SuperusersRecord;
	answers: AnswersRecord;
	participants: ParticipantsRecord;
	questions: QuestionsRecord;
	users: UsersRecord;
};

export type CollectionResponses = {
	_authOrigins: AuthoriginsResponse;
	_externalAuths: ExternalauthsResponse;
	_mfas: MfasResponse;
	_otps: OtpsResponse;
	_superusers: SuperusersResponse;
	answers: AnswersResponse;
	participants: ParticipantsResponse;
	questions: QuestionsResponse;
	users: UsersResponse;
};

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: '_authOrigins'): RecordService<AuthoriginsResponse>;
	collection(idOrName: '_externalAuths'): RecordService<ExternalauthsResponse>;
	collection(idOrName: '_mfas'): RecordService<MfasResponse>;
	collection(idOrName: '_otps'): RecordService<OtpsResponse>;
	collection(idOrName: '_superusers'): RecordService<SuperusersResponse>;
	collection(idOrName: 'answers'): RecordService<AnswersResponse>;
	collection(idOrName: 'participants'): RecordService<ParticipantsResponse>;
	collection(idOrName: 'questions'): RecordService<QuestionsResponse>;
	collection(idOrName: 'users'): RecordService<UsersResponse>;
};
