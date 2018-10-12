$(function(){
  function buildHTML(message){
    var MessageImage = ''
    if (message.image){
      MessageImage = `<img src="${message.image}" class="lower-message__image" >`
    }
    var html = `
        <div class="message" data-message-id="${ message.id }">
          <div class="upper-message">
            <div class="upper-message__user-name">
              ${ message.user_name }
            </div>
            <div class="upper-message__date">
              ${ message.created_at }

            </div>
          </div>
          <div class="lower-meesage">
            <p class="lower-message__content">
              ${ message.content }
            </p>
            ${ MessageImage }
          </div>
        </div>`;
    return html;
}

  function Scroll(){
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('#new_message')[0].reset;
      $(".form__submit").attr('disabled', false);
      Scroll();
    })
    .fail(function(){
      alert('メッセージの送信に失敗しました');
    })
  })

  var interval = setInterval(function(){
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      $.ajax({
        url: location.href.json,
        type: 'GET',
        dataType: 'json'
      })

      .done(function(json){
        var last_message_id = $('.message:last').data('message-id');
        var insertHTML = '';
        json.messages.forEach(function(message){
          if (message.id > last_message_id){
            insertHTML += buildHTML(message);
          }
        });
        $('.messages').append(insertHTML);
        scroll()
      })

      .fail(function(json){
        alert('自動更新失敗ンゴ')
      });
    } else{
      crearInterval(interval);
    }} , 5 * 1000);
});
