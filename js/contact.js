
/*FLOW
getHTML =>
    Build modal HTML
    Populate service dropdown
    Bind form submission
send =>
    Create email from form data
*/

function ServiceContact()
{
}

//Creates the contact modal and populates the services dropdown.
ServiceContact.prototype.getHTML = function (services_list)
{
    $("#service_contact_modal").remove();

    let HTML = "";
    HTML += "<div class='modal fade service_contact_modal' id='service_contact_modal' tabindex='-1' aria-labelledby='service_contact_title' aria-hidden='true'>";
    HTML += "<div class='modal-dialog modal-dialog-centered'>";
    HTML += "<div class='modal-content'>";
    HTML += "<div class='modal-header'>";
    HTML += "<h4 class='modal-title' id='service_contact_title'>Contact</h4>";
    HTML += "</div>";

    HTML += "<form id='service_contact_form'>";
    HTML += "<div class='modal-body'>";

    //Name
    HTML += "<div class='mb-3'>";
    HTML += "<label for='service_contact_name' class='form-label'>Name</label>";
    HTML += "<input type='text' class='form-control' id='service_contact_name' maxlength='100' autocomplete='name' required>";
    HTML += "</div>";

    //Email
    HTML += "<div class='mb-3'>";
    HTML += "<label for='service_contact_email' class='form-label'>Email</label>";
    HTML += "<input type='email' class='form-control' id='service_contact_email' maxlength='254' autocomplete='email' required>";
    HTML += "</div>";

    //Service
    HTML += "<div class='mb-3'>";
    HTML += "<label for='service_contact_service' class='form-label'>Service</label>";
    HTML += "<select class='form-select' id='service_contact_service' required>";
    HTML += "<option value='' selected disabled>Select a service</option>";
    HTML += "</select>";
    HTML += "</div>";

    //Notes
    HTML += "<div class='mb-3'>";
    HTML += "<label for='service_contact_notes' class='form-label'>Notes</label>";
    HTML += "<textarea class='form-control' id='service_contact_notes' rows='5' maxlength='4000' placeholder='Tell me a little about what you need...' required></textarea>";
    HTML += "</div>";

    HTML += "</div>"; //modal-body
    HTML += "<div class='modal-footer'>";
    HTML += "<button type='submit' class='btn service_contact_send'>Send</button>";
    HTML += "<div id='service_contact_status' class='w-100 text-center small' role='status' aria-live='polite'></div>";
    HTML += "</div>";
    HTML += "</form>";

    HTML += "</div>"; //modal-content
    HTML += "</div>"; //modal-dialog
    HTML += "</div>"; //modal

    $("body").append(HTML);

    //Populate service dropdown.
    for (let service of services_list)
    {
        $("#service_contact_service").append(new Option(service.name, service.name));
    }
    $("#service_contact_service").append(new Option("Other", "Other"));

    //Bind submission.
    $("#service_contact_form").on("submit", (event) =>
    {
        event.preventDefault();
        this.send();
    });
};



//Sends the contact request through the Clockworld API.
ServiceContact.prototype.send = async function ()
{
    const $button = $("#service_contact_form button[type='submit']");
    const $status = $("#service_contact_status");

    const data = {
        name: $("#service_contact_name").val().trim(),
        email: $("#service_contact_email").val().trim(),
        service: $("#service_contact_service").val(),
        notes: $("#service_contact_notes").val().trim()
    };

    $button.prop("disabled", true).text("Sending...");
    $status.removeClass("text-danger text-success").text("");

    try
    {
        const response = await fetch("https://clockworkclockworld.com/api/portfolio/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error("Contact request failed: " + response.status);

        $status.addClass("text-success").text("Message sent successfully!");
        $("#service_contact_form")[0].reset();

        setTimeout(() =>
        {
            bootstrap.Modal.getInstance(document.getElementById("service_contact_modal"))?.hide();
            $status.text("");
        }, 1500);
    }
    catch (error)
    {
        console.error("Contact submission failed:", error);
        $status.addClass("text-danger").text("Unable to send your message. Please try again.");
    }
    finally
    {
        $button.prop("disabled", false).text("Send");
    }
};


