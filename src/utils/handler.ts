function factory() {

    return {

        error: (fn: any) => {
            return async (req, res, next) => {

                try {

                    await fn(req, res, next);

                } catch (error) {

                    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
                    // console.log('REQEUST:   ', req)
                    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
                    console.error(error.name)
                    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
                    console.error(error.message)
                    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
                    console.error(error.trace)
                    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
                    console.error(error.cause)
                    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
                    console.error(error.stack)
                    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
                    console.error(error.code)
                    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
                    console.error(error.code)
                    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');

                    // Aqui você poderia salvar no banco:
                    // await FailModel.upsert({ name: error.name, message: error.message, stack: error.stack });

                    res.status(500).json({ success: false, data: null, message: 'Internal server error.', });

                }

            };

        }

    };
}

const handler = factory();
export default handler;