import { getCommentApi, postFetchApi } from "./api.js";
import { renderElementsExp } from "./render.js";

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

let comments = [];

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
  postFetchApi({
    name: nameInputElement.value,
    text: commentInputElement.value
  }).then((data) => {
    renderElements();
    buttonElement.disabled = false;
    buttonElement.textContent = "Написать";
    nameInputElement.value = "";
    commentInputElement.value = "";
    getComment();
  }).catch((error) => {
    // deleteLoadingIndicator();
    // buttonElement.disabled = false;
    buttonElement.disabled = false;
    buttonElement.textContent = "Написать";
    alert("Сервер не отвечает.");
  });
  getComment();

};

function renderElements() {
  renderElementsExp(comments);
  addLike();
  commentOnComment();
  deleteComment();
};

function deleteApiComment(id) {

  comments = comments.filter(item => item.id !== +id);
  renderElements();
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


renderElements();

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

  });
};
addComment();
renderElements();

function deleteComment() {
  const buttonDelete = document.querySelectorAll('.delete-button');
  for (let button of buttonDelete) {
    button.addEventListener('click', (event) => {
      const id = button.dataset.id;
      deleteApiComment(id);
      event.stopPropagation();
      renderElements();

      // deleteCommentApi({id}).then(() => {
      //     getComment();
      //   });
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