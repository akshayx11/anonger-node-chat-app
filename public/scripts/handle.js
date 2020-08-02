$(function () {
    var socket = io();
    const room = $('#roomName').val();
    const randomNum = Math.round(Math.random(1,1000) * 10000);
    const uName = $('#uName').val();
    let name = uName ?  uName : `user`+randomNum;
    const spritesTypes = ['male', 'female', 'human', 'avataaars'];//, 'initials', 'bottts', 'gridy', 'code']
    const randomSprite = Math.floor(Math.random() * Math.floor(spritesTypes.length));
    const spriteAddress = `https://avatars.dicebear.com/api/${spritesTypes[randomSprite]}/${name}.svg?mood[]=happy`
    let avatarImg = `<img src='${spriteAddress}'>`
    name = `${avatarImg} <label>${name}</label>`;
    var quill = new Quill('#editor', {
                        modules: {
            toolbar: [
                ['bold', 'italic', 'underline', 'strike'],
                ['link', 'blockquote', 'code-block', 'image'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'font': [] }],
                ['clean']        
            ]
        },
        placeholder: '  Enter your message',
        theme: 'snow'
    });
    //set css for user
    const anongerColorChatName = ['#D93D27','#EFA53A', '#E2E482', '#E0BE65', '#F29D09'];
    const randomNumForChatName = Math.round(Math.random(0, anongerColorChatName.length - 1) * 10); 
    const chatColor = anongerColorChatName[randomNumForChatName];
    $('form').submit(function () {
        const message = $('#editor .ql-editor').html();
        if($('#editor .ql-editor').hasClass('ql-blank')){
            alert('You forget to add message.');
            return false;
        }
        socket.emit('chatMsg', { message, room, name, chatColor });
        $('#editor .ql-editor').html('');
        return false;
    });
    socket.on(room, function ({message, userCount, chatColor}) {
        $('#messages').append($('<li>').html(message));
            console.log(userCount);
           // $(".chat-name").css('background', chatColor);
            $('#messages').scrollTop($('#messages')[0].scrollHeight);
    });
    $('#enter-room').on('click', ()=>{
        const roomId  = $('#roomId').val();
        const userName = $('#userName').val();
        const url =  `/${roomId}?name=${userName}`;
        window.location.href = url;
    });
});