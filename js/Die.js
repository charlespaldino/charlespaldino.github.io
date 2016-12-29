function Die (sides) {
    this.sides = sides;
}
 


Die.prototype.roll = function(){
	return Math.floor((Math.random()*this.sides)+1);
};


