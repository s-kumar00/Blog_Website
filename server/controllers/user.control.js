exports.test = async (req, res) => {
    try {
        res.status(201).json({ message: "Test API is working successfully...!" });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}