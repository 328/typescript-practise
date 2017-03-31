"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var html2canvas = require("html2canvas");
var $ = require("jquery");
function image_generator() {
    var dfd = $.Deferred();
    html2canvas(document.body, {
        onrendered: function (canvas) {
            var formData = Canvas2FormData(canvas);
            dfd.resolve(formData);
        },
    });
    return dfd.promise();
}
function Canvas2FormData(canvas) {
    var base64Data = canvas.toDataURL().split(",")[1];
    var data = window.atob(base64Data);
    var buff = new ArrayBuffer(data.length);
    var arr = new Uint8Array(buff);
    for (var i = 0; i < data.length; i++) {
        arr[i] = data.charCodeAt(i);
    }
    var blob = new Blob([arr], { type: "image/png" });
    var formData = new FormData();
    formData.append("imagedata", blob);
    return formData;
}
function image_post(images) {
    var dfd = $.Deferred();
    $.ajax({
        cache: false,
        contentType: false,
        data: images,
        processData: false,
        type: "POST",
        url: "https://yabumi.cc/api/images.json",
    }).done(function (data, textStatus, xhr) {
        console.info(data);
        dfd.resolve(data);
    }).fail(function (xhr, textStatus, error) {
        console.error("error");
        console.error(xhr);
        console.error(textStatus);
        console.error(error);
    });
    return dfd.promise();
}
/*
$(function () {
$("#ss").on("click", function() {
  image_generator()
    .then(function(image) { return image_post(image); });
});
});
 */
$(function () {
    return $("#screenshots").on("click", function () {
        return image_generator()
            .then(function (image) { return image_post(image); });
    });
});
//# sourceMappingURL=yabumi.js.map