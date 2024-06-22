"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isServerError = void 0;
function isServerError(error) {
    return error.type !== 'server';
}
exports.isServerError = isServerError;
