let comments = [];
export function getCommentApi() {
    return fetch("https://wedev-api.sky.pro/api/v1/maxim-trankov/comments", {
        method: "GET",
    })

        .then((response) => {
            if (response.status === 500) {
                throw new Error("Ошибка сервера");
            } if (response.status === 400) {
                throw new Error("Неверный запрос");
            }
            return response.json();
        })
};

// export function deleteCommentApi({id}) {
//     return fetch("https://wedev-api.sky.pro/api/v1/maxim-trankov/comments" + id, {
//             method: "DELETE",
//           })
//             .then((response) => {
//               return response.json();
//             })
// }

export function postFetchApi({ name, text }) {
    return fetch("https://wedev-api.sky.pro/api/v1/maxim-trankov/comments", {
        method: "POST",
        body: JSON.stringify({
            name: name,
            text: text,
        }),
    })
        .then((response) => {
            if (response.status === 500) {
                throw new Error("Сервер упал, попробуй позже");
            } else if (response.status === 400) {
                throw new Error("Введите данные заново");
            } else {
                return response.json();
            };
        })
};

