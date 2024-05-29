function AlertFail(Alert){
    const htm=`<div class="alert alert-danger alert-dismissible fade show">
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `+Alert+`
            </div>`;
    $('#chatbotbodyblock').append(htm);
}