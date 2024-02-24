function WorkHistory(company, title, startdate, enddate, description)
{
    this.company = company;
    this.title = title;
    this.startdate = startdate;
    this.enddate = enddate;
    this.description = description;
    this.history = [];
    this.fillHistory();
}


WorkHistory.prototype.getCompany = function () {
    return this.company;
};

WorkHistory.prototype.getTitle = function () {
    return this.title;
};

WorkHistory.prototype.getStartDate = function () {
    return this.startdate;
};

WorkHistory.prototype.getEndDate = function () {
    return this.enddate;
};

WorkHistory.prototype.getDescription = function () {
    return this.description;
};

WorkHistory.prototype.getWorkHistoryList = function ()
{
    const work_list =
    [
            new WorkHistory("Hospital Billing Collection Service", "Software Engineer", "04/07/2022", "10/31/2023", this.getHistory(0)),
            new WorkHistory("Fors Marsh Group", "Sharepoint Developer", "05/18/2020", "12/31/2021", "Developed, maintained, and enhanced classic/modern sharepoint sites, pages, and lists.<br />Rebuilt and developed new modern apps and sites using the SPFX Framework.<br />Includes work with PowerApps, Infopath, MS Flow and Sharepoint Designer 2013."),
            new WorkHistory("Emids", "Technical Lead", "12/16/2019", "3/01/2020", "Performed Full Stack technical analyses, training, and support for a variety of applications."),
            new WorkHistory("Tetruscorp", "Independent Contractor (.Net)", "2/04/2019", "1/03/2020", "Full Stack .Net Cloud development for a Community Corrections web application (ASP MVC).<br />Dealt with bugs and functionality enhancements.<br /> Cleaned & reorganized code for more efficient development.<br /> Helped optimize various queries and application performance.<br /> Acted as liaison with offshore development team.<br /> Handled Dev Ops for QA and UAT stages with Microsoft Azure services.<br /> Took over and streamlined code merges in the repository.<br /> Created and maintained SQL Server, Azure Blob, and Application Services.<br /> Documented the application for web service redeployment and handoff."),
            new WorkHistory("C2 Development Group", ".Net Architect", "2/01/2017", "1/10/2019", "Maintained legacy .Net ASP/VB warehouse management applications while developing new enhancements for more modern applications using .Net VB, ASP, C# and MVC.<br />Built out integration background services for Shopify, Magento, and Amazon that includes pulling down new orders, posting tracking, and updating product availability/categorization.</br >Designed and built various background services that handle maintenance, reporting, and alerts - all using a shared custom built reusable utility project."),
            new WorkHistory("RCM Technologies", "Consultant (.Net)", "12/07/2015", "07/15/2016", "Developed various desktop applications to handle data transformations and payroll compliance."),
            new WorkHistory("Protech Consulting", "Associate Programmer Analyst", "09/23/2015", "11/23/2015", "Helped bring a project to meet a targeted deadline - A trade web application built in JSP, hosted by Tomcat.<br />Corrected several database connectivity inefficiencies with code and query optimizations.<br /> Cleaned code, fixed bugs, and properly redesigned JSP pages.<br /> Added various functionality enhancements and fixed improperly implemented ones."),
            new WorkHistory("Triesten Technologies", "Software Engineer", "1/05/2015", "8/21/2015", "Developed backend enhancements, fixed bugs, and helped maintain a financial ratings application. The application was built in Java, leveraging JBOSS, HTML, and MongoDB."),
            new WorkHistory("McMahon Associates", "Software Engineer", "7/21/2014", "1/02/2015", "Developed enhancements for and helped maintain Traisr, a .Net ASP web-based infrastructure and asset-management application for transportation and engineering."),
            new WorkHistory("Radiant Systems Inc", "ServiceNow Developer (Production Support)", "6/16/2014", "7/1/2014", "Developed various parts of ServiceNow.<br />Handled tickets from Users, researced and developed solutions for their issues.<br />Developed Forms, UI Policies, Data Policies, Client Scripts, and UI Actions."),
            new WorkHistory("Technomax LLC", "Independent Contractor (Java)", "1/2/2013", "12/31/2013", "Handled basic bench marking of desktop applications, web applications, and web services.<br />Explored various mobile solutions, creating a few demos and one prototype for an existing web application.<br /> Performed various research requests into various software components and solutions.<br /> Performed functionality enhancement as well as testing on various web applications."),
            new WorkHistory("Dataform Software", "Software Development Engineer", "6/27/2012", "9/7/2012", "Led and organized project and code documentation efforts, including use of Standardized UATs and DocX. <br />Trained the intern in basic C# and OO Principles.<br />Redesigned and cleaned existing projects, including a WPF form creator leveraging DevX components."),
            new WorkHistory("Smart Information Management", "Java Developer", "1/20/2012", "4/10/2012", "Research and development - Benchmarking various databases such as MS SQL and Oracle using Java as a backend testing tool."),
            new WorkHistory("Open Systems Technologies", "Java Developer (Web Experienced)", "10/10/2011", "12/02/2011", "Back-end development of various business rules in an N-layered web application using Exigen's OpenL implementation.<br />Used Java for test automation, reading from an Excel spreadsheet and sending data to a mid layer rules engine."),
            new WorkHistory("AMEEsoft", "Lead Developer (Java)", "3/1/2011", "9/30/2011", "Developed a 3 part project encompassing a vast utility library, modular application package, and two flagship products. Developed in both java and .net. <br /> Responsible for business and management website design, construction, and management using WordPress, HTML, CSS, JavaScript, and PHP (mySQL database)."),
            new WorkHistory("Freelance", "Programming Trainer", "12/2009", "7/2011", "Trained students in .NET ASP/C# and Java. Both in web based and console applications."),
            new WorkHistory("AIG Global Services", "Developer (Intern)", "5/2008", "11/2008", "Worked on a Service-Now database as well as built several web pages that allowed clients to have better access their databases stored on AIG's servers.")
    ];


    return work_list;
};

