"use strict";

$(document).ready(function() {
  {
    $.get("https://jsonplaceholder.typicode.com/users?id=1&id=2", data => {
      data.forEach(user => {
        user.id === 1 ? $("#user1").append(`<h1 class="user1-name">${user.name}</h1>`) : $("#user2").append(`<h1 class="user2-name">${user.name}</h1>`);
      });
      getAlbums();
    });
  }
  
  function getAlbums() {
    $.get("https://jsonplaceholder.typicode.com/albums?userId=1&userId=2", data => {
      $("#user1").append(`<ul class="user1-list" ondrop="drop(event)" ondragover="allowDrop(event)"></ul>`);
      $("#user2").append(`<ul class="user2-list" ondrop="drop(event)" ondragover="allowDrop(event)"></ul>`);
      data.forEach(album => {
        const song = `<li class="song" draggable="true" ondragstart="drag(event)" id="${album.id}">
                        <div class="id">${album.id}</div>
                        <div class="title">${album.title}</div>
                      </li>`
        album.userId === 1 ? $(".user1-list").append(song) : $(".user2-list").append(song);
      });
    });
  }
});

function allowDrop(ev) {
  ev.preventDefault();
};

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
};

function drop(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");
  let target = ev.target;
  let userId;

  while(target.nodeName !== "UL"){
      target = target.parentNode;
  }

  userId = target.className.substr(4,1);

  $.ajax({
    method: "PUT",
    url: `https://jsonplaceholder.typicode.com/albums/${data}`,
    data: { userId: userId }
  })
    .done(response => {
      target.appendChild(document.getElementById(data));
    });
};