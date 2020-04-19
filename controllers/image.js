const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '5921dd5f0bbc4d888d113a2bd7a390c3'
});

const handleAPICall = () => (req, res) => {
  app.models.initModel({id: Clarifai.FACE_DETECT_MODEL})
    .then(generalModel => generalModel.predict(req.body.input))
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('Unable to fetch from API.'))
}

const handleImage = (db) => (req, res) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('Unable to get entries.'))
}

module.exports = {
    handleImage,
    handleAPICall
}