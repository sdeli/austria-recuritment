let singleton = (function(){

	let instanceOfObj;

	// initalizing the motor behind the user interface
	function init(){
		// object creation here
		return {
			single : "this is the only and the same object which will be created and returned",
			uniqeNumber : Math.random()
		};	
	}

	return {
		getObject : function(){
			// lazy loading the object
			if(!instanceOfObj){
				instanceOfObj = init();
				return instanceOfObj
			} else return instanceOfObj;
		}
	}
	
}());

module.exports = singleton;