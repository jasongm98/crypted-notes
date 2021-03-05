$(document).ready(() => {
  $('body').tooltip({ selector: '[data-toggle=tooltip]' });
  $('#summernote').summernote({
    lang: 'es-ES',
    disableDragAndDrop: true,
    height: 300,
    toolbar: [
      ['misc', ['undo', 'redo']],
      ['style', ['style', 'bold', 'italic', 'underline', 'clear']],
      ['font', ['strikethrough', 'superscript', 'subscript']],
      ['fontname', ['fontname']],
      ['color', ['color']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['link']],
      ['view', ['codeview', 'help']],
    ],
  });
});
