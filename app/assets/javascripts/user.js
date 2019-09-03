$(document).on('turbolinks:load', function() {
  var search_list =$("#user-search-result");

   function appendUser(user){
    var html =`<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${ user.name }</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</a>
              </div>`
    search_list.append(html);
   }

  function appendNoUser(message){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ message }</p>
                </div>`
    search_list.append(html);
  }
  function addUser(name, id){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${id}' class="chat-group-user__selected_user_id">
                  <p class='chat-group-user__name'>${name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    result_list.append(html);
  }

  $("#user-search-field").on("keyup", function(){
    console.log('')
    var input = $(this).val();
    var selected_users = [];
    selected_users.length = 0;

    $(".chat-group-user__selected_user_id").each(function(){
      selected_users.push($(this).attr("value"));
    });

    if(input.length == 0){
      $("#user-search-result").empty();
    } else{
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input,
                selected_users: selected_users
              },
        dataType: 'json'
      })
     .done(function(users){
        $("#user-search-result").empty();
        if (users.length != 0){
          users.forEach(function(user){
            appendUser(user);
          });
        }else{
          $("#user-search-result").empty();
          appendNoUser("一致するユーザーはいません")
        }
      })
     .fail(function(){
      alert('そんな人知りません')
     })
    }
  });

  var result_list =$("#chat-group-users")

  $('#user-search-result').on("click", ".chat-group-user__btn--add", function(){
    var name =$(this).attr("data-user-name")
    var id =$(this).attr("data-user-id")
    addUser(name, id);
    $(this).parent().remove();
  });

  $('#chat-group-users').on("click", '.chat-group-user__btn--remove', function(){
    $(this).parent().remove();
  });
});
