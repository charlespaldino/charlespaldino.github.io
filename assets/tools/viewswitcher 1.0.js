
var SinglePageViewManager = {        
	 default_view: "",
	 current_view: "",
	 next_view: "",
		
	switchView: function (data) 
	{
		current_view = (data == null || data == "") ? getDefaultView() : current_view;
		
		$("#"+current_view).hide();
		$("#"+data).show(500);
		current_view = data;
    },
	
	switchView: function (data, anchor) 
	{
		switchView(data);
		//change to anchor here, mb wait .5 sec?
    },
	
	
	setDefaultView: function (data) 
	{
		default_view = data;
        sessionStorage.setItem("global_viewmanager_singlepage_defaultview_id", data);
    },
    getDefaultView: function () 
	{
		return sessionStorage.getItem("global_viewmanager_singlepage_defaultview_id");
    },
	switchDefaultView: function (data) 
	{
		switchView(getDefaultView());
    }
}