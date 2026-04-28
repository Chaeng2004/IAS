const getWebGoatLink = (req, res) => {
    res.json({ url: process.env.WEBGOAT_LESSON_URL });
};

module.exports = { getWebGoatLink };