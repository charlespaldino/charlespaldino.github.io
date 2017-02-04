var image_prepend = "<img class='image_dice_small' src='..\\diceroller\\images\\";
var CurrentDiceGroup = new DiceGroup();

//Adds dice to the CurrentDiceGroup.
function addDice(die)
{
	var prependtext = image_prepend + "SiteD"+die+".png'></img>";
	
	//var prependtext = "";

	$('#dicecontainer').prepend(prependtext);
	
	CurrentDiceGroup.addDice(new Die(die));
	
	$('#dicetextfield').val(getDiceText());
	
	
		
}

//Clears the dice from the text field and the container.
function clearDice()
{
	$('#dicetextfield').val("");
	$('#dicecontainer').html("");
	$('#historytextarea').val("");

	CurrentDiceGroup.clearDice();
}

//Rolls all dice within CurrentDiceGroup and updates the history.
function rollDice()
{
	CurrentDiceGroup.rollDice();

	updateHistory(CurrentDiceGroup.lastdiceroll);
}

//Adds the given text to history.
function updateHistory(text) 
{
	$('#historytextarea').val($('#historytextarea').val() + text +"\n");
	$('#historytextarea').scrollTop($('#historytextarea')[0].scrollHeight);
	

}

//Formats the dice text for the display bar.
function getDiceText()
{
	var dicetext = "";
	var dicearray = new Array();
	for(var i = 0; i < CurrentDiceGroup.dicegroup.length; i++)
	{		
		var s = CurrentDiceGroup.dicegroup[i].sides;		

		if(dicearray[s] == 'undefined' || dicearray[s] == null)
		{
			dicearray[s] = 0;
		}

		dicearray[s] += 1;
	}

	for(var sides = 0; sides < dicearray.length; sides++)
	{
		if(dicearray[sides] != 'undefined' && dicearray[sides] != null)
		{
			dicetext += (dicearray[sides] == 1) ? "" : dicearray[sides];
			dicetext += 'D'+sides+',';
		}	
	}	
	dicetext = dicetext.replace(/,\s*$/,"");
	return dicetext;

}




