function Summary(){}


Summary.prototype.getHTML = function ()
{
    let HTML = "";
    
    HTML += "<div class='card resume_maincard'>";
    HTML += "<div class='card-body div_cardbody'>";
        HTML += this.getSummary();
    HTML += "</div>"; //card body
    HTML += "</div>"; //card

    HTML += "<div class='card'>";
    HTML += "<div class='card-body div_cardbody'>";
        HTML += this.getTechnicalSkills();
    HTML += "</div>"; //card body
    HTML += "</div>"; //card 
    
    return HTML;
};


Summary.prototype.getSummary = function ()
{
    let HTML = "";

    HTML += "<center>";
        HTML += "<h3>Summary</h3>";
    HTML += "</center>";
    HTML += "<ul class='resume_alignleft'>";
    HTML += "<li>";
    HTML += "Open to Junior to Senior level positions, preference towards.Net and Azure.";
    HTML += "</li>";
    HTML += "<li>";
    HTML += "Open to Remote, Hybrid, Onsite roles, preference towards Remote.";
    HTML += "</li>";
    HTML += "<li>";
    HTML += "<span class='resume_bold'>Experience:</span> Mid Level .Net (~10 years), Jr Java Developer (~2.5 years)";
    HTML += "</li>";
    HTML += "<li>";
    HTML += "<span class='resume_bold'>Salary Range:</span> Open (Generally $35 to $50 / hr | $72k to $100k / annum)";
    HTML += "</li>";
    HTML += "<li>";
    HTML += "<span class='resume_bold'>Relocation:</span> Open to relocation for most areas.";
    HTML += "</li>";
    HTML += "<li>";
    HTML += "<span class='resume_bold'>Availability:</span> Immediate";
    HTML += "</li>";
    HTML += "<li>";
    HTML += "<span class='resume_bold'>Citizenship Status:</span> Natural born U.S.citizen.";
    HTML += "</li>";
    HTML += "</ul>";

    return HTML;
}

Summary.prototype.getTechnicalSkills = function ()
{
    let HTML = "";

    HTML += "<center>";
    HTML += "<h3>Technical Skills</h3>";
    HTML += "</center>";
    HTML += "<ul class='resume_alignleft'>";
    HTML += "<li>";
    HTML += "<span class='resume_bold'>OO Languages:</span> .Net(C#, VB), Java";
    HTML += "</li>";
    HTML += "<li>";
    HTML += "<span class='resume_bold'>Data:</span> XML, CSV, JSON";
    HTML += "</li>";
    HTML += "<li>";
    HTML += "<span class='resume_bold'>Databases:</span> tSQL";
    HTML += "</li>";
    HTML += "<li>";
    HTML += "<span class='resume_bold'>ORM:</span> Entities";
    HTML += "</li>";
    HTML += "<li>";
    HTML += "<span class='resume_bold'>Web Development:</span> .Net ASP (Classic, Standard, Razor, MVC), HTML (JavaScript, CSS, JQuery, Bootstrap)";
    HTML += "</li>";
    HTML += "<li>";
    HTML += "<span class='resume_bold'>Cloud Development:</span> Azure (General)";
    HTML += "</li>";
    HTML += "<li>";
    HTML += "<span class='resume_bold'>Web Servers:</span> IIS";
    HTML += "</li>";
    HTML += "<li>";
    HTML += "<span class='resume_bold'>.Net:</span> Core, WCF, WPF, Nunit, Winforms, Webforms";
    HTML += "</li>";
    HTML += "<li>";
    HTML += "<span class='resume_bold'>Tools:</span> Eclipse, Microsoft SQL Server Studio, Visual Studio";
    HTML += "</li>";
    HTML += "<li>";
    HTML += "<span class='resume_bold'>Collaboration:</span> SVN, Git";
    HTML += "</li>";
    HTML += "<li>";
    HTML += "<span class='resume_bold'>Patterns:</span> Singleton, Facade, Factory, Data Objects, Data Access Objects, MVC";
    HTML += "</li>";
    HTML += "<li>";
    HTML += "<span class='resume_bold'>Methodologies:</span> Scrum, Agile";
    HTML += "</li>";
    HTML += "</ul>";

    return HTML;
}
