class Player extends Component {
    constructor(ctx, width, height, color, x, y, health, vx, vy, speed, imageSrc) {
        super(ctx, width, height, color, x, y);
        // this.width = width;
        // this.height = height;
        this.score = 0
        this.speed = speed;
        this.direction = null;
        this.spells = [];
        this.opponent = null;
        this.health = health;
        this.vx = vx;
        this.vy = vy;
        this.character = new Image();
        this.character.src = imageSrc;
        this.frameIndex = 0;
        this.frameIndexY = 0;
        this.tickCount = 0;
        this.ticksPerFrame = 5;
        this.paralyze = false;
        this.imperio = false;
        this.expelliarmus = false;
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;
    }

    
    
    update() {
        if(this.paralyze) return;
        if(this.imperio) {
            (this.x < this.ctx.canvas.width/2)? this.x++ : this.x--;
            (this.y < this.ctx.canvas.height/2)? this.y++ : this.y--;
        }
        if (this.up && this.right){
            this.y -= this.speed;
            this.x += this.speed;
            this.frameIndexY = 64;
            super.tickFrame();
        } else if (this.down && this.right){
            this.y += this.speed;
            this.x += this.speed;
            this.frameIndexY = 64;
            super.tickFrame();
        } else if(this.up && this.left){
            this.x -= this.speed;
            this.y -= this.speed;
            this.frameIndexY = 32;
            super.tickFrame();
        } else if(this.down && this.left) {
            this.y += this.speed;
            this.x -= this.speed;
            this.frameIndexY = 32;
            super.tickFrame();
        }else if (this.up){
            this.y -= this.speed;
            this.frameIndexY = 96;
            super.tickFrame();
        } else if (this.down){
            this.y += this.speed;
            this.frameIndexY = 0;
            super.tickFrame();
        } else if(this.left){
            this.x -= this.speed;
            this.frameIndexY = 32;
            super.tickFrame();
        } else if(this.right) {
            this.x += this.speed;
            this.frameIndexY = 64;
            super.tickFrame();
        }
        // switch (this.direction) {
        //     case "N":
        //         this.y -= this.speed;
        //         this.frameIndexY = 96;
        //         super.tickFrame();
        //         break;
        //     case "NE":
        //         this.y -= this.speed;
        //         this.x += this.speed;
        //         this.frameIndexY = 64;
        //         super.tickFrame();
        //         break;
        //     case "E":
        //         this.x += this.speed;
        //         this.frameIndexY = 64;
        //         super.tickFrame();
        //         break;
        //     case "SE":
        //         this.y += this.speed;
        //         this.x += this.speed;
        //         this.frameIndexY = 64;
        //         super.tickFrame();
        //         break;
        //     case "S":
        //         this.y += this.speed;
        //         this.frameIndexY = 0;
        //         super.tickFrame();
        //         break;
        //     case "SW":
        //         this.y += this.speed;
        //         this.x -= this.speed;
        //         this.frameIndexY = 32;
        //         super.tickFrame();
        //         break;
        //     case "W":
        //         this.x -= this.speed;
        //         this.frameIndexY = 32;
        //         super.tickFrame();
        //         break;
        //     case "NW":
        //         this.y -= this.speed;
        //         this.x -= this.speed;
        //         this.frameIndexY = 32;
        //         super.tickFrame();
        //         break;
        // }
        this.x = Math.max(0, this.x);
        this.x = Math.min(this.ctx.canvas.width-this.width, this.x);
        this.y = Math.max(0, this.y);
        this.y = Math.min(this.ctx.canvas.height-this.height, this.y);
        for (let i = this.spells.length-1; i >= 0; i--) {
            this.spells[i].update(this.opponent);
            if (this.spells[i].width === 0 ) {
                this.spells.splice(i,1);
            } 
        }
    }

    draw() {
        this.ctx.drawImage(this.character, this.frameIndex*32, this.frameIndexY, 32, 32, this.x, this.y, 32, 32);
        for (let i = 0; i < this.spells.length; i++) {
            this.spells[i].draw();
        }
    }

    //BEGINNING OF THE CAST SPELL METHOD
    cast(spellName) {
        if(this.expelliarmus) return;
        switch(spellName){
            case "Expelliarmus":
            let Expelliarmus = new Spell(spellName, this.x, this.y, "red", this.direction, this.vx, this.vy, 10, 30, 10, "./Images/orb_spell.png",
            function(el){
                el.health -= 35;
                el.expelliarmus = true;
                setTimeout(function(){el.expelliarmus = false}, 4000);
            });
            if (this.spells.length < 3) this.spells.push(Expelliarmus);
            break;         
            case "Stupefy":
            let Stupefy = new Spell(spellName, this.x, this.y, "yellow", this.direction, this.vx, this.vy, 10, 8, 20, "./Images/orb_spell.png",
            function(el){
                el.health -= 35;
                el.paralyze = true;
                setTimeout(function(){
                    el.paralyze = false;
                }, 2000);
            });
            if (this.spells.length < 3) this.spells.push(Stupefy);
            break;            
            case "Sectum-Sempra":
            let SectumSempra = new Spell(spellName, this.x, this.y, "purple", this.direction, this.vx, this.vy, 8, 20, 20, "./Images/orb_spell.png",
            function(el){
                el.health -= 50;
            });
            if (this.spells.length < 3) this.spells.push(SectumSempra);
            break;            
            case "Avada-kedavra":
            let AvadaKedavra = new Spell(spellName, this.x, this.y, "chartreuse", this.direction, this.vx, this.vy, 3, 4, 4, "./Images/blue_spell.png",
            function(el){
                el.health = -1;
            });
            if (this.spells.length < 3) this.spells.push(AvadaKedavra);
            break;            
            case "Crucio":
            let Crucio = new Spell(spellName, this.x, this.y, "black", this.direction, this.vx, this.vy, 5, 10, 20, "./Images/blue_spell.png",
            function(el){
                el.health -= 50;
                el.paralyze = true;
                setTimeout(function(){
                    el.paralyze = false;
                }, 2000);
            });
            if (this.spells.length < 3) this.spells.push(Crucio);
            break;            
            case "Imperio":
            let Imperio = new Spell(spellName, this.x, this.y, "green", this.direction, this.vx, this.vy, 5, 10, 10, "./Images/blue_spell.png",
            function(el){
                el.health -= 35;
                el.imperio = true;
                setTimeout(function(){el.imperio = false},3000)});
            if (this.spells.length < 3) this.spells.push(Imperio);
            break;            
        }
    }
}