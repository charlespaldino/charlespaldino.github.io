function WorkHistory(company, title, startdate, enddate, description, bulletpoints)
{
    this.company = company;
    this.title = title;
    this.startdate = startdate;
    this.enddate = enddate;
    this.description = description;
    this.bulletpoints = bulletpoints;
}

WorkHistory.prototype.getHTML = function (debugmode, target_id)
{
    if (debugmode)
    {
        const work_list = this.getWorkHistoryList(null);
        this.fillHTML(target_id, work_list);
    }
    else {
        fetch('assets/data/history.json')
            .then((response) => response.json())
            .then((json) => {
                //Load JSON
                const work_list = this.getWorkHistoryList(json);
                this.fillHTML(target_id, work_list);
            });
    }
};

WorkHistory.prototype.fillHTML = function (target_id, work_list)
{
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
        
        work_list[i].description = work_list[i].bulletpoints == null ? work_list[i].description : this.getBulletPoints(work_list[i].bulletpoints); 
        
        HTML += "<p class='card-text p_workhistory_description'>" + work_list[i].description + "</p>";
        
        HTML += "</div>"; //card-body
        HTML += "</div>"; //card
    }
    
    $(target_id).html(HTML);
    $(target_id + "_mobile").html($(target_id).html());
}

WorkHistory.prototype.getWorkHistoryList = function (json_data)
{
    var work_list = []
    if (json_data == null)
    {
        work_list =
            [
                new WorkHistory("Hospital Billing Collection Service", "Software Engineer", "04/07/2022", "10/31/2023", this.getSampleHistory(),null),
                new WorkHistory("Fors Marsh Group", "Sharepoint Developer", "05/18/2020", "12/31/2021", "Developed, maintained, and enhanced classic/modern sharepoint sites, pages, and lists.<br />Rebuilt and developed new modern apps and sites using the SPFX Framework.<br />Includes work with PowerApps, Infopath, MS Flow and Sharepoint Designer 2013.", null),
                new WorkHistory("Emids", "Technical Lead", "12/16/2019", "3/01/2020", "Performed Full Stack technical analyses, training, and support for a variety of applications.", null),
                new WorkHistory("Tetruscorp", "Independent Contractor (.Net)", "2/04/2019", "1/03/2020", "Full Stack .Net Cloud development for a Community Corrections web application (ASP MVC).<br />Dealt with bugs and functionality enhancements.<br /> Cleaned & reorganized code for more efficient development.<br /> Helped optimize various queries and application performance.<br /> Acted as liaison with offshore development team.<br /> Handled Dev Ops for QA and UAT stages with Microsoft Azure services.<br /> Took over and streamlined code merges in the repository.<br /> Created and maintained SQL Server, Azure Blob, and Application Services.<br /> Documented the application for web service redeployment and handoff.", null),
                new WorkHistory("C2 Development Group", ".Net Architect", "2/01/2017", "1/10/2019", "Maintained legacy .Net ASP/VB warehouse management applications while developing new enhancements for more modern applications using .Net VB, ASP, C# and MVC.<br />Built out integration background services for Shopify, Magento, and Amazon that includes pulling down new orders, posting tracking, and updating product availability/categorization.</br >Designed and built various background services that handle maintenance, reporting, and alerts - all using a shared custom built reusable utility project.", null),
                new WorkHistory("RCM Technologies", "Consultant (.Net)", "12/07/2015", "07/15/2016", "Developed various desktop applications to handle data transformations and payroll compliance.", null),
                new WorkHistory("Protech Consulting", "Associate Programmer Analyst", "09/23/2015", "11/23/2015", "Helped bring a project to meet a targeted deadline - A trade web application built in JSP, hosted by Tomcat.<br />Corrected several database connectivity inefficiencies with code and query optimizations.<br /> Cleaned code, fixed bugs, and properly redesigned JSP pages.<br /> Added various functionality enhancements and fixed improperly implemented ones.", null),
                new WorkHistory("Triesten Technologies", "Software Engineer", "1/05/2015", "8/21/2015", "Developed backend enhancements, fixed bugs, and helped maintain a financial ratings application. The application was built in Java, leveraging JBOSS, HTML, and MongoDB.", null),
                new WorkHistory("McMahon Associates", "Software Engineer", "7/21/2014", "1/02/2015", "Developed enhancements for and helped maintain Traisr, a .Net ASP web-based infrastructure and asset-management application for transportation and engineering.", null),
                new WorkHistory("Radiant Systems Inc", "ServiceNow Developer (Production Support)", "6/16/2014", "7/1/2014", "Developed various parts of ServiceNow.<br />Handled tickets from Users, researced and developed solutions for their issues.<br />Developed Forms, UI Policies, Data Policies, Client Scripts, and UI Actions.", null),
                new WorkHistory("Technomax LLC", "Independent Contractor (Java)", "1/2/2013", "12/31/2013", "Handled basic bench marking of desktop applications, web applications, and web services.<br />Explored various mobile solutions, creating a few demos and one prototype for an existing web application.<br /> Performed various research requests into various software components and solutions.<br /> Performed functionality enhancement as well as testing on various web applications.", null),
                new WorkHistory("Dataform Software", "Software Development Engineer", "6/27/2012", "9/7/2012", "Led and organized project and code documentation efforts, including use of Standardized UATs and DocX. <br />Trained the intern in basic C# and OO Principles.<br />Redesigned and cleaned existing projects, including a WPF form creator leveraging DevX components.", null),
                new WorkHistory("Smart Information Management", "Java Developer", "1/20/2012", "4/10/2012", "Research and development - Benchmarking various databases such as MS SQL and Oracle using Java as a backend testing tool.", null),
                new WorkHistory("Open Systems Technologies", "Java Developer (Web Experienced)", "10/10/2011", "12/02/2011", "Back-end development of various business rules in an N-layered web application using Exigen's OpenL implementation.<br />Used Java for test automation, reading from an Excel spreadsheet and sending data to a mid layer rules engine.", null),
                new WorkHistory("AMEEsoft", "Lead Developer (Java)", "3/1/2011", "9/30/2011", "Developed a 3 part project encompassing a vast utility library, modular application package, and two flagship products. Developed in both java and .net. <br /> Responsible for business and management website design, construction, and management using WordPress, HTML, CSS, JavaScript, and PHP (mySQL database).", null),
                new WorkHistory("Freelance", "Programming Trainer", "12/2009", "7/2011", "Trained students in .NET ASP/C# and Java. Both in web based and console applications.", null),
                new WorkHistory("AIG Global Services", "Developer (Intern)", "5/2008", "11/2008", "Worked on a Service-Now database as well as built several web pages that allowed clients to have better access their databases stored on AIG's servers.", null)
                ];
    }
    else
    {
        for (var history of json_data.history) {
            work_list.push(new WorkHistory(history.company, history.title, history.startdate, history.enddate, history.description, history.bulletpoints))
        }
    }


    return work_list;
};

