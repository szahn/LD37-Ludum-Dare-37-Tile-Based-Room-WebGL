import Scene = require("./gameScene");
import Camera = require("./gameCamera");
import Renderer = require("./gameRenderer");
import Character = require("./objects/character");
import Level = require("./level");
import Assets = require("./assetCache");

class World {
    static assets = new Assets();
    static scene = new Scene();
    static camera = new Camera();
    static renderer = new Renderer();
    static player : Character;
    static level : Level;
}

export = World;