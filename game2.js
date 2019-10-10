;(function(){
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }
    
    function Game(boxCount) {
        var GAME_WIDTH = 500;
        var GAME_HEIGHT = 500;
        var GAME_ANIMATION_FRAME = 24;
        this.boxes = [];
        this.boxCount = boxCount;
        this.parentElem = document.createElement('div');
        document.body.appendChild(this.parentElem);
        this.parentElem.classList.add('app-container');
        
        
        this.moveBoxes = function() {
          for(var i=0; i< this.boxCount; i++) {
            this.boxes[i].move();
            this.boxes[i].checkCollision(this.boxes);
            
          }
        }
        
        this.init = function() {
          this.createBoxes();
          setInterval(this.moveBoxes.bind(this), GAME_ANIMATION_FRAME);
          return this;
     
        }
        
        this.createBoxes = function(){
          for(var i =0; i < this.boxCount; i++) {
            var angle = getRandomInt(0,360);
            var box = new Box(this.parentElem, angle);
            var randomX = getRandomInt(0, GAME_WIDTH);
            var randomY = getRandomInt(0, GAME_HEIGHT);
            box.setPosition(randomX, randomY);
            box.draw();
            this.boxes.push(box);
          }
        }
  
      }
    

    function Box(parentElem, angle) {
      var boxWidth = 10;
      var boxHeight = 10;

      this.parentElem = parentElem;
      this.angle = angle;
      this.element = null;
      this.x = null;
      this.y = null;
      this.dx;
      this.dy;
      
      
      this.init = function() {
        this.element = document.createElement('div');
        this.element.classList.add('box');
        this.parentElem.appendChild(this.element);
      }
      
      this.checkCollision = checkCollision.bind(this);
      function checkCollision(boxes){
        // checkCollision

        for(var i=0; i< boxes.length; i++) {
            if(this !== boxes[i]){

                if(this.x + boxWidth >= boxes[i].x && this.x <= boxes[i].x + boxWidth && this.y + boxHeight >= boxes[i].y && this.y <= boxes[i].y + boxHeight){
                
                  this.x += 30;
                  this.y += 30;
                  boxes[i].x -= 30;
                  boxes[i].y -= 30;

                }
            }
        }
       
    }
      
      this.init();
      
      this.setPosition = function(x, y) {
        this.x = x;
        this.y = y;
      }
      
      this.move = move.bind(this);
      
      function move() {
          this.dx = 1 * Math.cos(this.angle);
          this.dy = 1 * Math.sin(this.angle);
         if(this.x<=480 && this.y<=480 && this.x>=0 && this.y>=0){ 
        this.x += this.dx;
        this.y += this.dy; 
    }else{
        this.x =  getRandomInt(0, 480);;
        this.y =  getRandomInt(0, 480);; 
        }
         
    
        this.draw();
      }
      
      this.draw = function() {
        this.element.style.top = this.x + 'px';
        this.element.style.left = this.y + 'px';
      }
    }
    
   
    new Game(20).init();
    new Game(25).init();

  })();
  