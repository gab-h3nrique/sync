import { spawn } from 'child_process'
import { ProjectModel } from "../models/projectModel";
import { ProjectType } from "../types/projectType";
import ProjectCommand from '../utils/projectCommand';

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
        
        get: async(req: any, res: any) => {

            const data = {

                test: process.env.TEST_ENV || 'not set'

            }

            return res.status(200).json({ success: true, data, message: '' });
        
        },
    
    }

}

const testController = factory()

export default testController
