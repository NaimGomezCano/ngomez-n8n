import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IHttpRequestMethods,
} from 'n8n-workflow';

export class SboServiceLayer implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'SAP Business One (ServiceLayer)',
		name: 'sboServiceLayer',
		group: ['transform'],
		icon: 'file:wtf.svg',
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with SAP Service Layer API',
		defaults: {
			name: 'Service Layer',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'sboServiceLayerApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Account',
						value: 'account',
						description:
							'Represents an individual account, which is an organization or person involved with your business (such as customers, competitors, and partners)',
					},
					{
						name: 'Attachment',
						value: 'attachment',
						description: 'Represents a file that a has uploaded and attached to a parent object',
					},
					{
						name: 'Case',
						value: 'case',
						description: 'Represents a case, which is a customer issue or problem',
					},
					{
						name: 'Contact',
						value: 'contact',
						description: 'Represents a contact, which is an individual associated with an account',
					},
					{
						name: 'Custom Object',
						value: 'customObject',
						description: 'Represents a custom object',
					},
					{
						name: 'Document',
						value: 'document',
						description: 'Represents a document',
					},
					{
						name: 'Flow',
						value: 'flow',
						description: 'Represents an autolaunched flow',
					},
					{
						name: 'Lead',
						value: 'lead',
						description: 'Represents a prospect or potential',
					},
					{
						name: 'Opportunity',
						value: 'opportunity',
						description: 'Represents an opportunity, which is a sale or pending deal',
					},
					{
						name: 'Search',
						value: 'search',
						description: 'Search records',
					},
					{
						name: 'Task',
						value: 'task',
						description:
							'Represents a business activity such as making a phone call or other to-do items. In the user interface, and records are collectively referred to as activities.',
					},
					{
						name: 'User',
						value: 'user',
						description: 'Represents a person, which is one user in system',
					},
				],
				default: 'lead',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			const resource = this.getNodeParameter('resource', i) as string;
			const method = this.getNodeParameter('method', i) as IHttpRequestMethods;

			const response = await this.helpers.requestWithAuthentication.call(this, 'sapApi', {
				method,
				uri: `https://apiasd.sap.com${resource}`,
				json: true,
			});

			returnData.push({ json: response });
		}

		return [returnData];
	}
}
