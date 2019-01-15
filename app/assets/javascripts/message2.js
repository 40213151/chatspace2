// $(document).on('turbolinks:load', function(){

// function buildHTML(message) {
//   var insertImage = '';

//   if (message.image.url) {
//     insertImage = `<img src="${message.image.url}">`;
//   }
//       var html = `<div class ="message data-message-id="${message.id}">
//                     <div class ="message__user-name">
//                       ${ message.name }
//                     </div>
//                     <div class ="message__date">
//                       ${ message.created_at }
//                     </div>
//                     <div class ="message__content">
//                       ${ message.body }
//                     </div>
//                     <div class ="message__content">
//                       ${ insertImage }
//                     </div>
//                   </div>`
//       return html;
//   }

//     var interval = setInterval(function(){
//       if (window.location.href.match(/\/groups\/\d+\/messages/)) {
//       var lastMessageId = $('.message').last().data('message-id');
//       $.ajax({
//         url: window.location.href,
//         data: {id: lastMessageId},
//         type: 'GET',
//         dataType:'json'
//       })

//       .done(function(new_messages){
//         var insertHTML = "";
//         new_messages.forEach(function(message) {
//           insertHTML += buildHTML(message);
//           // var insertHTML = "";
//           $('.message-display').append(insertHTML);
//           console.log(message)
//           })
//       })
//      .fail(function(new_messages) {
//         alert('自動更新に失敗しました');
//       });
//     } else {
//       clearInterval(interval);
//     }} , 5 * 1000);
// });
