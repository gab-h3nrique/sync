import { FailModel } from "../models/failModel";
import { FailType } from "../types/failType";

function factory() {

    return {

        error: (fn: any) => {
            return async (req, res, next) => {

                try {

                    await fn(req, res, next);

                } catch (error) {

                    const formatedData = {
                        url: req.url,
                        method: req.method,
                        headers: req.headers,
                        body: req.body,
                        query: req.query,
                    }

                    const formatedError = {
                        name: error.name || 'UnknownError',
                        message: error.message || 'An unknown error occurred.',
                        stack: error.stack || 'No stack trace available.',
                    }

                    const item: FailType = {
                        type: 'api',
                        name: error.name,
                        message: error.message,
                        data: formatedData,
                        error: formatedError,
                    }

                    await FailModel.upsert(item);

                    return res.status(500).json({ success: false, data: null, message: 'Internal server error.', });

                }

            };

        }

    };
}

const handler = factory();
export default handler;