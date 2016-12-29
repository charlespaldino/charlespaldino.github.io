//Creates a die object with the given sides.
function Die (sides) {
    this.sides = sides;
}
 
//Rolls the die object and returns the result.
Die.prototype.roll = function(){
	return Math.floor((Math.random()*this.sides)+1);
};
