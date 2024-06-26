$(document).ready(function() {
    textareaactiveinactive();
    scrolltobottom();
    textareaenteredpressed();
    getchatfromlocalstorage();
});


function textareaactiveinactive(){
    $("#chatbotinputtextareafield").on('input', function() {
        sendbuttonactiveinactive();
        
    });
}

function sendbuttonactiveinactive(){
    var maxHeight = 232;
    textarea=document.getElementById('chatbotinputtextareafield');
    if ( $("#chatbotinputtextareafield").val().trim() === '') {
        $("#chatbotinputsendbutton").removeClass('active')
        textarea.style.height = "40px";
    } else {
        $("#chatbotinputsendbutton").addClass('active')
    }
    if (textarea.scrollHeight > maxHeight) {
        textarea.style.height = maxHeight + "px";
        textarea.style.overflowY = "auto";
      } else {
        // Otherwise, set the height to fit the content and disable scrolling
        textarea.style.height = textarea.scrollHeight + "px";
        textarea.style.overflowY = "hidden";
      }

}

function scrolltobottom(){
    var scrollableDiv = $("#chatbotbodyblock");
    scrollableDiv.animate({ scrollTop: scrollableDiv[0].scrollHeight }, 1000);
}

function textareaenteredpressed(){
    $("#chatbotinputtextareafield").keydown(function(event) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault(); // Prevent default Enter behavior (newline)
            SensuserMessagetoAssistant() // Call your function here
        }
    });
}

function addchattolocalstorage() {
    let texttoadd = document.getElementById('chatbotbodyblock').innerHTML;
    localStorage.setItem("newchatbotchats", texttoadd);
}

function getchatfromlocalstorage() {
    var myValue = localStorage.getItem("newchatbotchats");
    if (myValue !== null && myValue != "null" && myValue.trim() != "") {
        document.getElementById('chatbotbodyblock').innerHTML = myValue;
    } else {
        let uid=generateAnswerBlockEmpty();
        functionAddResponseraw("Hi, How may i help you ?.", uid);
        completetheresponse(uid);
    }
}

function clearlocalstorage() {
    localStorage.setItem("newchatbotchats", null);
}