WorkHistory.prototype.getBulletPoints = function (data)
{
    var HTML = data;
    if (Array.isArray(data))
    {
        HTML = "";
        HTML += "<ul class='nobold'>";

        for (var x = 0; x < data.length; x++) {
            HTML += "<li>";
            HTML += data[x];
            HTML += "</li>";
        }

        HTML += "</ul>";
    }
    
    return HTML;
}

WorkHistory.prototype.getSampleHistory = function ()
{
    var HTML = "";

    HTML = "";
    HTML += "<ul class='nobold'>";

    HTML += "<li>";
    HTML += "Contracted to Hire via Net2Source & FirstPro (04/07/2022 to 11/08/2022), converted to full time.";
    HTML += "</li>";

    HTML += "<li>";
    HTML += "Performed full stack development in a .Net environment, including web Applications, console applications, and cloud applications.";
    HTML += "</li>";

    HTML += "<li>";
    HTML += "Lead a team of 4 Developers and assisted in managing teams of 3rd party contractors.";
    HTML += "</li>";

    HTML += "<li>";
    HTML += "Managed over 20 projects using the Atlassian product suite (BitBucket, JIRA, Confluence).";
    HTML += "</li>";

    HTML += "<li>";
    HTML += "Handled majority of support tickets coming in for our Team, delegating some of them to junior members.";
    HTML += "</li>";

    HTML += "<li>";
    HTML += "Handled basic administration tasks and ticket requests for the Intranet Hub and MyMedPayment.com using Sitecore's admin suite.";
    HTML += "</li>";

    HTML += "<li>";
    HTML += "Developed applications using the OutSystems PaaS cloud environment.";
    HTML += "</li>";

    HTML += "<li>";
    HTML += "Developed and maintained various FACS external .aspx pages.";
    HTML += "</li>";

    HTML += "<li>";
    HTML += "Modernized various background services/console applications as well as handled their migration & deployment for server upgrades.";
    HTML += "</li>";

    HTML += "<li>";
    HTML += "Assisted in documentation, cleanup, and organization.";
    HTML += "</li>";

    HTML += "<li>";
    HTML += "Managed and assisted in migrating servers and databases involving our payment processing web portal into clouded environments - Azure & Sharepoint.";
    HTML += "</li>";

    HTML += "<li>";
    HTML += "Lead the migration of our Intranet from on premise servers to our Sharepoint host, including file migration and Active Directory integration.";
    HTML += "</li>";

    HTML += "</ul>";


    return HTML;
}
