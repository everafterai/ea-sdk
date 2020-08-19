"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.embed = exports.Embed = void 0;
var axios_1 = __importDefault(require("axios"));
var Embed = /** @class */ (function () {
    function Embed() {
        this.getUrl = function (workspaceId, accountId, personaName, email, name) {
            return axios_1.default
                .post("https://production-server.everafter.ai/embed/" + workspaceId, {
                name: name,
                email: email,
                accountId: accountId,
                personaName: personaName,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(function (urlResponse) {
                return urlResponse.data;
            });
        };
    }
    return Embed;
}());
exports.Embed = Embed;
var embed = new Embed();
exports.embed = embed;
//# sourceMappingURL=Embed.js.map