import axios from 'axios';

export class Embed {
	getUrl = (
		workspaceId: string,
		accountId: string,
		personaName: string,
		email: string,
		name: string,
		embedLocation?: string,
		baseUrl?: string,
	) => {
		const apiUrl = baseUrl || 'https://production-server.everafter.ai';

		return axios
			.post(
				`${apiUrl}/embed/${workspaceId}`,
				{
					name,
					email,
					accountId,
					personaName,
					embedLocation
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
			.then((urlResponse: any) => {
				return urlResponse.data;
			});
	};
}

const embed = new Embed();
export { embed };
