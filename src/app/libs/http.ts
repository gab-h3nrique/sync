
interface Options {

    headers?: {
        contentType?: ContentType
    }
    contentType?: ContentType

}

function factory() {
    /**
    *
    * 
    * `baseUrl` base url to concact with route
    * 
    *
    */
    const BASE_URL: string = process.env.VITE_BASES_URL || '';
    /**
    *
    * 
    *
    * 
    *
     */
    async function resolveResponse(response: Response) {

        try {

            // exibe card de plano expirado
            // if(response.status === 451) console.log(`Ocorreu um erro no servidor com o status code ${response.status}`)

            // captura algum erro e exibe o alert no app
            // if(response.status >= 500) console.log(`Ocorreu um erro no servidor com o status code ${response.status}`)

            const contentType = response.headers.get('content-type');

            if(!response.ok) return fetchAdapterError(response)
            // if(!response.ok) throw new Error(`HTTP Error`);
    
            if(!contentType) return null
    
            if(contentType.includes('application/json')) return await response.json()
    
            if(contentType.includes('text/')) return await response.text()
    
            return await response.blob()
            
        } catch (error) {

            console.error('Error resolving response:', error);

            throw error;

        }

    }
    /**
    *
    * 
    * 
    *
    */
    return {
        /**
        * `Api` is a fetch factory that provide simple http methods.
        * 
        * It used the same API RESTful design pattern.
        *
        * ```js
        * 
        * await Api.get('www.example.users')
        * 
        * await Api.get('www.example/products', { id:1 })
        * 
        * await Api.get('www.example/xml', { id:1 }, { contentType: 'application/xml' })
        * 
        * 
        * ```
        *
        * See `www.google.com` for more information.
        * @since v0.1 by [`Gabriel henrique`](https://github.com/gab-h3nrique)
        */
        get: async (url: string, object: any = null, options?: Options): Promise<JSON | any> => {

            // const user = await storage.get('user')
            // const loja = await storage.get('loja')

            const response = await fetch(BASE_URL + url + `${ object ? `?${new URLSearchParams(object)}` : ''}`, {

                method: 'GET',
                // mode: 'cors', 
                headers: {
                    // 'Access-Control-Allow-Origin': "*",
                    'Content-Type': options?.contentType || 'application/json;charset=utf-8',
                    // 'Authorization': `Bearer ${ user?.token || '' }`,
                    // 'idLoja': loja?.codConcessionaria || '',
                    // 'idUsuario': user?.id || '',
                    // 'versaoApp': retornaVersao() || ''
                },

            })

            return resolveResponse(response)

        },
        /**
        * `Api` is a fetch factory that provide simple http methods.
        * 
        * It used the same API RESTful design pattern.
        *
        * ```js
        * 
        * await Api.post('www.example.users')
        * 
        * await Api.post('www.example/products', product)
        * 
        * await Api.post('www.example/xml', file, { contentType: 'application/xml' })
        * 
        * 
        * ```
        *
        * See `www.google.com` for more information.
        * @since v0.1 by [`Gabriel henrique`](https://github.com/gab-h3nrique)
        */
        post: async (url: string, object: any = null, options?: Options): Promise<JSON | any> => {

            // const user = await storage.get('user')
            // const loja = await storage.get('loja')

            const response = await fetch(BASE_URL + url, {

                method: 'POST',
                // mode: 'cors', 
                headers: {
                    ...options?.headers,
                    // 'Access-Control-Allow-Origin': "*",
                    'Content-Type': options?.contentType || 'application/json;charset=utf-8',
                    // 'Authorization': `Bearer ${ user?.token || '' }`,
                    // 'idLoja': loja?.codConcessionaria || '',
                    // 'idUsuario': user?.id || '',
                    // 'versaoApp': retornaVersao() || ''
                },
                body: JSON.stringify(object)
                
            })

            return resolveResponse(response)

        },
        /**
        * `Api` is a fetch factory that provide simple http methods.
        * 
        * It used the same API RESTful design pattern.
        *
        * ```js
        * 
        * await Api.delete('www.example/products', { id: 1 })
        * 
        * 
        * ```
        *
        * See `www.google.com` for more information.
        * @since v0.1 by [`Gabriel henrique`](https://github.com/gab-h3nrique)
        */
        delete: async (url: string, object: any = null, options?: Options): Promise<JSON | any> => {

            // const user = await storage.get('user')
            // const loja = await storage.get('loja')

            const response = await fetch(BASE_URL + url + `${ object ? `?${new URLSearchParams(object)}` : ''}`, {

                method: 'DELETE',
                // mode: 'cors', 
                headers: {
                    ...options?.headers,
                    // 'Access-Control-Allow-Origin': "*",
                    // 'Access-Control-Allow-Headers': "*",
                    'Content-Type': options?.contentType || 'application/json;charset=utf-8',
                    // 'Authorization': `Bearer ${ user?.token || '' }`,
                    // 'idLoja': loja?.codConcessionaria || '',
                    // 'idUsuario': user?.id || '',
                    // 'versaoApp': retornaVersao() || ''
                },

            })

            return resolveResponse(response)

        },
        /**
        * `Api` is a fetch factory that provide simple http methods.
        * 
        * It used the same API RESTful design pattern.
        *
        * ```js
        * 
        * await Api.upload('www.example/products', file)
        * 
        * await Api.upload('www.example/products', { id: 1, file})
        * 
        * 
        * ```
        *
        * See `www.google.com` for more information.
        * @since v0.1 by [`Gabriel henrique`](https://github.com/gab-h3nrique)
        */
        upload: async (url: string, object: any = null, options?: Options): Promise<JSON | any> => {

            // const user = await storage.get('user')
            // const loja = await storage.get('loja')

            function prepareBody(object: any): BodyInit {

                if (object instanceof Blob || object instanceof File) {
                    const formData = new FormData();
                    formData.append('file', object);
                    return formData;
                }
        
                return JSON.stringify(object);
        
            }

            const response = await fetch(BASE_URL + url, {

                method: 'POST',
                // mode: 'no-cors', 
                headers: {
                    ...options?.headers,
                    // 'Access-Control-Allow-Origin': "*",
                    // 'Access-Control-Allow-Headers': "*",
                    'Content-Type': options?.contentType || 'application/json;charset=utf-8',
                    // 'Authorization': `Bearer ${ user?.token || '' }`,
                    // 'idLoja': loja?.codConcessionaria || '',
                    // 'idUsuario': user?.id || '',
                    // 'versaoApp': retornaVersao() || ''
                },
                body: prepareBody(object)
                
            })

            return resolveResponse(response)

        }

    }
}
/**
* `Api` is a fetch factory that provide simple http methods.
* 
* It used the same API RESTful design pattern.
*
* ```js
* 
* await Api.get('www.example/products', { id:1 })
* 
* await Api.post('www.example/products', product)
* 
* await Api.delete('www.example/products', { id: 1 })
* 
* 
* 
* ```
*
* See `www.google.com` for more information.
* @since v0.1 by [`Gabriel henrique`](https://github.com/gab-h3nrique)
*/
const Http = factory();

