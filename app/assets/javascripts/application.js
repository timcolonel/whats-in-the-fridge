// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require bootstrap
//= require turbolinks
//= require react
//= require react_ujs
//= require js-routes
//= require nprogress
//= require nprogress-turbolinks
//= require moment
//= require patching
//= require_tree .


var React = React;

//noinspection BadExpressionStatementJS
(function () {
    this.componentDidMount();
    this.componentDidUpdate();
});


var ready = function () {
    $('.timepicker').datetimepicker({
        format: 'HH:mm',
        pickDate: false,
        useCurrent: false,
        pick12HourFormat: false
    });
    $('[data-toggle="tooltip"]').tooltip();
    $(document).find(".markdown-editor").each(function () {
        var item = $(this);
        item.markdown({
            onPreview: function (e) {
                var originalContent = e.getContent();
                $.get(item.data('preview-url'), {text: originalContent}).done(function (data) {
                    e.setPreview(data)
                });
            }
        });
    });
};


$(document).ready(ready);
$(document).on('page:load', ready);
