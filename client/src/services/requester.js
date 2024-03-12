const host = "http://localhost:3030";

async function request(method, url, data) {
    let options = {
        method,
        headers: {},
    };

    let user = JSON.parse(localStorage.getItem("auth"));
    if (user) {
        options.headers["X-Authorization"] = user.accessToken;
    }

    if (data) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(host + url, options);

        if (response.ok == false) {
            const error = await response.json();
            throw new Error(error.message);
        }

        try {
            const data = await response.json();
            return data;
        } catch (err) {
            return response;
        }
    } catch (err) {
        throw err;
    }
}

export const get = request.bind(null, "GET");
export const post = request.bind(null, "POST");
export const put = request.bind(null, "PUT");
export const del = request.bind(null, "DELETE");
