import { logFormatter } from "../utils/utils.js";
import Cow from "../schemas/itemSchema";

export const getAllByUser = (req, res) => {
    console.log(logFormatter("/getAllByUser/ called with params: " + req.params));
    if (!req.params.userId) {
        return res.status(400).send("Must include userId param");
    }
    Cow.find({ owner: req.params.userId })
        .then((found) => {
            if (found.length == 0) {
                console.log(logFormatter("No records exist for user" + req.params.userId));
                return res.status(204).send();
            }
            return res.status(200).send({ records: found });
        })
        .catch((err) => {
            return res.status(400).send(err);
        });
};

export const getAll = (req, res) => {
    console.log(logFormatter("/getAll/ called"));
    Cow.find({})
        .then((found) => {
            if (found.length == 0) {
                console.log(logFormatter("No records exist"));
                return res.status(204).send();
            }
            return res.status(200).send({ records: found });
        })
        .catch((err) => {
            return res.status(400).send(err);
        });
};

export const create = (req, res) => {
    console.log(logFormatter("/create/ called with body: " + req.body));
    if (!req.body.record) {
        return res.status(400).send("Must include 'record' in request body");
    }
    let record = new Cow(req.body.record);
    record
        .save()
        .then(() => {
            return res.status(200).send({
                message: "Success",
            });
        })
        .catch((err) => {
            return res.status(400).send(err);
        });
};

export const createMultiple = (req, res) => {
    console.log(logFormatter("/createById/ called with body: " + req.body));
    if (!req.body.records) {
        return res.status(400).send("Must include 'records' in request body");
    }
    Cow.create(records)
        .then(() => {
            return res.status(200).send({
                message: "Success",
            });
        })
        .catch((err) => {
            return res.status(400).send(err);
        });
};
