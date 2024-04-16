class Start extends Scene {
    create() {

        // access a string
        //console.log(this.engine.storyData.Credits) // returns the credits 
        //console.log(this.engine.storyData);

        // variable keys
        //const key = "Beyond";
        //console.log(this.engine.storyData.Locations[key].Body); // quote inside the location "Beyond"

        // access array
        //console.log(this.engine.storyData.Locations.Kresge.Choices[0])

        /*
        console.log(this.engine.storyData.Locations)
        if ('Mechanism' in this.engine.storyData.Locations.Conservatory) {
            console.log("YEP");
        }
        */

        this.engine.setTitle(this.engine.storyData.Title); // TODO: replace this text using this.engine.storyData to find the story title
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        //console.log(this.engine.storyData)
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); // TODO: replace this text by the initial location of the story
    }
}

var blocked_link_conv = true;
var blocked_link_study = true;

class Location extends Scene {
    create(key) {
        //console.log("Location");
        //console.log(this.engine.storyData.Locations[key])
        let locationData = this.engine.storyData.Locations[key]; // TODO: use `key` to get the data object for the current story location
        this.engine.show(locationData.Body); // TODO: replace this text by the Body of the location data
        
        if('ConservatoryMechanism' in locationData) {
            if('BlockedConv' in locationData) {
                if (blocked_link_conv === false) {
                    this.engine.gotoScene(Conservatory);
                }
            }
        }

        if('StudyMechanism' in locationData) {
            if('BlockedStudy' in locationData) {
                if (blocked_link_study === false) {
                    this.engine.gotoScene(Study2);
                }
                else {
                    this.engine.gotoScene(Study);
                }
            }
        }

        if('LibraryMechanism' in locationData) {
            this.engine.gotoScene(Library);
        }

        if('BedroomMechanism' in locationData) {
            this.engine.gotoScene(Bedroom);
        }

        if('Choices' in locationData) { // TODO: check if the location has any Choices
            for(let choice of locationData.Choices) { // TODO: loop over the location's Choices
                this.engine.addChoice(choice.Text, choice); // TODO: use the Text of the choice
                // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
            }
        } else {
            this.engine.addChoice("The end.")
        }
    }

