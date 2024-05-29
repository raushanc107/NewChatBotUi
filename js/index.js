function SensuserMessagetoAssistant(){
    const question=$('#chatbotinputtextareafield').val();
    $('#chatbotinputtextareafield').val('');
    sendbuttonactiveinactive();
    if(question.trim()==''){
        return;
    }

    createQuestionBlock(question);

    setTimeout(() => {
        let uid=generateAnswerBlockEmpty();
        generatestream(question,uid);
    }, 500);
    

}


async function generatestream(question,span){
    try{
        const response=await fetch("https://csopenaiservice.openai.azure.com/openai/deployments/CSAsst/chat/completions?api-version=2023-05-15",{
            method:'POST',
            headers:{
                "Content-Type":"application/json",
                "api-key":"ed40bd2c729d4cef822b177f1df7745a"
            },
            body:JSON.stringify({
                "messages":[{"role": "system", "content": "You are a helpful assistant."},{"role": "user", "content":question}],
                "stream":true
             }),
            });
            
            const reader=response.body.getReader();
    const decoder=new TextDecoder("utf-8"); 
    while(true){
        const chunk=await reader.read();
        const {done,value}=chunk;
        const decodedchunk=decoder.decode(value);
        const lines=decodedchunk.split("\n");
        const parsedLines=lines.map((line)=>
            line.replace(/^data:/,"").trim()
        ).filter(line=>line!==""&& line!=="[DONE]").map((line)=>
            JSON.parse(line)
        );
        for(const parsedLine of parsedLines){
            const {choices}=parsedLine;
            const {delta}=choices[0];
            const {content}=delta;
            if(content){
                functionAddResponse(content,span);
            }
        }
    
    
    
    
        if(done){
            break;
        }
    
    }

    completetheresponse(span);


    
    }catch(err){
        console.warn(err);
    }
    }


function createQuestionBlock(question){
    question=question.replace(/\n/g, "<br>");
    const $userMessageBlock = $('<div>', { class: 'usermessageblock' });

    // Create the user message edit div
    const $userMessageEdit = $('<div>', { class: 'usermessageedit' });

    // Create the SVG icon
    const $svgIcon = $('<svg>', {
        xmlns: 'http://www.w3.org/2000/svg',
        width: '24',
        height: '24',
        fill: 'none',
        viewBox: '0 0 24 24',
        class: 'icon-md'
    });

    // Create the SVG path
    const $svgPath = $('<path>', {
        fill: 'currentColor',
        'fill-rule': 'evenodd',
        d: 'M13.293 4.293a4.536 4.536 0 1 1 6.414 6.414l-1 1-7.094 7.094A5 5 0 0 1 8.9 20.197l-4.736.79a1 1 0 0 1-1.15-1.151l.789-4.736a5 5 0 0 1 1.396-2.713zM13 7.414l-6.386 6.387a3 3 0 0 0-.838 1.628l-.56 3.355 3.355-.56a3 3 0 0 0 1.628-.837L16.586 11zm5 2.172L14.414 6l.293-.293a2.536 2.536 0 0 1 3.586 3.586z',
        'clip-rule': 'evenodd'
    });

    // Append the path to the SVG
    $svgIcon.append($svgPath);

    // Append the SVG to the user message edit div
    $userMessageEdit.append($svgIcon);

    // Create the user message div
    const $userMessage = $('<div>', { class: 'usagermessage' });

    // Create the message by user div
    const $messageByUser = $('<div>', { class: 'messagebyuser' }).html(question);

    // Append the message by user div to the user message div
    $userMessage.append($messageByUser);

    // Append the user message edit div and the user message div to the main container
    $userMessageBlock.append($userMessageEdit);
    $userMessageBlock.append($userMessage);

    // Append the main container to the body (or any other desired parent element)
    $('#chatbotbodyblock').append($userMessageBlock);

}


function generateAnswerBlockEmpty(){
            const uid=getIdofResponse();
            const $chatbotresponsemainbodyblock=$('<div>',{class:'chatbotassistantresponsebodyblock',id:'chatbotassistantresponsebodyblock_'+uid});
            const $chatbotResponse = $('<div>', { class: 'chatbotassistantresponse',id:'chatbotassistantresponse_'+uid });
            const $assistantLogo = $('<div>', { class: 'assistantlogo',id:'assistantlogo_'+uid });
            const $spinner = $('<div>',{id:'spinnerandlogocontainer_'+uid}).append($('<p>', {
                class: 'spinner-border text-secondary spinner-border-sm',
                css: {
                    margin: '0',
                    width: '1.5rem',
                    height: '1.5rem'
                }
            }));
            $assistantLogo.append($spinner);
            const $assistantAnswer = $('<div>', { class: 'assistantactualanswer',id:'assistantactualanswer_'+uid });
                // .append($('<p>').text("Sure! Here's a piece discussing the impact of technology on society:"));
            $chatbotResponse.append($assistantLogo).append($assistantAnswer);
            $chatbotresponsemainbodyblock.append($chatbotResponse);
            $('#chatbotbodyblock').append($chatbotresponsemainbodyblock);
            return uid;
}


function functionAddResponse(response,id){
    debugger;
    const sp=$('<span>').text(response);
    $('#assistantactualanswer_'+id).append(sp);
}

function completetheresponse(id){
    const compicon=`<img src="images/openaiicon.png" style="
                        height: 18px;
                        width: 18px;
                    ">`;
    $('#spinnerandlogocontainer_'+id).html(compicon);
    $('#chatbotassistantresponsebodyblock_'+id).append(getActionIconofresponse());
}

function getActionIconofresponse(){
    var div = $('<div>', { class: 'chatbotresponseactions' });

    var icons = ['volume_up', 'content_copy', 'autorenew', 'thumb_down'];
    
    icons.forEach(function(icon) {
        var span = $('<span>', { class: 'material-symbols-outlined' });
        span.text(icon);
        div.append(span);
    });

    return div;
}

function getIdofResponse(){
    const numberOfChildren = $('#chatbotbodyblock').children().length+1;
    return 'response_'+numberOfChildren;
}