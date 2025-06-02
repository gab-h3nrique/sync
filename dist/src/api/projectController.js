"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const projectModel_1 = require("../models/projectModel");
const projectCommand_1 = __importDefault(require("../utils/projectCommand"));
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
                return res.status(200).json({ success: true, data: await projectModel_1.ProjectModel.find(Number(id)), message: '' });
            if (!page || !limit)
                return res.status(200).json({ success: true, data: await projectModel_1.ProjectModel.get(input), message: '' });
            const index = (Number(page) - 1) * Number(limit);
            const { data, total } = await projectModel_1.ProjectModel.paginated(index, Number(limit), (input || ''), startDate, endDate);
            return res.status(200).json({ success: true, data, total, message: '' });
        },
        post: async (req, res) => {
            const { body } = req;
            const item = {
                id: body.id ? Number(body.id) : undefined,
                name: body.name ? String(body.name) : '',
                url: body.url ? String(body.url) : '',
                envs: body.envs || {},
                commands: body.commands || {},
                status: body.stauts ? String(body.stauts) : '',
            };
            if (!item.name)
                return res.status(400).json({ success: false, data: null, message: 'Name is required.' });
            if (!item.url)
                return res.status(400).json({ success: false, data: null, message: 'URL is required.' });
            const data = await projectModel_1.ProjectModel.upsert(item);
            return res.status(200).json({ success: true, data: data, message: '', });
        },
        delete: async (req, res) => {
            const { query } = req;
            const id = query.id ? Number(query.id) : undefined;
            if (!id)
                return res.status(400).json({ success: false, data: null, message: 'ID is required' });
            const project = await projectModel_1.ProjectModel.find(id);
            if (!project)
                return res.status(404).json({ success: false, data: null, message: 'Data not found' });
            await projectModel_1.ProjectModel.delete(project.id);
            projectCommand_1.default.delete(project);
            return res.status(200).json({ success: true, data: null, message: 'Data deleted successfully' });
        },
        start: async (req, res) => {
            const id = Number(req.params.id);
            const project = await projectModel_1.ProjectModel.find(id);
            if (!project)
                return res.status(404).json({ success: false, data: null, message: 'Project not found.' });
            projectCommand_1.default.run(project);
            return res.status(200).json({ success: true, data: null, message: 'Project starting.' });
        },
        stop: async (req, res) => {
            const id = Number(req.params.id);
            const project = await projectModel_1.ProjectModel.find(id);
            if (!project)
                return res.status(404).json({ success: false, data: null, message: 'Project not found.' });
            projectCommand_1.default.stop(project);
            return res.status(200).json({ success: true, data: null, message: 'Project stopping.' });
        },
    };
}
const projectController = factory();
exports.default = projectController;
