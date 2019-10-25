$(function () {
  function buildHTML(message) {
    var image = message.image.url ? `<img class="lower-message__image" src=${message.image.url}>` : "";
    var html = `
      <div class="message" data-id=${message.id}>
        <div class="message__upper-info">
          <div class="message__upper-info__talker">
          ${message.user_name}
          </div>
          <div class="message__upper-info__date">
          ${message.created_at}
          </div>
        </div>
          <div class="lower-message">
          <p class="lower-message__content">
          ${message.text}
          </p>
          ${image}
          </div>
      </div>`;
    return html;
  }
  $("#new_message").on("submit", function (e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action");
    $.ajax({
      url: url,
      type: "post",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
      .done(function (data) {
        var html = buildHTML(data);
        $(".messages").append(html);
        $(".messages").animate({ scrollTop: $(".messages")[0].scrollHeight });
        $(".new_message")[0].reset();
        $(".submit-btn").attr("disabled", false);
      })
      .fail(function () {
        alert("error");
      });
  });

  var reloadMessages = function () {
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      var last_message_id = $('.message:last').data("id");
      $.ajax({
        url: "api/messages",
        type: "get",
        dataType: "json",
        data: { id: last_message_id }
      })
        .done(function (messages) {
          var insertHTML = "";
          messages.forEach(function (message) {
            insertHTML = buildHTML(message);
            $(".messages").append(insertHTML);
            $(".messages").animate(
              { scrollTop: $(".messages")[0].scrollHeight },
              "fast"
            );
          });
        })
        .fail(function () {
          console.log("error");
        });
    };
  }
  setInterval(reloadMessages, 5000);
});
