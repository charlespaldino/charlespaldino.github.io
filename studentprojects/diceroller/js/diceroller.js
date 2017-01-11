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
	

	getDiceText();
}

function getDiceText()
{
	//need 2d array  [dicename][count]
	var DiceArray = new Array();

	for(var i = 0; i < CurrentDiceGroup.dicegroup.length; i++)
	{		
		var s = CurrentDiceGroup.dicegroup[i].sides;		
	}


//array[[sides,count]]

//array[0,0]

//if sides = 10
//push [10, count++]  //need to get the count




	//var items = [
  //[1, 2],
//  [3, 4],
  //[5, 6]
//];
//console.log(items[0][0]); // 1
//console.log(items);

}




