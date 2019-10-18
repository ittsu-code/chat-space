$(function() {
  var search_list = $("#search-result");
  var search_member = $("#member-rist");

  function appendUser(user) {
    var html = `
    <div class="chat-group-user clearfix">
  <p class="chat-group-user__name">${user.name}</p>
  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
</div>
    `;
    search_list.append(html);
  }
  $(document).on("click", ".user-search-add", function() {
    var html = `
    <div class='chat-group-user'>
      <input name='group[user_ids][]' type='hidden' value=${$(
        ".user-search-add"
      ).data("userId")}>
        <p class='chat-group-user__name'>${$(".user-search-add").data(
          "userName"
        )}</p>
        <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
    </div>
    `;
    search_member.append(html);
    $("#search-result").empty();
  });

  $(document).on("click", ".user-search-remove", function(user) {
    $(this)
      .parent()
      .remove();
  });

  function appendErrMsgToHTML(msg) {
    var html = `<div class='.chat-group-user clearfix'>${msg}</div>`;
    search_list.append(html);
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();

    $.ajax({
      type: "get",
      url: "/users",
      data: { keyword: input },
      dataType: "json"
    }).done(function(users) {
      $("#search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user) {
          appendUser(user);
        });
      } else {
        appendErrMsgToHTML("一致するユーザーは存在しません");
      }
    });
  });
});
