var VIEW_DEFAULT = "section_summary";
var SESSION_KEY_CURRENTVIEW = "global_viewmanager_currentview_id";


sessionStorage.setItem(SESSION_KEY_CURRENTVIEW, VIEW_DEFAULT);

function switchView(view_id)
{
	$("#" + sessionStorage.getItem(SESSION_KEY_CURRENTVIEW)).hide();
	$("#" + view_id).slideDown("slow");
	sessionStorage.setItem(SESSION_KEY_CURRENTVIEW, view_id);
}