export default Http






async function fetchAdapterError(response: Response) {

    const resolved = await response.json()

    let error = { 
        body: response?.body,
        bodyUsed: response?.bodyUsed,
        headers: response?.headers,
        ok: response?.ok,
        redirected: response?.redirected,
        status: response?.status,
        statusText: response?.statusText,
        message: resolved?.message || response?.statusText,
        type: response?.type,
        url: response?.url,
        response: resolved
    }

    throw(error);

}

//////////////////////////////
type ContentType = 

    // json
    'application/json;charset=utf-8' |  
    'application/json' |  

    // images
    'image/gif' | 
    'image/tiff' | 
    'image/jpeg' | 
    'image/png' | 
    'image/webp' | 
    'image/x-icon' | 
    'image/vnd.microsoft.icon' | 

    // audios
    'audio/mpeg' | 
    'audio/vnd.rn-realaudio' | 
    'audio/x-wav' | 
    'audio/x-ms-wma' | 
    
    // videos
    'video/x-ms-wmv' | 
    'video/x-msvideo' | 
    'video/webm' | 
    'video/mp4' | 
    'video/x-flv' | 
    'video/quicktime' | 

    // files
    'text/xml' | 
    'application/xml' |  
    'application/pdf' |  
    'application/zip' | 
    'application/ogg' 

//////////////////////////////
const httpStatusCode: any = {
    // 1xx - Informational
    '100': 'Continue',
    '101': 'Switching Protocols',
    '102': 'Processing',
    '103': 'Early Hints',

    // 2xx - Success
    '200': 'OK',
    '201': 'Created',
    '202': 'Accepted',
    '203': 'Non-Authoritative Information',
    '204': 'No Content',
    '205': 'Reset Content',
    '206': 'Partial Content',
    '207': 'Multi-Status',
    '208': 'Already Reported',
    '226': 'IM Used',

    // 3xx - Redirection
    '300': 'Multiple Choices',
    '301': 'Moved Permanently',
    '302': 'Found',
    '303': 'See Other',
    '304': 'Not Modified',
    '305': 'Use Proxy',
    '306': '(Unused)',
    '307': 'Temporary Redirect',
    '308': 'Permanent Redirect',

    // 4xx - Client Errors
    '400': 'Bad Request',
    '401': 'Unauthorized',
    '402': 'Payment Required',
    '403': 'Forbidden',
    '404': 'Not Found',
    '405': 'Method Not Allowed',
    '406': 'Not Acceptable',
    '407': 'Proxy Authentication Required',
    '408': 'Request Timeout',
    '409': 'Conflict',
    '410': 'Gone',
    '411': 'Length Required',
    '412': 'Precondition Failed',
    '413': 'Payload Too Large',
    '414': 'URI Too Long',
    '415': 'Unsupported Media Type',
    '416': 'Range Not Satisfiable',
    '417': 'Expectation Failed',
    '418': 'I\'m a teapot',
    '421': 'Misdirected Request',
    '422': 'Unprocessable Entity',
    '423': 'Locked',
    '424': 'Failed Dependency',
    '425': 'Too Early',
    '426': 'Upgrade Required',
    '428': 'Precondition Required',
    '429': 'Too Many Requests',
    '431': 'Request Header Fields Too Large',
    '451': 'Unavailable For Legal Reasons',

    // 5xx - Server Errors
    '500': 'Internal Server Error',
    '501': 'Not Implemented',
    '502': 'Bad Gateway',
    '503': 'Service Unavailable',
    '504': 'Gateway Timeout',
    '505': 'HTTP Version Not Supported',
    '506': 'Variant Also Negotiates',
    '507': 'Insufficient Storage',
    '508': 'Loop Detected',
    '510': 'Not Extended',
    '511': 'Network Authentication Required',
};
