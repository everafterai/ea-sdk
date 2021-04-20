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
	 * ****** DEPRECATED, please use embedToElement method instead ******
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
			console.warn('****** DEPRECATED, please use embedToElement method instead ******')
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

	/**
	 * In client side only!
	 * generate an embed url and set it as the Iframe (fetched using the Iframe Id) src
	 * @param {string} elementId  - ID of the element you want to replace with embedded Iframe.
	 * @param {string} email      - The users email address.
	 * @param {string} name       - The users name.
	 * @param {object} [options]  - A dictionary of optional values
	 * @param {string} [options.accountId] - The account ID of which the user belongs to. If not provided, will try to mach account according to "Manage Users" table in account's persona screen
	 * @param {string} [options.personaName] - The persona (role) name  of the user.If not provided, will try to mach persona according to "Manage Users" table in account's persona screen
	 * @param {string} [options.embedLocation] - Embed location
	 *
	 * @returns {Promise<boolean>} - True if succeeded
	 */
	embedToElement = async (
		elementId: string,
		email: string,
		name: string,
		options?: {
			accountId?: string,
			personaName?: string,
			embedLocation?: string
		}
	) => {
		try {
			const accountId = options?.accountId || '';
			const personaName = options?.personaName || '';
			const embedLocation = options?.embedLocation || '';
			const url = await embed.getUrl(this.workspace, accountId, personaName, email, name, embedLocation);

			const sourceElement = document.getElementById(elementId);
			if (!sourceElement) {
				throw new Error(`No element with id "${elementId}" was found`)
			}
			const iframe = document.createElement("iframe");
			// @ts-ignore
			Object.values(sourceElement.attributes).forEach(attribute => {
				iframe.setAttribute(attribute.name, attribute.value)
			})
			iframe.innerHTML = sourceElement.innerHTML;
			iframe.src = url;
			sourceElement.replaceWith(iframe)
		} catch (err) {
			console.error("couldn't open EverAfter embed page", err);
			return false;
		}
		return true;
	};
}
