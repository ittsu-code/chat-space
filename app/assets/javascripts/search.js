$(function () {

  function appendUser(user) {
    var html = `
    <div class="chat-group-user clearfix">
      <p class="chat-group-user__name">${user.name}</p>
    <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
    </div>
    `
  }


  $("#user-search-field").on("keyup", function () {
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users/index',
      data: { keyword: input },
      dataType: 'json'
    })

      .done(function (users) {
        $("検索結果").empty();
        if (user.length !== 0) {
          users.forEach(function (user) {
            appendUser(user);
          });
        }
        else {
          appendErrMsgToHTML("一致するユーザーは存在しません");
        }
      })
  });
});