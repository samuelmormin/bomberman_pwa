// start-play.js 
var modal = document.getElementById('myModal');
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// game-set.js
// This class creates and displays the game-set
var Set = function(size, brick_size)
{
    this.size                 = size;
    this.brick_size           = brick_size;
    this.bricks_broken        = 0;
    this.br
    this.players              = [];
    this.bricks_properties    = [];
    this.free_way             = [];
    this.breakable_brick      = [];
    this.is_item              = [];
    
    // This method will create the dom elements (game-set, lines, and bricks) and stock the elements properties in walls_properties
    this.generate_game_set = function()
    {
        // The game-set is the element that contains all the others elements
        var game_set = document.createElement("div");
        game_set.classList.add("game-set");
        document.body.appendChild(game_set);
        
        // This loop will create the lines and the bricks (walls)
        for( let i = 0 ; i < this.size ; i++ )
        {
            this.bricks_properties.push([]);
            
            // Creates a line of the game-set
            var set_line = document.createElement("div");
            set_line.classList.add("set-line");
            var posY = this.brick_size * i;
            
            // Creates the bricks of the line created and .append them to the line
            for( let j = 0 ; j < this.size ; j++ )
            {
                var brick = document.createElement("div");
                brick.classList.add("brick");
                set_line.appendChild(brick);
                var posX = this.brick_size * j;
                
                // Stock the brick properties in the property bricks_properties
                this.bricks_properties[i].push(
                {
                    index_i    : i,
                    index_j    : j,
                    element    : brick,
                    breakable  : null, 
                    posX       : posX,
                    posY       : posY
                });
            }
            
            // Append the line to the game-set
            game_set.appendChild(set_line);
        }
    }
    
    // Builds the unbreakable walls
    this.bricks_values = function()
    {
        for( let i = 0 ; i < this.bricks_properties.length; i++ )
        {
            for( let j = 0 ; j < this.bricks_properties.length; j++ )
            {
                // Displays the borders walls
                if( j == 0 || i == 0 || i == this.size-1 || j == this.size-1 )
                {
                    this.bricks_properties[i][j].breakable = false;
                    this.bricks_properties[i][j].element.classList.remove("brick");
                    this.bricks_properties[i][j].element.classList.add("wall");
                }
                // Displays the walls in the middle of the game-set
                else if( i % 2 == 0 && j % 2 == 0 )
                {
                this.bricks_properties[i][j].breakable = false;
                this.bricks_properties[i][j].element.classList.remove("brick");
                this.bricks_properties[i][j].element.classList.add("wall");
                }
            }
        }
                console.log(this.bricks_properties);

    }
    
    // Lists and sets the not walls bricks
    this.get_free_ways = function()
    {
        for ( let i = 0 ; i < this.bricks_properties.length ; i++ )
        {
            for ( let j = 0 ; j < this.bricks_properties[i].length ; j++ )
            {
                if ( this.bricks_properties[i][j].breakable == null )
                {
                    this.free_way.push(this.bricks_properties[i][j]);
                }
            }
        }
        console.log(this.free_way);
    }
    
    // Builds the bricks to explode
    this.set_bricks_to_remove = function()
    {
        this.breakable_brick = this.free_way.slice(3, this.free_way.length-3);
        //console.log(this.breakable_brick);
        for( let i = 0 ; i < this.breakable_brick.length ; i++)
        {
            this.breakable_brick[i].breakable = true; 
            this.breakable_brick[i].element.classList.add("breakable"); 
            this.breakable_brick
        }
        console.log(this.breakable_brick.length);
    }
    
    // Apply the methods after instanciation
    this.init = function()
    {
        this.generate_game_set();
        this.bricks_values();
        this.get_free_ways();
        this.set_bricks_to_remove();
    }
    
}

var displayed_set = new Set(15, 30);
displayed_set.init();