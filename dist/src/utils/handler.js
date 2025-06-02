"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const failModel_1 = require("../models/failModel");
function factory() {
    return {
        error: (fn) => {
            return async (req, res, next) => {
                try {
                    await fn(req, res, next);
                }
                catch (error) {
                    const formatedData = {
                        url: req.url,
                        method: req.method,
                        headers: req.headers,
                        body: req.body,
                        query: req.query,
                    };
                    const formatedError = {
                        name: error.name || 'UnknownError',
                        message: error.message || 'An unknown error occurred.',
                        stack: error.stack || 'No stack trace available.',
                    };
                    const item = {
                        type: 'api',
                        name: error.name,
                        message: error.message,
                        data: formatedData,
                        error: formatedError,
                    };
                    await failModel_1.FailModel.upsert(item);
                    return res.status(500).json({ success: false, data: null, message: 'Internal server error.', });
                }
            };
        }
    };
}
const handler = factory();
exports.default = handler;
