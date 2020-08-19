import { Embed } from './connect/Embed';
export declare class EverAfter {
    workspace: string;
    embed: Embed;
    constructor(workspace: string);
    /**
     * Returns the url to a customer's hub.
     *
     * @param {string} email   - The users email address.
     * @param {string} [accountId]  - The account ID of which the user belongs to. If not provided, will try to mach account according to "Manage Users" table in account's persona screen
     * @param {string} [personaName] - The persona (role) name  of the user.If not provided, will try to mach persona according to "Manage Users" table in account's persona screen
     *
     * @returns {Promise<string>} - A url to the users customer hub
     */
    getEmbedUrl: (email: string, accountId?: string, personaName?: string) => Promise<string>;
}
