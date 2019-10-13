$(function () {
  function buildHTML(message) {
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
    <img class="lower-message__image" src=${message.image}>
    </div>`
    return html;
  }
  $('#new_message').on('submit', function (e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "post",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
      .done(function (data) {
        var html = buildHTML(data);
        console.log(html)
        $('.messages').append(html)
        $('#message_text').val('')
      })
      .fail(function () {
        alert('error');
      })
  })
})