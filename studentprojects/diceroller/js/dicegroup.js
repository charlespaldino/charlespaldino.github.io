//Creates a new dice group.
function DiceGroup() 
{
	this.dicegroup = new Array();
	this.lastdiceroll = new String();
}

//Adds dice to the dice group.
DiceGroup.prototype.addDice = function(die)
{
	this.dicegroup.push(die);
}

//Clears the dice from the dice group.
DiceGroup.prototype.clearDice = function(die)
{
	this.dicegroup = new Array();
}	
	
//Rolls all the dice in the dice group and returns the results.
DiceGroup.prototype.rollDice = function()
{
	this.lastdiceroll = "";
	var results = 0;
	for(var i=0; i<this.dicegroup.length; i++)
	{
		var diceroll = this.dicegroup[i].roll();
		results = results + diceroll;
		this.lastdiceroll += diceroll + ' + ' ;	

	}	
	

	//needs special case for single die roll
	//if size == 1 just append results

	this.lastdiceroll = this.lastdiceroll.substring(0, this.lastdiceroll.length - 2);
	this.lastdiceroll += '= ' + results;
	return results;

}
