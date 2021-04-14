"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const { Schema, model } = require('mongoose');
const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    displayName: { type: String, required: true },
    email: { type: String, default: '' },
});
exports.User = model('User', userSchema);
//# sourceMappingURL=users.js.map