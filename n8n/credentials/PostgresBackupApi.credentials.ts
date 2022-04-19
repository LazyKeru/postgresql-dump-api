import {
	ICredentialType,
	NodePropertyTypes,
} from 'n8n-workflow';

export class PostgresBackupApi implements ICredentialType {
	name = 'postgresBackupApi';
	displayName = 'PostgresBackupApi Serets';
	documentationUrl = 'None';
	properties = [
			{
					displayName: 'Worker url',
					name: 'workerUrl',
					type: 'string' as NodePropertyTypes,
					default: '',
			}
	];
}
