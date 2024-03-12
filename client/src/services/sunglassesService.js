import * as request from "./requester";

export const getAll = () => request.get("/data/sunglasses");

export const deleteOne = (sunglassesId) =>
    request.del(`/data/sunglasses/${sunglassesId}`);

export const getOne = (sunglassesId) =>
    request.get(`/data/sunglasses/${sunglassesId}`);

export const create = async ({ brand, price, description, imageUrl }) => {
    if (!brand || !price || !description || !imageUrl) {
        throw {
            message: "All fields is require!",
        };
    }

    if (description.length > 24) {
        throw {
            message: "Description should be maxmimum 24 letters!",
        };
    }

    const data = await request.post("/data/sunglasses", {
        brand,
        price,
        description,
        imageUrl,
    });

    return data;
};

export const edit = (sunglassesId, { brand, price, description, imageUrl }) => {
    if (!brand || !price || !description || !imageUrl) {
        throw {
            message: "All fields is require!",
        };
    }

    if (description.length > 24) {
        throw {
            message: "Description should be maxmimum 24 letters!",
        };
    }

    const data = request.put(`/data/sunglasses/${sunglassesId}`, {
        brand,
        price,
        description,
        imageUrl,
    });

    return data;
};

export const like = (sunglassesId) => {
    return request.post("/data/likes", { sunglassesId });
};

export const ownLikes = (sunglassesId) => {
    return request.get(
        `/data/likes?where=sunglassesId%3D%22${encodeURIComponent(
            sunglassesId
        )}%22&distinct=_ownerId&count`
    );
};

export const currentUserLikes = (sunglassesId, userId) => {
    return request.get(
        `/data/likes?where=sunglassesId%3D%22${encodeURIComponent(
            sunglassesId
        )}%22%20and%20_ownerId%3D%22${encodeURIComponent(userId)}%22&count`
    );
};

export const addComment = async (sunglassesId, commentText, email) => {
    if (!commentText) {
        throw {
            message: "The field is required!",
        };
    }

    if (commentText.length > 27) {
        throw {
            message: "The comment shoulde be 27 letters long!",
        };
    }

    const data = await request.post("/data/comments", {
        sunglassesId,
        commentText,
        email,
    });

    return data;
};

export const getAllComments = () => request.get("/data/comments");

export const deleteComment = (commentId) => request.del(`/data/comments/${commentId}`);
