function createQuestionBlock(question){
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
    const $messageByUser = $('<div>', { class: 'messagebyuser' }).text('Hi');

    // Append the message by user div to the user message div
    $userMessage.append($messageByUser);

    // Append the user message edit div and the user message div to the main container
    $userMessageBlock.append($userMessageEdit);
    $userMessageBlock.append($userMessage);

    // Append the main container to the body (or any other desired parent element)
    $('#chatbotbodyblock').append($userMessageBlock);

}