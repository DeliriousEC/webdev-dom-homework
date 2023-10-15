import { getCommentApi } from "./api.js";

const buttonElement = document.getElementById("add-button");
const listElement = document.getElementById("list");
const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("comment-input");
const currentDate = new Date().toLocaleString().slice(0, -3);

function showLoadingIndicator() {
  const loader = document.querySelector(".list-loader");
  loader.classList.remove("hidden");

}

function deleteLoadingIndicator() {
  const loader = document.querySelector(".list-loader");
  loader.classList.add("hidden");
}

let comments = [

];

// const url = "https://wedev-api.sky.pro/api/v1/maxim-trankov"

function getComment() {
  showLoadingIndicator();

  getCommentApi().then(data => {
    comments = data.comments;

    renderElements();
    deleteLoadingIndicator();
  });

}

buttonElement.disable

function postComment() {
  let fetchPromise = fetch("https://wedev-api.sky.pro/api/v1/maxim-trankov/comments", {
    method: "POST",
    body: JSON.stringify({
      name: nameInputElement.value,
      text: commentInputElement.value,
      forceError: true,
    }),
  });

  fetchPromise
    .then((response) => {
      if (response.status === 500) {
        throw new Error("Сервер упал, попробуй позже");
      } else if (response.status === 400) {
        throw new Error("Введите данные заново");
      } else {
        return response.json();
      };
    })
    .then((data) => {
      renderElements();
      buttonElement.disabled = false;
      buttonElement.textContent = "Написать";
      nameInputElement.value = "";
      commentInputElement.value = "";
    }).catch((error) => {
      // deleteLoadingIndicator();
      // buttonElement.disabled = false;
      buttonElement.disabled = false;
      buttonElement.textContent = "Написать";
      alert("Сервер не отвечает.");
    });
  getComment();

};

renderElements();

function deleteApiComment(id) {

  comments = comments.filter(item => item.id !== +id);
  renderElements();
}



function renderElements() {
  const commentsHTML = comments.map((element, index) => {
    const ourDate = new Date(element.date);
    return `<li class="comment" data-index="${index}">
      <div class="comment-header">
        <div>${element.author.name}</div>
        <div>${ourDate.toLocaleString()}</div>
      </div>
      <div class="comment-body">
        <div data-index class="comment-text">
          ${element.text}
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${element.likes}</span>
          <button data-index="${index}" class="like-button ${element.islike ? "-active-like" : ""}"></button>
          
        </div>
      </div>
      <button data-id="${element.id}" class="add-form-button delete-button">Удалить</button>
    </li>`


  }).join("");
  list.innerHTML = commentsHTML;
  addLike();
  commentOnComment();
  deleteComment();
}

renderElements();
function addLike() {
  const likeElements = document.querySelectorAll('.like-button');
  for (let like of likeElements) {
    like.addEventListener('click', (event) => {
      event.stopPropagation();
      let index = like.dataset.index;
      let object = comments[index];
      if (object.islike) {
        object.islike = false;
        object.likes--;
      } else {
        object.islike = true;
        object.likes++;
      }
      renderElements();
    })
  }

}



// buttonElement.addEventListener("click", () => {

//   nameInputElement.classList.remove("error");
//   commentInputElement.classList.remove("error");

//   if (nameInputElement.value === "" || commentInputElement.value === "") {

//     nameInputElement.classList.add("error");
//     commentInputElement.classList.add("error");
//     return;
//   }

//   const currentDate = new Date().toLocaleString().slice(0, -3);

//   comments.push({
//     name: nameInputElement.value
//       .replaceAll("&", "&amp;")
//       .replaceAll("<", "&lt;")
//       .replaceAll(">", "&gt;")
//       .replaceAll('"', "&quot;"),
//     date: currentDate,
//     comment: commentInputElement.value
//       .replaceAll("&", "&amp;")
//       .replaceAll("<", "&lt;")
//       .replaceAll(">", "&gt;")
//       .replaceAll('"', "&quot;"),
//     likes: 0,
//     islike: false
//   });
renderElements();

// });

nameInputElement.addEventListener("input", (e) => {
  if (e.target.value) { nameInputElement.classList.remove("error") }
});
commentInputElement.addEventListener("input", (e) => {
  if (e.target.value) { commentInputElement.classList.remove("error") }
});

function addComment() {
  buttonElement.addEventListener('click', () => {
    buttonElement.disabled = true;
    buttonElement.textContent = "Комментарий добавлятся...";
    nameInputElement.classList.remove("error");
    commentInputElement.classList.remove("error");
    if (nameInputElement.value === '' || commentInputElement.value === '') {
      nameInputElement.classList.add("error");
      commentInputElement.classList.add("error");
      buttonElement.disabled = false;
      buttonElement.textContent = "Написать";
      return;
    };
    if (nameInputElement.value.length < 3) {
      nameInputElement.classList.add("error");
      buttonElement.disabled = false;
      buttonElement.textContent = "Написать";
    }
    if (commentInputElement.value.length < 3) {
      commentInputElement.classList.add("error");
      buttonElement.disabled = false;
      buttonElement.textContent = "Написать";
      return;
    };
    postComment();
    // renderElements();

  });
};
addComment();
renderElements();

//leet code

function deleteComment() {
  const buttonDelete = document.querySelectorAll('.delete-button');
  for (let button of buttonDelete) {
    button.addEventListener('click', (event) => {
      let id = button.dataset.id;
      deleteApiComment(id);
      event.stopPropagation();
      renderElements();
    })
  }
};

function commentOnComment() {
  const commentOnComment = document.querySelectorAll('.comment');
  for (let comment of commentOnComment) {
    comment.addEventListener('click', () => {
      let index = comment.dataset.index
      let object = comments[index];
      commentInputElement.value = `${object.text}  ${object.author.name}`
      renderElements();
    })

  }
}


getComment();