
/*FLOW
getHTML =>
    If debugmode => getOfferedServiceList(null)
    Else => get JSON Data
            getOfferedServiceList(json data)
    fillHTML
    fillServiceHTML
*/

function OfferedService(name, image, description, details)
{
    this.name = name;
    this.image = image;
    this.description = description;
    this.details = details;
}

//Gets the HTML for the services main div. Debugmode off will load from JSON data file.
OfferedService.prototype.getHTML = function (debugmode, target_id)
{
    if (debugmode)
    {
        const services_list = this.getOfferedServiceList(null);
        this.fillHTML(target_id, services_list);
    }
    else
    {
        fetch('assets/data/services.json')
            .then((response) => response.json())
            .then((json) =>
            {

                //Load JSON
                console.log("Loaded Services from JSON");
                const services_list = this.getOfferedServiceList(json);
                this.fillHTML(target_id, services_list);
            }).catch((error) =>
            {
                console.log(error);
            });
    }
};

//Creates the services section and fills it with service data.
OfferedService.prototype.fillHTML = function (target_id, services_list)
{
    let HTML = "<center><h1 class='resume_section_cardlesstitle'><span>Offered Services</span></h1></center>";
    HTML += "<div class='row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3 row_services'></div>";

    $(target_id).html(HTML);
    this.fillServiceHTML(services_list, target_id);
};


//Fills the services list with service cards.
OfferedService.prototype.fillServiceHTML = function (services_list, target_id)
{
    for (let i = 0; i < services_list.length; i++)
    {
        let service = services_list[i];
        let details = (service.details || service.description).replace(/"/g, "&quot;");
        let HTML = "";

        HTML += "<div class='col col_serviceslist'>";
        HTML += "<div class='card div_serviceslist' tabindex='0' data-bs-toggle='tooltip' title=\"" + details + "\">";
        HTML += "<div class='card-body'>";

        //Title
        HTML += "<center><h5 class='card-title service_title'>";
        HTML += service.name;
        HTML += "</h5></center>";

        //Image
        HTML += "<div class='service_imageholder'>";
        if (service.image)
        {
            HTML += "<img class='img-fluid service_image' src='" + service.image + "' alt='" + service.name + "'>";
        }
        else
        {
            HTML += "<div class='service_image_placeholder'>Service artwork coming soon</div>";
        }
        HTML += "</div>";

        //Divider and description
        HTML += "<hr class='service_divider'>";
        HTML += "<p class='service_description'>" + service.description + "</p>";

        HTML += "</div>"; //card-body
        HTML += "</div>"; //card
        HTML += "</div>"; //col

        $(target_id + " .row_services").append(HTML);
    }

    //Initialize tooltips on entire cards.
    $(target_id + " [data-bs-toggle='tooltip']").each(function ()
    {
        new bootstrap.Tooltip(this, { container: "body", placement: "top", trigger: "hover focus" });
    });
};


//Gets the list of service objects, will use JSON if provided. Null defaults to hard coded list for debugging.
OfferedService.prototype.getOfferedServiceList = function (json_data)
{
    let services_list = [];

    if (json_data == null)
    {
        services_list =
            [
                new OfferedService("Small Business Website", "", "Custom websites for small businesses.", "Responsive website design, development, and maintenance.")
            ];
    }
    else
    {
        for (let service of json_data.services)
        {
            services_list.push(new OfferedService(service.name, service.image, service.description, service.details));
        }
    }

    return services_list;
};