WorkHistory.prototype.getHTML = function ()
{
    var work_list = this.getWorkHistoryList();
    var HTML = "";

    for (var i = 0; i < work_list.length; i++)
    {
        HTML += "<div class='card resume_maincard'>";
        HTML += "<div class='card-body div_cardbody'>";

        HTML += "<h5 class='card-title workhistory_cardtitle'>";

        HTML += "<div class='resume_floatleft'>";
        HTML += work_list[i].company;
        HTML += "</div>";
        HTML += "<div class='resume_floatright'>";
        HTML += work_list[i].startdate + " - " + work_list[i].enddate;
        HTML += "</div>";
        HTML += "</h5>";
        HTML += "<br />";
        HTML += "<span class='workhistory_title'/>";
        HTML += work_list[i].title;
        HTML += "<span/>";
        HTML += "<br />";
        
        HTML += "<p class='card-text p_workhistory_description'>" + work_list[i].description + "</p>";

        HTML += "";
        HTML += "</div>"; //card-body
        HTML += "</div>"; //card
    }

  
  
    return HTML;
};

WorkHistory.prototype.getHistory = function (index)
{
    return this.history[index];
}

WorkHistory.prototype.fillHistory = function ()
{
    this.history[0] = "";
    this.history[0] += "<ul>";

    this.history[0] += "<li>";
    this.history[0] += "Contracted to Hire via Net2Source & FirstPro (04/07/2022 to 11/08/2022), converted to full time.";
    this.history[0] += "</li>";

    this.history[0] += "<li>";
    this.history[0] += "Performed full stack development in a .Net environment, including web Applications, console applications, and cloud applications.";
    this.history[0] += "</li>";

    this.history[0] += "<li>";
    this.history[0] += "Lead a team of 4 Developers and assisted in managing teams of 3rd party contractors.";
    this.history[0] += "</li>";

    this.history[0] += "<li>";
    this.history[0] += "Managed over 20 projects using the Atlassian product suite (BitBucket, JIRA, Confluence).";
    this.history[0] += "</li>";

    this.history[0] += "<li>";
    this.history[0] += "Handled majority of support tickets coming in for our Team, delegating some of them to junior members.";
    this.history[0] += "</li>";

    this.history[0] += "<li>";
    this.history[0] += "Handled basic administration tasks and ticket requests for the Intranet Hub and MyMedPayment.com using Sitecore's admin suite.";
    this.history[0] += "</li>";

    this.history[0] += "<li>";
    this.history[0] += "Developed applications using the OutSystems PaaS cloud environment.";
    this.history[0] += "</li>";

    this.history[0] += "<li>";
    this.history[0] += "Developed and maintained various FACS external .aspx pages.";
    this.history[0] += "</li>";

    this.history[0] += "<li>";
    this.history[0] += "Modernized various background services/console applications as well as handled their migration & deployment for server upgrades.";
    this.history[0] += "</li>";

    this.history[0] += "<li>";
    this.history[0] += "Assisted in documentation, cleanup, and organization.";
    this.history[0] += "</li>";

    this.history[0] += "<li>";
    this.history[0] += "Managed and assisted in migrating servers and databases involving our payment processing web portal into clouded environments - Azure & Sharepoint.";
    this.history[0] += "</li>";

    this.history[0] += "<li>";
    this.history[0] += "Lead the migration of our Intranet from on premise servers to our Sharepoint host, including file migration and Active Directory integration.";
    this.history[0] += "</li>";

    this.history[0] += "</ul>";

    
}