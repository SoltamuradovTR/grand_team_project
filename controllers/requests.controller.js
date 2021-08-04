const Request = require("../models/Request");

module.exports.requestsController = {
    getRequests: async (req, res) => {
         try {
            const request = await Request.find();

            return res.json(request);
        } catch (e) {
            return res.status(400).json({
                error: e.toString(),
            });
        }
    },
    getRequestsByClient: async (req, res) => {
        const {id} = req.params;
        try {
            const request = await Request.find({author: id});

            return res.json(request);
        } catch (e) {
            return res.status(400).json({
                error: e.toString(),
            });
        }
    },
    createRequest: async (req, res) => {
        const {title, description, active, appraisers} = req.body;
        if (!title) {
            return res.status(400).json({
                error: "Необходимо указать заголовок",
            });
        }
        if (!description) {
            return res.status(400).json({
                error: "Необходимо указать описание",
            });
        }
        try {
            const request = await Request.create({
                title,
                description,
                active,
                appraisers,
            });
            return res.json(request);
        } catch (e) {
            return res.status(400).json({
                error: e.toString(),
            });
        }
    },

    deleteRequest: async (req, res) => {
        const {id} = req.params;

        try {
            const deleted = await Request.findByIdAndRemove(id);
            if (!deleted) {
                return res.status(400).json({
                    error: "Не удалось удалить запись",
                });
            }
            return res.json({
                message: "Запись успешно удалена",
            });
        } catch (e) {
            return res.status(400).json({
                error: e.toString(),
            });
        }
    },

    editRequest: async (req, res) => {
        const {id} = req.params;

        const {active} = req.body;

        try {
            const edited = await Request.findByIdAndUpdate(
                id,
                {
                    active,
                },
                {new: true}
            );
            return res.json(edited);
        } catch (e) {
            return res.status(400).json({
                error: e.toString(),
            });
        }
    },

    addAppraisers: async (req, res) => {
        const {id} = req.params;
        const data = req.body;

        try {
            const request = await Request.updateOne({_id: id},
                {$addToSet: {appraisers: data}})
            return res.json(request)
        } catch (e) {
            return res.status(400).json({
                error: e.toString(),
            })
        }
    }
}
