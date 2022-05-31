

var game = function(){
    let time = 50;
    let movement = 20;
    let movementBar = 35;
    let width = document.documentElement.clientWidth - movement;
    let height = document.documentElement.clientHeight - movement;
    let controlGame;
    let player1;
    let player2;

    function start(){
        init();
        controlGame = setInterval(play, time);
    }

    function init(){
        pelota.style.left = 0;
        pelota.state = 1;
        pelota.direction = 1; // right 1, left 2
        player1 = new Object();
        player2 = new Object();
        player1.keyPress = false;
        player1.keyCode = null;
        player2.keyPress = false;
        player2.keyCode = null;
    }

    function stop(){
        clearInterval(controlGame);
        document.body.style.background = "#f00";
    }

    function play(){
        moveBall();
        moveBar();
        checkIfLost();
    }

    function checkIfLost(){
        if(pelota.offsetLeft >= width){
            stop();
            alert("punto player 1");
            /* console.log("punto player 1"); */
        }
        if(pelota.offsetLeft <= 0){
            stop();
            /* console.log("punto player 2"); */
            alert("punto player 2");
        }
    }

    function moveBall(){
        checkStateBall();
        switch(pelota.state){
            case 1: // derecha, abajo
                pelota.style.left = (pelota.offsetLeft + movement) +"px";
                pelota.style.top = (pelota.offsetTop + movement) +"px";
                break;
            case 2: // derecha, arriba
                pelota.style.left = (pelota.offsetLeft + movement) +"px";
                pelota.style.top = (pelota.offsetTop - movement) +"px";
                break;
            case 3: // izquierda, abajo
                pelota.style.left = (pelota.offsetLeft - movement) +"px";
                pelota.style.top = (pelota.offsetTop + movement) +"px";
                break;
            case 4: // izquierda, arriba
                pelota.style.left = (pelota.offsetLeft - movement) +"px";
                pelota.style.top = (pelota.offsetTop - movement) +"px";
                break;
        }
    }

    function checkStateBall(){

        if(collidePlayer2()){
            pelota.direction = 2;
            if(pelota.state == 1) pelota.state = 3;
            if(pelota.state == 2) pelota.state = 4;
        }else if(collidePlayer1()){
            pelota.direction = 1;
            if(pelota.state == 3) pelota.state = 1;
            if(pelota.state == 4) pelota.state = 2;
        }

        if(pelota.direction ===1){
            if(pelota.offsetTop >= height) pelota.state=2;
            else if(pelota.offsetTop <=0 ) pelota.state=1;
        }else{
            if(pelota.offsetTop >= height) pelota.state=4;
            else if(pelota.offsetTop <=0 ) pelota.state=3;
        }
    }

    function collidePlayer1(){
        if(pelota.offsetLeft <= (bar1.clientWidth) &&
           pelota.offsetTop >= bar1.offsetTop &&
           pelota.offsetTop <= (bar1.offsetTop + bar1.clientHeight)){
            return true;
        }

        return false;
    }
    function collidePlayer2(){
        if(pelota.offsetLeft >= (width-bar2.clientWidth) &&
           pelota.offsetTop >= bar2.offsetTop &&
           pelota.offsetTop <= (bar2.offsetTop + bar2.clientHeight)){
            return true;
        }
        return false;

    }

    function moveBar(){
        if(player1.keyPress){
            if(player1.keyCode == 81 && bar1.offsetTop >=0)
                bar1.style.top = (bar1.offsetTop - movementBar) + "px";
            if(player1.keyCode == 65 && (bar1.offsetTop + bar1.clientHeight)<=height)
                bar1.style.top = (bar1.offsetTop + movementBar) + "px";
            
        }
        if(player2.keyPress){
            if(player2.keyCode == 79 && bar2.offsetTop>=0)
                bar2.style.top = (bar2.offsetTop - movementBar) +"px";
            if(player2.keyCode == 76 && (bar2.offsetTop + bar2.clientHeight)<=height)
                bar2.style.top = (bar2.offsetTop + movementBar) +"px";
        }
    }

    document.onkeydown = function(e){
        e = e || window.event;
        switch(e.keyCode){
            case 81: // Q
            case 65: // A
                player1.keyCode = e.keyCode;
                player1.keyPress = true;
            break;
            case 79: // O
            case 76: // L
                player2.keyCode = e.keyCode;
                player2.keyPress = true;
            break;
        }
    }

    document.onkeyup = function(e){
        if(e.keyCode == 81 || e.keyCode == 65)
            player1.keyPress = false;
        if(e.keyCode == 79 || e.keyCode == 76)
            player2.keyPress = false;
    }

    start();
}();