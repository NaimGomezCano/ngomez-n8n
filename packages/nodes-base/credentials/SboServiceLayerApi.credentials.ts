import type {
	ICredentialType,
	INodeProperties,
	Icon,
	IAuthenticateGeneric,
	ICredentialTestRequest,
} from 'n8n-workflow';

export class SboServiceLayerApi implements ICredentialType {
	name = 'sboServiceLayerApi';
	displayName = 'SBO Service Layer API';
	documentationUrl = 'sapServiceLayer'; // docs/sapServiceLayer.md
	icon: Icon = 'file:sap.svg'; // pon el SVG en /assets/icons

	/**
	 * Propiedades que el usuario rellena en la UI
	 */
	properties: INodeProperties[] = [
		{
			displayName: 'Service Layer URL',
			name: 'url',
			type: 'string',
			default: 'https://sap-host:50000/b1s/v1',
			required: true,
		},
		{
			displayName: 'Company DB',
			name: 'companyDB',
			type: 'string',
			default: '',
			required: true,
		},
		{
			displayName: 'Username',
			name: 'username',
			type: 'string',
			default: '',
			required: true,
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
		},
		{
			displayName: 'Language',
			name: 'language',
			type: 'number',
			default: 1,
			description: '1 = EN, 2 = DE, 3 = PT-BR…',
		},
		// Campo oculto que guardará la cookie y expirará automáticamente
		{
			displayName: 'Cookie',
			name: 'cookie',
			type: 'hidden',
			typeOptions: { expirable: true },
			default: '',
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic' as const,
		properties: {
			headers: {
				'Content-Type': 'application/json',
			},
		},
	};
	test: ICredentialTestRequest = {
		request: {
			method: 'POST',
			url: '={{$credentials.url}}/Login',
			body: {
				CompanyDB: '={{$credentials.companyDB}}',
				UserName: '={{$credentials.username}}',
				Password: '={{$credentials.password}}',
				Language: '={{$credentials.language || 1}}',
			},
			skipSslCertificateValidation: true,
		},
	};
}
