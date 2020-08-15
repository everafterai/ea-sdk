import axios from 'axios';

export class Embed {
	getUrl = (
		workspaceId: string,
		accountId: string,
		personaName: string,
		email: string,
		name: string
	) => {
		return axios
			.post(
				`https://production-server.everafter.ai/embed/${workspaceId}`,
				{
					name,
					email,
					accountId,
					personaName,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
			.then((urlResponse) => {
				return urlResponse.data;
			});
	};
}

const embed = new Embed();
export { embed };
