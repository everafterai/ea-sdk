"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
         * @param {string} name    - The users name.
         * @param {string} [accountId]  - The account ID of which the user belongs to. If not provided, will try to mach account according to "Manage Users" table in account's persona screen
         * @param {string} [personaName] - The persona (role) name  of the user.If not provided, will try to mach persona according to "Manage Users" table in account's persona screen
         *
         * @returns {Promise<string>} - A url to the users customer hub
         */
        this.getEmbedUrl = function (email, name, accountId, personaName) {
            if (accountId === void 0) { accountId = ''; }
            if (personaName === void 0) { personaName = ''; }
            return Embed_1.embed.getUrl(_this.workspace, accountId, personaName, email, name);
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
        this.EmbedToIframe = function (email, name, iframeCssSelector, accountId, personaName) {
            if (accountId === void 0) { accountId = ''; }
            if (personaName === void 0) { personaName = ''; }
            return __awaiter(_this, void 0, void 0, function () {
                var url, elements, index, element, iframeElement, err_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, Embed_1.embed.getUrl(this.workspace, accountId, personaName, email, name)];
                        case 1:
                            url = _a.sent();
                            elements = document.querySelectorAll(iframeCssSelector);
                            for (index = 0; index < elements.length; index++) {
                                element = elements[index];
                                if (element.tagName.toLowerCase() === 'iframe') {
                                    iframeElement = element;
                                    iframeElement.src = url;
                                    break;
                                }
                            }
                            return [3 /*break*/, 3];
                        case 2:
                            err_1 = _a.sent();
                            console.warn("couldn't open EverAfter embed page", err_1);
                            return [2 /*return*/, false];
                        case 3: return [2 /*return*/, true];
                    }
                });
            });
        };
        this.workspace = workspace;
        this.embed = Embed_1.embed;
    }
    return EverAfter;
}());
exports.EverAfter = EverAfter;
//# sourceMappingURL=index.js.map