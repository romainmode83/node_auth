

exports.sign_up_get = (req, res, next) => {
    res.render('sign-up'), {
        title: 'Sign up',
    }
}

exports.log_in_get = (req, res, next) => {
    res.render('log-in', {
        title: 'Log in'
    })
}