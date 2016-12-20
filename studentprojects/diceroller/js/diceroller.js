var image_prepend = "'<img class='image_dice_small' src='..\\diceroller\\images\\";

function addDice(die)
{
	var prependtext = image_prepend + "Site"+die+".png'></img>";
	$('#dicecontainer').prepend(prependtext);
	$('#dicetextfield').val($('#dicetextfield').val() + die + ", ");
	
}

function rollDice()
{
	var diceroll = Math.floor((Math.random()*4)+1);
	updateHistory(diceroll);
}

function updateHistory(text) 
{
	
	$('#historytextarea').val($('#historytextarea').val() + text +"\n");
	$('#historytextarea').scrollTop($('#historytextarea')[0].scrollHeight);
}

//TODO

//1. change dice images to input tags
//2. fix image source link, try escape characters
//3. add switch case for dice