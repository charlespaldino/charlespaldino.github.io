function TrainingCert(category, name,courses, hours, url)
{
    this.category = category;
    this.name = name;
    this.courses = courses;
    this.hours = hours;
    this.url = url;
}

TrainingCert.prototype.getTrainingCertList = function (debugmode)
{
    console.log("Debug = "+false);

    var training_list = [];

    if (debugmode)
    {
        training_list =
            [
                new TrainingCert("Architecture", "Microservices", 3, 5, "https://drive.proton.me/urls/5M8YDQBA30#ZDWwYmUZi6m2"),
                new TrainingCert("Net", "C#", 9, 18, "https://drive.proton.me/urls/84BDNCM6YW#pEwyqItO3Krq"),
                new TrainingCert("Java", "JS2E", 6, 15, "https://drive.proton.me/urls/QSKQ4ZMW4W#oFnm5EJbzczg"), //completing
                new TrainingCert("Web Development", "HTML", 1, 6, "https://drive.proton.me/urls/PFSA9M7ZWG#q6vMC94Nd4K8"),
                new TrainingCert("Web Development", "CSS", 4, 16, "https://drive.proton.me/urls/CSQZJ9SSQR#rnrT83tI3bBx"),
                new TrainingCert("Web Development", "Javascript", 2, 11, "https://drive.proton.me/urls/KVV5ZPE2V4#JKueDhfSI89t"),
                new TrainingCert("Web Development", "Bootstrap", 2, 10, "https://drive.proton.me/urls/HP9FXGN5XM#OYa8nfbZmCKi"),
                new TrainingCert("Web Development", "jQuery", 3, 8, "https://drive.proton.me/urls/1AWYEDWC9G#h4OFmvzlcYF0"),
                new TrainingCert("Sharepoint", "General Sharepoint", 10, 17, "https://drive.proton.me/urls/9ADFEKRZ14#XT40kSubezCS"),
                new TrainingCert("CMS", "Drupal", 4, 4, "https://drive.proton.me/urls/5WVTXNEF88#GXW8AAZrJ0jU"),
                new TrainingCert("Azure", "Azure Data", 4, 3, "https://drive.proton.me/urls/BEJW2H6K3G#O8dp93o0FVKb")
            ];
      
    }
    else
    {
        fetch('assets/data/training.json')
            .then((response) => response.json())
            .then((json) =>
            {

                for (var training of json.training)
                {
                    training_list.push(new TrainingCert(training.category, training.name, training.courses, training.hours, training.url))
                }
                
            });
    }
    
    return training_list;
};

TrainingCert.prototype.getTrainingCategoryList = function (debugmode) {
    var training_list = this.getTrainingCertList(debugmode);
    const category_list = [];

    for (var i = 0; i < training_list.length; i++)
    {
        if (!category_list.includes(training_list[i].category)) { category_list[i] = training_list[i].category; }        
    }
 
    return category_list;
};

TrainingCert.prototype.getHTML = function (debugmode)
{
    var category_list = this.getTrainingCategoryList(debugmode);
   
    var HTML = "";

    //generate category sections.
    for (var i = 0; i < category_list.length; i++)
    {
        if (category_list[i] == null){continue;} //skip extras

        HTML += "<h3 class='span_traininglist_category'>";
        HTML += category_list[i] == 'Net' ? ".Net" : category_list[i]; //Special case, period breaks ID.
        HTML += "</h3>";
        HTML += "<hr class='hr_traininglist'>";
        HTML += "<div id='category_" + category_list[i].replace(" ", "_") + "' class='row row-cols-2 row-cols-md-5 row-cols-lg-5 g-3 row_trainingcerts'>";
        HTML += "</div>";
    }

 

    return HTML;
};

TrainingCert.prototype.fillHTML = function ()
{
    var training_list = this.getTrainingCertList(debugmode);

    for (var i = 0; i < training_list.length; i++)
    {
        var HTML = "";
        HTML += "<div class='col col_traininglist'>";
            HTML += "<div class='card div_traininglist'>";
                HTML += "<div class='card-body'>";
                    HTML += "<center><h5 class='card-title title_training'>";
                        HTML += "<a href='" + training_list[i].url + "'>" + training_list[i].name + "</a>";
                    HTML += "</h5></center>";
                    HTML += "<span/>";
                        HTML += "<b>Courses:</b> "+training_list[i].courses;
                    HTML += "<span/>";
                    HTML += "<br />";
                    HTML += "<span/>";
                        HTML += "<b>Hours:</b> " + training_list[i].hours;
                    HTML += "<span/>";
                HTML += "</div>"; //card-body
            HTML += "</div>"; //card
        HTML += "</div>"; //col

        //inject into the category
        $("#category_" + training_list[i].category.replace(" ","_")).append(HTML);
    }

}