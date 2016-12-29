var image_prepend = "'<img class='image_dice_small' src='..\\diceroller\\images\\";
var CurrentDiceGroup = new DiceGroup();

//Adds dice to the CurrentDiceGroup.
function addDice(die)
{
	var prependtext = image_prepend + "SiteD"+die+".png'></img>";
	
	$('#dicecontainer').prepend(prependtext);
	$('#dicetextfield').val($('#dicetextfield').val() + "D" + die + ", ");
	
	CurrentDiceGroup.addDice(new Die(die));	
}

//Rolls all dice within CurrentDiceGroup and updates the history.
function rollDice()
{
	var rollgroup = CurrentDiceGroup.rollDice();

	updateHistory(rollgroup);
}

//Adds the given text to history.
function updateHistory(text) 
{
	$('#historytextarea').val($('#historytextarea').val() + text +"\n");
	$('#historytextarea').scrollTop($('#historytextarea')[0].scrollHeight);
}





