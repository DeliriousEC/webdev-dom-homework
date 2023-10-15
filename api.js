export function getCommentApi() {
   return fetchPromise = fetch("https://wedev-api.sky.pro/api/v1/maxim-trankov/comments", {
        method: "GET",
      });
    
      fetchPromise
        .then((response) => {
          if (response.status === 500) {
            throw new Error("Ошибка сервера");
          } if (response.status === 400) {
            throw new Error("Неверный запрос");
          }
          return response.json();
        })
} 