
var debugmode = false;

$(document).ready(function () {
    $('.carousel').carousel('pause');
  

    $(".nav-link").on("click", function () {
        $(".nav-link").removeClass("active");
        $(this).addClass("active");
    })

    var summary = new Summary();
    $("#view_summary").html(summary.getHTML());
    $("#view_summary_mobile").html($("#view_summary").html());

    var workhistory = new WorkHistory();
    workhistory.getHTML(debugmode, "#view_resume");

    var trainingcerts = new TrainingCert();
    trainingcerts.getHTML(debugmode, "#view_training");

    var codesamples = new PortfolioCodeSample();
    codesamples.getHTML(debugmode, "#view_portfolio_samples");

    //Nav Links
    $("#navlink_home").on("click", function () {
        switchView("section_summary");
        $('#main_carousel').carousel(0);
    })

    $("#navlink_resume").on("click", function () {
        switchView("section_resume");
        $('#main_carousel').carousel(1);
    })

    $("#navlink_training").on("click", function () {
        switchView("section_training");
        $('#main_carousel').carousel(2);
    })

    $("#navlink_codesamples").on("click", function () {
        switchView("section_portfolio_samples");
        $('#main_carousel').carousel(3);
    })

    //$("#navlink_live").on("click", function ()
    //{
    //    switchView("section_porfolio_live");
    //})

});