import { embed, Embed } from './connect/Embed';

export class EverAfter {
	workspace: string;
	embed: Embed;
	constructor(workspace: string) {
		this.workspace = workspace;
		this.embed = embed;
	}

	/**
	 * Returns the url to a customer's hub.
	 *
	 * @param {string} email   - The users email address.
	 * @param {string} name    - The users name.
	 * @param {string} [accountId]  - The account ID of which the user belongs to. If not provided, will try to mach account according to "Manage Users" table in account's persona screen
	 * @param {string} [personaName] - The persona (role) name  of the user.If not provided, will try to mach persona according to "Manage Users" table in account's persona screen
	 *
	 * @returns {Promise<string>} - A url to the users customer hub
	 */
	getEmbedUrl = (
		email: string,
		name: string,
		accountId = '',
		personaName = ''
	): Promise<string> => {
		return embed.getUrl(this.workspace, accountId, personaName, email, name);
	};

	/**
	 * In client side only!
	 * generate an embed url and set it as the Iframe (fetched using the Iframe Id) src
	 * @param {string} email   - The users email address.
	 * @param {string} name    - The users name.
	 * @param {string} iframeCssSelector - The css selector of the Iframe into which you would like to open the url
	 * @param {string} [accountId]  - The account ID of which the user belongs to. If not provided, will try to mach account according to "Manage Users" table in account's persona screen
	 * @param {string} [personaName] - The persona (role) name  of the user.If not provided, will try to mach persona according to "Manage Users" table in account's persona screen
	 *
	 * @returns {Promise<boolean>} - True if succeeded
	 */
	EmbedToIframe = async (
		email: string,
		name: string,
		iframeCssSelector: string,
		accountId = '',
		personaName = ''
	) => {
		try {
			const url = await embed.getUrl(this.workspace, accountId, personaName, email, name);

			const elements = document.querySelectorAll(iframeCssSelector);
			for (let index = 0; index < elements.length; index++) {
				const element = elements[index];
				if (element.tagName.toLowerCase() === 'iframe') {
					const iframeElement = element as HTMLIFrameElement;
					iframeElement.src = url;
					break;
				}
			}
		} catch (err) {
			console.warn("couldn't open EverAfter embed page", err);
			return false;
		}
		return true;
	};
}
