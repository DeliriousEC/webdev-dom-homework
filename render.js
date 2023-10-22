
export function renderElementsExp(comments) {
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

}