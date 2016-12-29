//Creates a new dice group.
function DiceGroup() 
{
	this.dicegroup = new Array();
}

//Adds dice to the dice group.
DiceGroup.prototype.addDice = function(die)
{
	this.dicegroup.push(die);
}

//Rolls all the dice in the dice group and returns the results.
DiceGroup.prototype.rollDice = function()
{
	var results = 0;
	for(var i=0; i<this.dicegroup.length; i++)
	{
		results = results + this.dicegroup[i].roll();
	}
	return results;
}
