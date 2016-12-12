import Promise = require("bluebird");
class AssetCache{
    jsonLoader = new THREE.JSONLoader();
    textureLoader = new THREE.TextureLoader();

    assets : any = {};
    floorTextures = new Array<THREE.Texture>();
    wallTextures = new Array<THREE.Texture>();

    constructor(){

    }

    getRandomFloorTexture() : THREE.Texture{
        return this.floorTextures[Math.round(Math.random() * (this.floorTextures.length - 1))]
    }

    getRandomWallTexture() : THREE.Texture{
        return this.wallTextures[Math.round(Math.random() * (this.wallTextures.length - 1))]
    }

    private loadTexture(id: string, filename: string) : Promise<any>{
        return new Promise((resolve, reject)=>{
            this.textureLoader.load(filename, (texture : THREE.Texture)=>{
                this.assets[id] = texture;
                resolve();
            });
        });
    }

    loadAudio(id, filename) : Promise<any>{        
        let audio = this.assets[id] = new Audio();
        return new Promise((resolve, reject)=>{
            audio.oncanplaythrough = (e)=>{
                audio.oncanplaythrough = null;
                resolve();
            };
            
            audio.onerror = (e)=>{
                reject();
            };                        
            
            audio.src = filename;
        });
    }

    play(id){
        let snd = this.assets[id];
        if (!snd){
            return;
        }
        snd.play();
    }    
    
    loadAll(){
        return Promise.all([
        this.loadAudio("pickup", "content/pickup.mp3"),
        this.loadAudio("switch", "content/switch.mp3"),
        this.loadAudio("stuck", "content/stuck.mp3"),
        this.loadTexture("baldric", "content/baldricfrontwalksheet.png"),
        this.loadTexture("gem", "content/gem.png"),
            this.loadTexture("wall", "content/wall.png").then(()=>{
                for (let i = 0; i < 1; i++){
                    const texture = this.get("wall").clone();
                    texture.needsUpdate = true;
                    texture.wrapS = THREE.RepeatWrapping; 
                    texture.wrapT = THREE.MirroredRepeatWrapping; 
                    texture.repeat.set(1 / 1, 1);
                    texture.offset.x = i / 1;
                    this.wallTextures.push(texture);
                }

            }),
            this.loadTexture("ceiling", "content/ceiling.png"),
            this.loadTexture("floor", "content/floor.png").then(()=>{
                for (let i = 0; i < 1; i++){
                    const texture = this.get("floor").clone();
                    texture.needsUpdate = true;
                    texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping; 
                    texture.repeat.set(1 / 1, 1 / 1);
                    texture.offset.x = i / 1;
                    texture.offset.y = 0;                    
                    this.floorTextures.push(texture);
                }

            })]);
    }

     get(id : string) : any{
        return this.assets[id];
    }

}

export = AssetCache;