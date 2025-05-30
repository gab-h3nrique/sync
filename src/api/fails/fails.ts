import { FailModel } from "../../models/failModel";

function factory() {

    
    return {
        
        get: async(req: Request, res: any) => {

            const item: any = null

            const result = FailModel.upsert(item)

            res.status(200).json({ success: true, data: item,  message: 'request received' });
        
        },

        post: async(req: Request, res: any) => {

    
            res.status(200).json({ success: true, message: 'request received' });
        
        },

        delete: async(req: Request, res: any) => {

    
            res.status(200).json({ success: true, message: 'request received' });
        
        }
    
    
    }




}

const fails = factory()

export default fails
