const axios = require("axios");
const config = require("./config");
var prompt = require("prompt-sync")();

const { user, userAgent, appVersion } = config;

const login = async () => {
    console.log("start login");
    const { email, password } = config.login;

    const data = `login=${encodeURIComponent(email)}&password=${password}`;

    var loading = (function () {
        var h = ["|", "/", "-", "\\"];
        var i = 0;

        return setInterval(() => {
            i = i > 3 ? 0 : i;
            console.clear();
            console.log(`Logging in ${h[i]}`);
            i++;
        }, 300);
    })();

    const config = {
        method: "post",
        url: "https://api.gurushots.com/rest_mobile/signup",
        headers: {
            host: "api.gurushots.com",
            accept: "*/*",
            "x-device": "iPhone",
            "x-requested-with": "XMLHttpRequest",
            "x-model": "iPhone X",
            "accept-encoding": "br;q=1.0, gzip;q=0.9, deflate;q=0.8",
            "accept-language":
                "fr-SE;q=1.0, en-SE;q=0.9, sv-SE;q=0.8, es-SE;q=0.7",
            "x-api-version": "20",
            "content-type": "application/x-www-form-urlencoded; charset=utf-8",
            "x-env": "IOS",
            "user-agent": userAgent,
            "content-length": "50",
            "x-app-version": appVersion,
            connection: "keep-alive",
            "x-brand": "Apple",
            "x-postman-captr": "4102221",
        },
        data: data,
        timeout: 5000,
    };

    return await axios(config)
        .then(function (response) {
            clearInterval(loading);
            console.log("login successful");
            return response.data;
        })
        .catch(function (error) {
            clearInterval(loading);
            console.error("login error");
            console.error(error);
        });
};

const getActiveChallenges = async () => {
    console.log("getting active challenges");
    var config = {
        method: "post",
        url: "https://api.gurushots.com/rest_mobile/get_my_active_challenges",
        headers: {
            host: "api.gurushots.com",
            "x-device": "iPhone",
            "x-requested-with": "XMLHttpRequest",
            "x-model": "iPhone X",
            "accept-encoding": "br;q=1.0, gzip;q=0.9, deflate;q=0.8",
            "x-token": user.token,
            "x-api-version": "20",
            "accept-language":
                "fr-SE;q=1.0, en-SE;q=0.9, sv-SE;q=0.8, es-SE;q=0.7",
            "x-env": "IOS",
            "user-agent": userAgent,
            "content-length": "0",
            "x-app-version": "2.11.6",
            connection: "keep-alive",
            accept: "*/*",
            "x-brand": "Apple",
        },
    };

    return await axios(config)
        .then(function (response) {
            console.log("getting active challenges successful");
            return response.data;
        })
        .catch(function (error) {
            console.error("getting active challenges error");
            console.error(error);
        });
};

const getVoteImages = async (challenge) => {
    console.log(
        `getting vote image of challenge ${challenge.title} ${challenge.url}`,
    );
    var axios = require("axios");
    var data = `limit=100&url=${challenge.url}`;

    var config = {
        method: "post",
        url: "https://api.gurushots.com/rest_mobile/get_vote_images",
        headers: {
            host: "api.gurushots.com",
            accept: "*/*",
            "x-device": "iPhone",
            "x-requested-with": "XMLHttpRequest",
            "x-model": "iPhone X",
            "x-token": user.token,
            "accept-language":
                "fr-SE;q=1.0, en-SE;q=0.9, sv-SE;q=0.8, es-SE;q=0.7",
            "x-api-version": "20",
            "accept-encoding": "br;q=1.0, gzip;q=0.9, deflate;q=0.8",
            "x-env": "IOS",
            "user-agent": userAgent,
            "content-length": data.length,
            "x-app-version": appVersion,
            connection: "keep-alive",
            "content-type": "application/x-www-form-urlencoded; charset=utf-8",
            "x-brand": "Apple",
        },
        data: data,
    };

    return await axios(config)
        .then(function (response) {
            console.log("get vote image success");
            return response.data;
        })
        .catch(function (error) {
            console.error("get vote image failed");
            console.error(error);
        });
};

