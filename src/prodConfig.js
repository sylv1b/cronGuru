const {
    USER_NAME,
    TOKEN,
    MEMBER_ID,
    USER_AGENT,
    APP_VERSION,
    EMAIL,
    PASSWORD,
} = process.env;

const user = {
    user_name: USER_NAME,
    action: "signin",
    token: TOKEN,
    admin_token: null,
    member_id: MEMBER_ID,
    is_signup: false,
    success: true,
};

const login = {
    email: EMAIL,
    password: Password,
};

const userAgent = USER_AGENT;
const appVersion = APP_VERSION;

const interval = "  */5 * * * *";

const prodConfig = {
    login,
    user,
    interval,
    userAgent,
    appVersion,
};

module.exports = prodConfig;
