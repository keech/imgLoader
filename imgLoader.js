function imgLoader(){
	var maxConCnt = 6;
	var currentConCnt = 0;
	var loadedCnt = 0;
	var totalCnt = 0;
	var queue = [];
	var self = this;

	this.onComplete = function(){};
	this.onFileLoad = function(){};
	this.load = function(){
		queue.forEach(function(path){
			if(currentConCnt < maxConCnt){
				currentConCnt++;
				var img = $('<img>').attr('src', path);
				img.on('load', function(){
					currentConCnt--;
					self.onFileLoad();
					self.load();
					loadedCnt++;
					if(loadedCnt == totalCnt){
						self.onComplete();
					}
				});
				console.log(path);
				queue.shift();
			}
		});
	};
	this.addPath = function(path, isPrior){
		if(isPrior){
			queue.unshift(path);
		}else{
			queue.push(path);
		}
		totalCnt++;
		self.load();
	};

};
