import Game = require("./game");
import Keyboard = require("./keyboard");

function bootstrap(){
    Game.init().then(()=>{
        Game.render();
        $(window).keydown((e)=>{
            Keyboard.onKeyPress(e.keyCode, true);
        }).keyup((e)=>{
            Keyboard.onKeyPress(e.keyCode, false);
        });
    });
}

const ns : any = window;
ns.bootstrap = bootstrap;
