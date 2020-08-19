"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EverAfter = void 0;
var Embed_1 = require("./connect/Embed");
var EverAfter = /** @class */ (function () {
    function EverAfter(workspace) {
        var _this = this;
        /**
         * Returns the url to a customer's hub.
         *
         * @param {string} email   - The users email address.
         * @param {string} [accountId]  - The account ID of which the user belongs to. If not provided, will try to mach account according to "Manage Users" table in account's persona screen
         * @param {string} [personaName] - The persona (role) name  of the user.If not provided, will try to mach persona according to "Manage Users" table in account's persona screen
         *
         * @returns {Promise<string>} - A url to the users customer hub
         */
        this.getEmbedUrl = function (email, accountId, personaName) {
            if (accountId === void 0) { accountId = ''; }
            if (personaName === void 0) { personaName = ''; }
            return Embed_1.embed.getUrl(_this.workspace, accountId, personaName, email, '');
        };
        this.workspace = workspace;
        this.embed = Embed_1.embed;
    }
    return EverAfter;
}());
exports.EverAfter = EverAfter;
//# sourceMappingURL=index.js.map