    handleChoice(choice) {
        if(choice) {
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, choice.Target);
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class Conservatory extends Location {
    create() {
        this.engine.addChoice("Observe the area.", { action: "look_around" });
    }

    handleChoice(choice) {
        if (choice.action === "look_around") {
            this.engine.show("You spot an odd marking on the ground where a plant pot used to be.");
            this.engine.addChoice("Put a pot back into the spot.", { action: "place_plant" });
            this.engine.addChoice("Look around some more.", {action: "look"});
        } else if (choice.action === "look") {
            this.engine.gotoScene(Location, "Conservatory");
        } else if (choice.action === "place_plant") {
            this.engine.show("The ground begins to shift as the pot sinks into the ground.<br>It was a button, revealing a hidden passage.<br>You take it, ending up in...");
            this.engine.gotoScene(Location, "Attic");
        } else if(choice) {
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, choice.Target);
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class Library extends Location {
    create() {
        this.engine.addChoice("Check out some of the books.", { action: "check_books" });
    }

    handleChoice(choice) {
        if (choice.action === "check_books") {
            this.engine.show("Theres a page torn of the book you picked up. Interesting...");
            this.engine.addChoice("Look for the missing page.", { action: "page" });
            this.engine.addChoice("Waste of time. Keep adventuring.", {action: "waste"});
        } else if (choice.action === "page") {
            blocked_link_conv = false;
            this.engine.show("On the floor you notice a corner of a page peeking from the bottom of the bookshelf.<br>You pick it up:<br><br>April 15, 1885<br><br>Oh, how the halls of this old mansion whisper secrets of days long past! In the flickering<br>candlelight, I have uncovered yet another hidden passage within these ancient walls. It seems the<br>house itself is alive with its own secrets, guiding me through its labyrinthine corridors.<br><br>Tonight, as I wandered through the dimly lit halls, tracing my fingers along the ornate woodwork, I <br>stumbled upon a concealed door, nearly obscured by ivy tendrils that had crept through the<br>cracks. With trembling hands, I pushed it open, revealing a narrow passage leading to a forgotten<br>chamber.<br><br>Within, I discovered treasures long forgotten by time - dusty tomes filled with arcane knowledge,<br>and relics of a bygone era. But it is not merely material riches that lie hidden within these walls;<br>there are secrets, whispered by the very stones themselves.<br><br>Amongst the cobwebs and shadows, I caught a fleeting scent of roses, their delicate fragrance<br>mingling with the musty air. It is a clue, a hint of something more, waiting to be uncovered.<br><br>As I sit here, penning these words by candlelight, I cannot help but wonder what other mysteries<br>lie waiting to be discovered within this ancient mansion. And so, with a sense of anticipation and<br>trepidation, I shall continue my exploration, guided by the whispers of the past.");
            this.engine.gotoScene(Location, "Library");
        } else if (choice.action === "waste") {
            this.engine.gotoScene(Location, "Library");
        } else if(choice) {
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, choice.Target);
        } else {
            this.engine.gotoScene(End);
        }
    }
} 

class Bedroom extends Location {
    create() {
        this.engine.addChoice("Check out the toys.", { action: "check_toys" });
    }

    handleChoice(choice) {
        if (choice.action === "check_toys") {
            this.engine.show("Toy #1: Porcelain Doll<br>Toy #2: Stuffed Dog<br>Toy #3: Tea Party Set");
            this.engine.addChoice("Toy #1", { action: "toy_one" });
            this.engine.addChoice("Toy #2", {action: "toy_two"});
            this.engine.addChoice("Toy #3", {action: "toy_three"});
        } else if (choice.action === "toy_one") {
            this.engine.show("Dolls are always creepy. Especially this one.");
            this.engine.gotoScene(Location, "Bedroom");
        } else if (choice.action === "toy_two") {
            this.engine.show("This dog looks familiar.");
            this.engine.addChoice("Look at the collar.", {action: "collar"});
        } else if (choice.action === "toy_three") {
            this.engine.show("This looks like actual china.<br>A set like this would be an amazing antique find.");
            this.engine.addChoice("Look at the collar.", {action: "collar"});
        } else if (choice.action === "collar") {
            blocked_link_study = false;
            this.engine.show("Looking closer it just looks like a pretty locket.<br>Maybe its worth something?<br>You should keep it.");
            this.engine.gotoScene(Location, "Bedroom")
        } else if(choice) {
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, choice.Target);
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class Study extends Location {
    create() {
        this.engine.addChoice("Check out the paintings.", { action: "check_paintings" });
    }

    handleChoice(choice) {
        if (choice.action === "check_paintings") {
            this.engine.show("Painting #1: Portait of a young girl carrying a dog.<br>Painting #2: A Mansion stood against a misty backdrop.<br>Painting #3: Blue flower vase, red roses.");
            this.engine.addChoice("Painting #1", { action: "one" });
            this.engine.addChoice("Painting #2", {action: "two"});
            this.engine.addChoice("Painting #3", {action: "three"});
        } else if (choice.action === "one") {
            this.engine.show("<br>You suspect this was probably the daughter of the previous owners of the house.<br>The picture is worn...this house must be old.<br>The walls are scratched up next to it.");
            this.engine.gotoScene(Location, "Study");
        } else if (choice.action === "two") {
            this.engine.show("You think this must be the house you are currently in.<br>The eeriness of the art doesn't make you feel any better.");
            this.engine.gotoScene(Location, "Study");
        } else if (choice.action === "three") {
            this.engine.show("Pretty. Someone here must like gardening.");
            this.engine.gotoScene(Location, "Study");
        } else if(choice) {
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, choice.Target);
        } else {
            this.engine.gotoScene(End);
        }
    }
} 

class Study2 extends Location {
    create() {
        this.engine.addChoice("Check out the paintings.", { action: "check_paintings" });
    }

    handleChoice(choice) {
        if (choice.action === "check_paintings") {
            this.engine.show("Painting #1: Portait of a young girl carrying a dog.<br>Painting #2: A Mansion stood against a misty backdrop.<br>Painting #3: Blue flower vase, red roses.");
            this.engine.addChoice("Painting #1", { action: "one" });
            this.engine.addChoice("Painting #2", {action: "two"});
            this.engine.addChoice("Painting #3", {action: "three"});
        } else if (choice.action === "one") {
            this.engine.show("You suspect this was probably the daughter of the previous owners of the house.<br>The picture is worn...this house must be old.<br>The walls are scratched up next to it.");
            this.engine.addChoice("Move the painting.", {action: "move"});
        } else if (choice.action === "two") {
            this.engine.show("You think this must be the house you are currently in.<br>The eeriness of the art doesn't make you feel any better.");
            this.engine.gotoScene(Location, "Study");
        } else if (choice.action === "three") {
            this.engine.show("Pretty. Someone here must like gardening.");
            this.engine.gotoScene(Location, "Study");
        } else if (choice.action === "move") {
            this.engine.show("What's this? It looks like something should fit into the hole.<br>Maybe a key?");
            this.engine.addChoice("Use the locket.", {action: "locket"});
        } else if (choice.action === "locket") {
            this.engine.show("<br>A door in the wall is revealed.");
            this.engine.addChoice("Go in.", {action: "reveal"});
        } else if (choice.action === "reveal") {
            this.engine.gotoScene(Location, "Secret Room");
        } else if(choice) {
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, choice.Target);
        } else {
            this.engine.gotoScene(End);
        }
    }
} 

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');