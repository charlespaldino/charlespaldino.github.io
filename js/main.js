
var debugmode = true;

$(document).ready(function () {
    $('.carousel').carousel('pause');

    $(".nav-link").on("click", function () {
        $(this).addClass("active")
    })

    var summary = new Summary();
    $("#view_summary").html(summary.getHTML());
    $("#view_summary_mobile").html($("#view_summary").html());

    var workhistory = new WorkHistory();
    workhistory.getHTML(debugmode, "#view_resume");

    var trainingcerts = new TrainingCert();
    trainingcerts.getHTML(debugmode, "#view_training");


    //Nav Links
    $("#navlink_home").on("click", function () {
        switchView("section_summary");
    })

    $("#navlink_resume").on("click", function () {
        switchView("section_resume");
    })

    $("#navlink_training").on("click", function () {
        switchView("section_training");
    })

    //$("#navlink_live").on("click", function ()
    //{
    //    switchView("section_porfolio_live");
    //})

});