

function PortfolioCodeSample(category, tool, github_url, projects)
{
    this.category = category;
    this.tool = tool;
    this.github_url = github_url;
    this.projects = projects;
}

function PortfolioCodeSampleProject(name, description, github_url, video_url, demo_url)
{
    this.name = name;
    this.description = description;
    this.github_url = github_url;
    this.video_url = video_url;
    this.demo_url = demo_url;
}

PortfolioCodeSample.prototype.getHTML = function (debugmode, target_id)
{
    if (debugmode)
    {
        const codesample_list = this.getPortfolioCodeSampleList(null);
        this.fillHTML(target_id, codesample_list);
    }
    else {
        fetch('assets/data/samples.json')
            .then((response) => response.json())
            .then((json) => {
                //Load JSON
                console.log("Loaded Code Samples from JSON");
                const codesample_list = this.getPortfolioCodeSampleList(json);
                this.fillHTML(target_id, codesample_list);
            }).catch((error) => {
                console.log(error)
            });
    }
};

PortfolioCodeSample.prototype.getPortfolioCodeSampleList = function (json_data) {

    var codesample_list = [];

    if (json_data == null) {
        codesample_list =
            [
                new PortfolioCodeSample("Net", "C#", "https://github.com/charlespaldino/DotNet-CSharp", [
                    new PortfolioCodeSampleProject("CSharpUtilities", "A small .NEt C# utility project with some stand alone tools.", "https://github.com/charlespaldino/DotNet-CSharp/tree/main/CSharpUtilities", "", null)
                ]),
                new PortfolioCodeSample("Net", "VB", "https://github.com/charlespaldino/DotNet-VB", [
                    new PortfolioCodeSampleProject("VBUtilities", "A small .Net VB utility project with some stand alone tools.", "https://github.com/charlespaldino/DotNet-VB/tree/main/VBUtilities", "", null)
                ]),
                new PortfolioCodeSample("Net", "WPF", "https://github.com/charlespaldino/DotNet-WPF", [
                    new PortfolioCodeSampleProject("BasicMessagingForm", "A small WPF app that uses MSMQ to simulate a chatroom. Run two instances to use.", "https://github.com/charlespaldino/DotNet-WPF/tree/main/BasicMessagingForm", "", null)
                ]),
                new PortfolioCodeSample("Net", "ASP Core Razor", "https://github.com/charlespaldino/DotNet-ASP-Core-Razor", [
                    new PortfolioCodeSampleProject("PaldinoCrafts", "A small Razor site that displays store items and their ratings.", "https://github.com/charlespaldino/DotNet-ASP-Core-Razor/tree/main/PaldinoCrafts", "", null),
                    new PortfolioCodeSampleProject("MoviesApp", "A small Razor site that lists movie reviews, includes admin section for uploading new reviews.", "https://github.com/charlespaldino/DotNet-ASP-Core-Razor/tree/main/MoviesApp", "", null)
                ]),
                new PortfolioCodeSample("Net", "ASP Core MVC", "https://github.com/charlespaldino/DotNet-ASP-Core-MVC", [
                    new PortfolioCodeSampleProject("ExploreCalifornia", "A travel site converted to MVC from HTML, based off a LinkedIn Learning course.", "https://github.com/charlespaldino/DotNet-ASP-Core-MVC/tree/main/ExploreCalifornia", "", null)
                ]),
                new PortfolioCodeSample("Java", "J2SE", "https://github.com/charlespaldino/Java-J2SE", [
                    new PortfolioCodeSampleProject("LogicGates", "A small Java J2SE project that has components to simulate a basic circuit board. Uses JUnit for testing.", "https://github.com/charlespaldino/Java-J2SE/tree/main/LogicGates", "", null)
                ]),
                new PortfolioCodeSample("HTML", "HTML", "https://github.com/charlespaldino/HTML", [
                    new PortfolioCodeSampleProject("ClockApp", "A small HTML website site that displays both digital and analog clocks.", "https://github.com/charlespaldino/HTML/tree/main/ClockApp_Basic", "", "Demos/ClockApp_Basic/charlespaldino_basicclockapp.html"),
                    new PortfolioCodeSampleProject("WeatherApp", "A small HTML site that taps into a weather service to display weather data.", "https://github.com/charlespaldino/HTML/tree/main/WeatherApp_Basic", "", "Demos/WeatherApp_Basic/charlespaldino_basicweatherapp.html")
                ])
            ];

    }
    else {
        for (var codesample of json_data.codesample)
        {
            var sample = new PortfolioCodeSample(codesample.category, codesample.tool, codesample.github_url, null);
            sample.projects = [];

            for (var project of codesample.projects)
            {
                sample.projects.push(new PortfolioCodeSampleProject(project.name, project.description, project.github_url, project.video_url, project.demo_url));
            }

            codesample_list.push(sample);

        }
    }

    return codesample_list;
};

