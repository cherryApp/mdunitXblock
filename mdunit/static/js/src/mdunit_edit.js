// Init settings.
function mdUnitEdit(runtime, element) {
    $(function ($) {
        console.log("The xblock editor has been initialized.");
        console.log("Element, runtime: ", element, runtime);

        var input = element.find("#file_upload_input");
        input.on("change", handleFileUpload);
        element.find(".file-trigger").on("click", function () {
            input.click();
        });
    });

    var handlerUrl = runtime.handlerUrl(element, 'save_mdunit');

    $(element).find('.action-save').bind('click', function () {
        var data = {
            'display_name': $('#mdunit_edit_display_name').val(),
            'md_url': $('#mdunit_file_path').val()
        };

        console.log(data);

        runtime.notify('save', {state: 'start'});

        $.post(handlerUrl, JSON.stringify(data)).done(function (response) {
            if (response.result === 'success') {
                runtime.notify('save', {state: 'end'});
                // Reload the whole page :
                window.location.reload(false);
            } else {
                runtime.notify('error', {msg: response.message})
            }
        });
    });
}

// Handle file upload.
function handleFileUpload(ev) {
    var file = this.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        // The file's text will be printed here
        console.log(e.target.result);
    };
    
    reader.readAsText(file);
}

function uploadCaption(url) {
    $('#loading-upload').show();
    var action = getFileUploadUrl(url);
    var formData = new FormData($('#file-chooser')[0]);
    $.ajax({
        url: action,  //server script to process data
        type: 'POST',
        xhr: function () {  // custom xhr
            myXhr = $.ajaxSettings.xhr();
            //if (myXhr.upload) { // check if upload property exists
            //    myXhr.upload.addEventListener('progress', progressHandlingFunction, false); // for handling the progress of the upload
            //}
            return myXhr;
        },
        //beforeSend: beforeSendHandler,
        success: function (msg) {
            $('#loading-upload').hide();
            if (msg['asset']['url']) {
                $('#videojs_sub_title').val(msg['asset']['url']);
                $('#upload-success').show();
            } else {
                $('#upload-fail').show();
            }
        },
        // Form数据
        data: formData,
        //Options to tell JQuery not to process data or worry about content-type
        cache: false,
        contentType: false,
        processData: false
    });
}

function getFileUploadUrl(str) {
    return '/assets/course' + str.slice(str.indexOf('block-') + 5, str.indexOf('+type')) + '/';
}
