import {
	IExecuteFunctions,
} from 'n8n-core';

import {
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import {
	OptionsWithUri,
} from 'request';

export class PostgresBackupApi implements INodeType {
	description: INodeTypeDescription = {
			displayName: 'PostgresBackupApi',
			name: 'postgresBackupApi',
			icon: 'file:PostgresBackupApi.svg',
			group: ['transform'],
			version: 1,
			description: 'Consume custom PostgresBackupApi API',
			defaults: {
					name: 'PostgresBackupApi',
					color: '#1A82e2',
			},
			inputs: ['main'],
			outputs: ['main'],
			credentials: [
				{
					name: 'postgresBackupApi',
					required: true,
				},
			],
			properties: [
				{
					displayName: 'Action',
					name: 'action',
					type: 'options',
					options: [
						{
							name: 'Ping',
							value: 'ping',
						},
						{
							name: 'Backup',
							value: 'backup',
						}
					],
					default: 'ping',
					required: true,
					description: 'The action it will run',
				},
				{
					displayName: 'DB Username',
					name: 'dbUsername',
					type: 'string',
					required: true,
					displayOptions: {
						show: {
							action: [
								'backup',
							]
						},
					},
					default:'',
					description:'Username of the postgresql database',
				},
				{
					displayName: 'DB Name',
					name: 'dbName',
					type: 'string',
					required: true,
					displayOptions: {
						show: {
							action: [
								'backup',
							]
						},
					},
					default:'',
					description:'Name of the postgresql database',
				},
				{
					displayName: 'DB Host',
					name: 'dbHost',
					type: 'string',
					required: false,
					displayOptions: {
						show: {
							action: [
								'backup',
							]
						},
					},
					default:'',
					description:'Host of the postgresql server',
				},
				{
					displayName: 'DB Port',
					name: 'dbPort',
					type: 'string',
					required: false,
					displayOptions: {
						show: {
							action: [
								'backup',
							]
						},
					},
					default:'',
					description:'Port of the postgresql server',
				}
			],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		let responseData;
		const credentials = await this.getCredentials('postgresBackupApi') as IDataObject;
		const action = await this.getNodeParameter('action', 0) as string;
		if (action == 'ping'){
			const options: OptionsWithUri = {
				headers: {
					'Accept': 'application/json',
				},
				method: 'GET',
				uri: `http://${credentials.workerUrl}/ping`,
				json: true,
			};
			responseData = await this.helpers.request(options);
		}
		if (action == 'backup'){
			const dbUsername = await this.getNodeParameter('dbUsername', 0) as string;
			const dbName = await this.getNodeParameter('dbName', 0) as string;
			const dbHost = await this.getNodeParameter('dbHost', 0) as string;
			const dbPort = await this.getNodeParameter('dbPort', 0) as string;
			const options: OptionsWithUri = {
				headers: {
						'Accept': 'application/json',
				},
				method: 'POST',
				body: {
					username: `${dbUsername}`,
					name: `${dbName}`,
					host: `${dbHost}`,
					port: `${dbPort}`,
				},
				uri: `http://${credentials.workerUrl}/backupadv`,
				json: true,
			};
			responseData = await this.helpers.request(options);
		}
		return [this.helpers.returnJsonArray(responseData)];
	}
}
// Use backup if not using host or port. To be updated
