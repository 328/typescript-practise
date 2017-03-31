import * as html2canvas from "html2canvas";
import * as $ from "jquery";

function image_generator() {
  let dfd = $.Deferred();
  html2canvas(document.body, {
    onrendered (canvas: any) {
      let formData = Canvas2FormData(canvas);
      dfd.resolve(formData);
    },
  });
  return dfd.promise();
}

function Canvas2FormData(canvas: any) {
  let base64Data: string = canvas.toDataURL().split(",")[1];
  let data: any = window.atob(base64Data);
  let buff: any = new ArrayBuffer(data.length);
  let arr: any = new Uint8Array(buff);

  for (let i: number = 0; i < data.length; i++) {
    arr[i] = data.charCodeAt(i);
  }

  let blob: any = new Blob([arr], {type: "image/png"});
  let formData: any = new FormData();
  formData.append("imagedata", blob);
  return formData;
}

function image_post(images: any) {
  let dfd = $.Deferred();
  $.ajax({
    cache: false,
    contentType: false,
    data: images,
    processData: false,
    type: "POST",
    url: "https://yabumi.cc/api/images.json",
  }).done(function(data, textStatus, xhr) {
    console.info(data);
    dfd.resolve(data);
  }).fail(function(xhr, textStatus, error) {
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
$(() =>
  $("#screenshots").on("click", () =>
    image_generator()
      .then((image) => image_post(image)),
  ),
);
