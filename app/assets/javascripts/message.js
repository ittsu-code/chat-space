$(function() {
  function buildHTML(message) {
    var image =
      message.image !== null
        ? `<img class="lower-message__image" src=${message.image}>`
        : "";
    var html = `
    <div class="message">
      <div class="message__upper-info">
        <div class="message__upper-info__talker">
        ${message.user}
        </div>
        <div class="message__upper-info__date">
        ${message.created_at}
        </div>
      </div>
    <div class="message__text"></div>
    ${message.text}
    ${image}
    </div>`;
    return html;
  }
  $("#new_message").on("submit", function(e) {
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
      .done(function(data) {
        var html = buildHTML(data);
        $(".messages").append(html);
        $(".messages").animate({ scrollTop: $(".messages")[0].scrollHeight });
        $(".new_message")[0].reset();
        $(".submit-btn").attr("disabled", false);
      })
      .fail(function() {
        alert("error");
      });
  });

  var reloadMessage = function() {
    var last_message_id = $(".message:last").data("message-id");
    $.ajax({
      url: "/api/messages",
      type: "get",
      dataType: "json",
      data: { id: last_message_id }
    })
      .done(function(messages) {
        console.log("success");
      })
      .fail(function() {
        console.log("error");
      });
  };
});