PortfolioCodeSample.prototype.getPortfolioCategoryList = function (codesample_list)
{
    const category_list = [];

    for (var i = 0; i < codesample_list.length; i++) {
        if (!category_list.includes(codesample_list[i].category)) { category_list[i] = codesample_list[i].category; }
    }

    return category_list;
};

//Gets the HTML for categories, filled with the  given category list.
PortfolioCodeSample.prototype.getCategoryHTML = function (category_list)
{
    var HTML = "";

    for (var i = 0; i < category_list.length; i++)
    {
        if (category_list[i] == null) { continue; } //skip extras

        HTML += "<h3 class='resume_span_category'>";
        HTML += category_list[i] == 'Net' ? ".Net" : category_list[i]; //Special case, period breaks ID.
        HTML += "</h3>";
        HTML += "<hr class='resume_hr_categorylist'>";
        HTML += "<div id='category_" + category_list[i].replace(" ", "_") + "' class='row row-cols-2 row-cols-md-5 row-cols-lg-5 g-3 row_trainingcerts'>";
        HTML += "</div>";
    }

    return HTML;
};

//Fills the category list with training data.
PortfolioCodeSample.prototype.fillCategoryHTML = function (codesample_list) {
    for (var i = 0; i < codesample_list.length; i++)
    {
        var HTML = "";
        HTML += "<div class='col col_traininglist'>";
        HTML += "<div class='card div_traininglist'>";
        HTML += "<div class='card-body cardbody_codesample'>";
        HTML += "<center><h5 class='card-title'>";
        HTML += "<a href='" + codesample_list[i].github_url + "'>" + codesample_list[i].tool + "</a>";
        HTML += "</h5></center>";

        for (var project of codesample_list[i].projects)
        {
            HTML += "<span>";

            //if (project.demo_url != null)
            //{
            //    HTML += "<a href='" + project.demo_url + "' class='sample_tooltip' target='_blank'>"; --FIX CSS, top level site interferring with it. Add Bootstrap.
            //}

            HTML += "<small><strong>" + project.name + "</strong></small>";
            HTML += "</a>";
            HTML += "</span>";
            HTML += "<span class='float-end'>";
            HTML += "<img src='img/info-circle.svg' class='resume_mini_icon' title=' " + project.description + "' alt='Info'></a>";
            HTML += "<a href=' " + project.github_url + "'><img src='img/github.svg' class='resume_mini_icon resume_mini_icon_github' alt='GitHub'></a>";
            HTML += "</span>";
            HTML += "<br />";
        }

        HTML += "</div>"; //card-body
        HTML += "</div>"; //card
        HTML += "</div>"; //col
        //inject into the category
        $("#category_" + codesample_list[i].category.replace(" ", "_")).append(HTML);
        $(".resume_mini_icon").tooltip(); //Sets descriptions.

        //Setup menu
        $("#nav_ul_codesamples_dropdown").append("<li><a class='dropdown-item menuitem_" + codesample_list[i].category + "' href='" + codesample_list[i].github_url + "'>"
            + (codesample_list[i].category == "Net" ? ".Net" : codesample_list[i].category) + " "
            + (codesample_list[i].category == codesample_list[i].tool ? "" : codesample_list[i].tool)
            + "</a></li>");
    }

}

PortfolioCodeSample.prototype.fillHTML = function (target_id, codesample_list) {
    var category_list = this.getPortfolioCategoryList(codesample_list);

    $(target_id).html(this.getCategoryHTML(category_list));
    this.fillCategoryHTML(codesample_list);


    //Setup
    for (var x = 0; x < category_list.length - 1; x++)
    {
        $("<li><hr class='dropdown-divider'></li>").insertAfter($(".menuitem_" + category_list[x]).last());
    }


    $(target_id + "_mobile").html($(target_id).html());
}
