/* File Client Side - javascript download library */

/* Structural */

//Download file with content from DOM Elements
function downloadFromElementToLink(element, filename, instantClick=false,linkElement="",mimeType="text/plain", contentType="", linkID="") {
    //Input
    let elementContent = "";
    if(contentType==="") {
        if(element.tagName=="input" || element.tagName=="INPUT" || element.tagName=="textarea" || element.tagName=="TEXTAREA") {
            elementContent = element.value;
        } else {
            elementContent = element.textContent;
        }
    } else {
        elementContent = element[contentType] || element.textContent || element.value; //value, textcontent, innerHTML, outerHTML
    }
    
    if(linkElement==="") {
        var link = document.createElement('a');
    } else {
        var link = linkElement;
    }
    
    mimeType = mimeType || "text/plain";
    
    link.setAttribute("download", filename);
    link.setAttribute("href", "data:"+mimeType+";charset=utf-8,"+ encodeURIComponent(elementContent));
    
    if(instantClick) link.click();
    return link;
}

function downloadFromStringToLink(string, filename, instantClick=false,linkElement="",mimeType="text/plain", linkID="") {
    
    if(linkElement==="") {
        var link = document.createElement('a');
    } else {
        var link = linkElement;
    }
    
    mimeType = mimeType || "text/plain";
    
    link.setAttribute("download", filename);
    link.setAttribute("href", "data:"+mimeType+";charset=utf-8,"+ encodeURIComponent(string));
    
    if(instantClick) link.click();
    return link;
}

function downloadFromElementBlob(element, filename, mimeType="text/plain", contentType="") {
    
    //Input
    let elementContent = "";
    if(contentType==="") {
        if(element.tagName=="input" || element.tagName=="INPUT" || element.tagName=="textarea" || element.tagName=="TEXTAREA") {
            elementContent = element.value;
        } else {
            elementContent = element.textContent;
        }
    } else {
        elementContent = element[contentType] || element.textContent || element.value; //value, textcontent, innerHTML, outerHTML
    }
    
    if (navigator.msSaveBlob) { // IE 10+ 
        navigator.msSaveBlob(new Blob([elementContent], { type: mimeType + ';charset=utf-8;' }), filename);
    /*} else if (typeof Blob!="undefined") {
        new Blob([elementContent], { type: mimeType + ';charset=utf-8;' });*/
    } else { console.log("Your browser do not support Blob"); return false; }
}

function downloadFromStringBlob(string, filename, mimeType="text/plain") {
    
    if (navigator.msSaveBlob) { // IE 10+ 
        navigator.msSaveBlob(new Blob([elementContent], { type: mimeType + ';charset=utf-8;' }), filename);
    /*} else if (typeof Blob!="undefined") {
        new Blob([elementContent], { type: mimeType + ';charset=utf-8;' });*/
    } else { console.log("Your browser do not support Blob"); return false; }
}

/* File Upload */
function getUploadedContent(evt, el=false) {
    if(!window.FileReader || !window.File) { console.log("Your browser do not support fileReader"); return false; }
    
    let files = evt.target.files;
    let f = files[0];
    
    var reader = new FileReader();
    
   reader.onload = function(e) {
         if(e.target.readyState==2) {   
           if(e.target.error) {
                console.log("Error while reading a file");
                return false;
            } else {                
                f.result = e.target.result;
               if(el) el.value = e.target.result;
                //el.ready = true;
            }
        }
    }
   
   
   reader.readAsText(f);
   return f;
   
}

function getUploadedContentFromDrop(evt, el=false) {
    evt.stopPropagation();
    evt.preventDefault();
    
    let files = evt.dataTransfer.files;
    let f = files[0];
    
    var reader = new FileReader();
    
   reader.onload = function(e) {
         if(e.target.readyState==2) {   
           if(e.target.error) {
                console.log("Error while reading a file");
                return false;
            } else {                
                f.result = e.target.result;
               if(el) el.value = e.target.result;
                //el.ready = true;
            }
        }
    }
   
   
   reader.readAsText(f);
   return f;
    
}

/* OOP */

//Directyl download from element
Element.prototype.download = function(type, filename, mimeType="text/plain",contentType="") {
    switch(type) {
    case "toLink":
    downloadFromElementToLink(this, filename, false, contentType);
    break;
    }
}
