const { login } = require('./calls')

const getToken = async () => {
    const userLogin = await login()
    console.log({ user: userLogin })
}

getToken();