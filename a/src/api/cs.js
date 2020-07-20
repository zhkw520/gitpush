export default class Map{	
	constructor(a,b) {
	    this.a=a?a:[];
		this.b=b?b:[];
	}
	coFn(){
		console.log(this.a.length+':'+this.b.length);
	}	
	coFn2(data){
		this.a =data.a;
		this.b = data.b;
		console.log(this.a.length+':'+this.b.length);
	}
}