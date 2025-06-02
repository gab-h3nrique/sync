"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const failModel_1 = require("../models/failModel");
// 200 OK
// 201 Created
// 202 Accepted
// 203 Non-Authoritative Information
// 204 No Content
// 205 Reset Content
// 206 Partial Content
// 400 Bad Request
// 401 Unauthorized
// 402 Payment Required
// 403 Forbidden
// 405 Method Not Allowed
// 406 Not Acceptable
// 429 Too Many Requests
// 500 Internal Server Error
// 501 Not Implemented
// 502 Bad Gateway
// 503 Service Unavailable
function factory() {
    return {
        get: async (req, res) => {
            const { query } = req;
            const id = query.id ? Number(query.id) : null;
            const page = query.page ? Number(query.page) : null;
            const limit = query.limit ? Number(query.limit) : null;
            const input = query.input ? String(query.input) : '';
            const startDate = query.startDate ? String(query.startDate) : '';
            const endDate = query.endDate ? String(query.endDate) : '';
            if (id)
                return res.status(200).json({ success: true, data: await failModel_1.FailModel.find(Number(id)), message: '' });
            if (!page || !limit)
                return res.status(200).json({ success: true, data: await failModel_1.FailModel.get(input), message: '' });
            const index = (Number(page) - 1) * Number(limit);
            const { data, total } = await failModel_1.FailModel.paginated(index, Number(limit), (input || ''), startDate, endDate);
            return res.status(200).json({ success: true, data, total, message: '' });
        },
        post: async (req, res) => {
            const { body } = req;
            const item = {
                type: body.type || '',
                name: body.name || '',
                message: body.message,
                data: body.data,
                error: body.error,
            };
            await failModel_1.FailModel.upsert(item);
            return res.status(500).json({ success: false, data: null, message: 'Internal server error.', });
        },
        delete: async (req, res) => {
            const { query } = req;
            const id = query.id ? Number(query.id) : null;
            if (!id)
                return res.status(400).json({ success: false, data: null, message: 'ID is required' });
            const deleted = await failModel_1.FailModel.delete(id);
            if (!deleted)
                return res.status(404).json({ success: false, data: null, message: 'Fail not found' });
            return res.status(200).json({ success: true, data: null, message: 'Fail deleted successfully' });
        }
    };
}
const failsController = factory();
exports.default = failsController;
