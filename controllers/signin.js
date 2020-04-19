const handleSignin = (db, bcrypt) => (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json('Incorrect form submission.');
    }
    db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data =>{
        bcrypt.compare(password, data[0].hash, function(err, result) {
            if (result) {
                return db.select('*').from('users')
                .where('email', '=', email)
                .then(user => {
                    res.json(user[0])
                })
                .catch(err => res.status(400).json('Unable to get user'))
            } else {
                res.status(400).json('Wrong Crendentials')
            }
        });
    })
    .catch(err => res.status(400).json('Wrong Credentials'))
}

module.exports = {handleSignin}