const submitVotes = async (voteImages) => {
    const { challenge, voting, images } = voteImages;
    if (!images.length) return;
    const id = `c_id=${challenge.id}`;
    let votedImages = "";

    const viewdImages = images.reduce(
        (prev, curr) =>
            prev +
            "&" +
            encodeURIComponent("viewed_image_ids[]") +
            "=" +
            curr.id,
        "",
    );

    let { exposure_factor } = voting.exposure;

    while (exposure_factor < 100) {
        const randomItem = images[Math.floor(Math.random() * images.length)];
        if (!votedImages.includes(randomItem.id)) {
            votedImages +=
                "&" + encodeURIComponent("image_ids[]") + "=" + randomItem.id;
            exposure_factor += randomItem.ratio;
        }
    }

    const data = `${id}${votedImages}&layout=scroll${viewdImages}`;
    var axios = require("axios");

    var config = {
        method: "post",
        url: "https://api.gurushots.com/rest_mobile/submit_vote",
        headers: {
            host: "api.gurushots.com",
            accept: "*/*",
            "x-device": "iPhone",
            "x-requested-with": "XMLHttpRequest",
            "x-model": "iPhone X",
            "x-token": user.token,
            "accept-language":
                "fr-SE;q=1.0, en-SE;q=0.9, sv-SE;q=0.8, es-SE;q=0.7",
            "x-api-version": "20",
            "accept-encoding": "br;q=1.0, gzip;q=0.9, deflate;q=0.8",
            "x-env": "IOS",
            "user-agent": userAgent,
            "content-length": data.length,
            "x-app-version": appVersion,
            connection: "keep-alive",
            "content-type": "application/x-www-form-urlencoded; charset=utf-8",
            "x-brand": "Apple",
        },
        data: data,
    };

    return await axios(config)
        .then(function (response) {
            console.log("submit votes success");
            return {
                data,
                response: response.data,
            };
        })
        .catch(function (error) {
            console.error("submit votes failed");
            console.error(error);
        });
};

const applyBoost = async (challenge) => {
    const { id, member } = challenge;
    const { entries } = member.ranking;
    const boostImage = entries[0].id;

    var data = `c_id=${id}&image_id=${boostImage}`;

    var config = {
        method: "post",
        url: "https://api.gurushots.com/rest_mobile/boost_photo",
        headers: {
            host: "api.gurushots.com",
            accept: "*/*",
            "x-device": "iPhone",
            "x-requested-with": "XMLHttpRequest",
            "x-model": "iPhone X",
            "x-token": user.token,
            "accept-language":
                "fr-SE;q=1.0, en-SE;q=0.9, sv-SE;q=0.8, es-SE;q=0.7",
            "x-api-version": "20",
            "accept-encoding": "br;q=1.0, gzip;q=0.9, deflate;q=0.8",
            "x-env": "IOS",
            "user-agent": userAgent,
            "content-length": data.length,
            "x-app-version": appVersion,
            connection: "keep-alive",
            "content-type": "application/x-www-form-urlencoded; charset=utf-8",
            "x-brand": "Apple",
        },
        data: data,
    };

    return axios(config)
        .then(function (response) {
            console.log("apply boost success");
            return response.data;
        })
        .catch(function (error) {
            console.error("Apply boost failed");
            return error;
        });
};

const fetchChallengesAndVote = async () => {
    if (!user.token) {
        const userLogin = await login();
        user = userLogin;
    }
    const activesChallenges = await getActiveChallenges();
    const { challenges } = activesChallenges;
    const now = Math.floor(Date.now() / 1000);
    for (challenge of challenges) {
        const { boost } = challenge.member;
        if (boost.state === "AVAILABLE" && boost.timeout) {
            console.log("Boost available for challenge " + challenge.title);
            const boostImage = await applyBoost(challenge);
        }
        if (
            challenge.member.ranking.exposure.exposure_factor < 100 &&
            challenge.start_time < now
        ) {
            const voteImages = await getVoteImages(challenge);
            const vote = await submitVotes(voteImages);
        }
    }
    return "done";
};

module.exports = {
    fetchChallengesAndVote,
    getActiveChallenges,
    getVoteImages,
    submitVotes,
    login,
};
