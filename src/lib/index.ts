import { env } from '$env/dynamic/public';
import type { Collections } from './types/pocketbase';

export function getPocketbaseFileUrl(collection: Collections, id: string, file: string) {
	return `${env.PUBLIC_PB_INSTANCE_URL}/api/files/${collection}/${id}/${file}`;
}
