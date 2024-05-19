
var debugmode = false;

$(document).ready(function () {
    $('.carousel').carousel('pause');
  
    $(".nav-link").on("click", function () {
        $(".nav-link").removeClass("active");
        $(this).addClass("active");
    })

    $("#navlink_home").on("click", function ()
    {
        $(".nav-link").removeClass("active");
    })

    var summary = new Summary();
    $("#view_summary_mobile").html(summary.getHTML());

    var workhistory = new WorkHistory();
    workhistory.getHTML(debugmode, "#view_resume_mobile");

    var trainingcerts = new TrainingCert();
    trainingcerts.getHTML(debugmode, "#view_training_mobile");

    var codesamples = new PortfolioCodeSample();
    codesamples.getHTML(debugmode, "#view_portfolio_samples_mobile");

    //Nav Links
    $("#navlink_home").on("click", function () {
        $('#main_carousel').carousel(0);
    })

    $("#navlink_resume").on("click", function () {
        $('#main_carousel').carousel(1);
    })

    $("#navlink_training").on("click", function () {
        $('#main_carousel').carousel(2);
    })

    $("#navlink_codesamples").on("click", function () {
        $('#main_carousel').carousel(3);
    })

    //$("#navlink_live").on("click", function ()
    //{
    //    switchView("section_porfolio_live");
    //})

});