$(document).on('turbolinks:load', function() {
  function buildHTML(message){
    var MessageImage = (message.image) ? `<img src="${message.image}" class="lower-message__image">` : ``
    var html = `
        <div class="message" data-message_id="${message.id}">
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
    // formが発火された時に実行
    e.preventDefault();
    var formData = new FormData(this);
    // console.log(formData);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    // ajax通信が成功した時 controller => jbuilder => js
    .done(function(data){
      console.log(data);
      var html = buildHTML(data);
      $('.messages').append(html);
      $('#new_message')[0].reset();
      $(".form__submit").attr('disabled', false);
      Scroll();
    })
    .fail(function(){
      alert('メッセージの送信に失敗しました');
    })
  })

  var interval = setInterval(function(){
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message:last').data('id');
      // console.log(last_message_id);
      $.ajax({
        url: location.href,
        type: 'GET',
        data: {id: last_message_id},
        dataType: 'json'
        // processData: false,
        // contentType: false
      })

      .done(function(data){
        var insertHTML = '';
        if(data.length != 0){
          data.forEach(function(message){
            insertHTML += buildHTML(message);
          });
          $('.message').append(insertHTML);
          Scroll();
        }
      })

      .fail(function(json){
        // console.log('自動更新失敗ンゴ');
      });
    } else{
      clearInterval();
    }} , 5 * 1000);
});
