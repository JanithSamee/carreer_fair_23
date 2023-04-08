import Global from "../models/global.model.js";
import { formatError } from "../utils/formatData.js";

async function setParams(req, res) {
    try {
        const { registrationDeadLine, eventDate } = req.body;
        const globalData = new Global({ registrationDeadLine, eventDate });

        await globalData.save();
        res.status(200).send({
            error: false,
            data: {
                registrationDeadLine: new Date(registrationDeadLine),
                eventDate: new Date(eventDate),
            },
        });
    } catch (error) {
        res.status(500).send({ error: true, data: formatError(error) });
    }
}
async function getParams(req, res) {
    try {
        const params = await Global.find();

        if (!params) {
            res.status(404).send({
                error: true,
                data: "Global Parameters does not found!",
            });
        }

        res.status(200).send({
            error: false,
            data: params,
        });
    } catch (error) {
        res.status(500).send({ error: true, data: formatError(error) });
    }
}

export { setParams, getParams };
