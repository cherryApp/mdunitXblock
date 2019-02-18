// Init settings.
function mdUnitEdit(runtime, element) {
    
    
    $(function ($) {
        console.log("The xblock editor has been initialized.");
        console.log("Element, runtime: ", element, runtime);
        element.find("#file_upload_input").on("change", handleFileUpload);
    });
}

// Handle file upload.
function handleFileUpload(ev) {
    console.log(ev, this);
}
