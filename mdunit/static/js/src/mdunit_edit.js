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
