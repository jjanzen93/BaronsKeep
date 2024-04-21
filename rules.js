class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title); // TODO: replace this text using this.engine.storyData to find the story title
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); // TODO: replace this text by the initial location of the story
    }
}

class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData.Locations[key]; // TODO: use `key` to get the data object for the current story location
        let conditionData = this.engine;
        this.engine.show(locationData.Body); // TODO: replace this text by the Body of the location data
        
        if(Object.hasOwn(locationData, "ConditionalBody")) {
            for (let body in locationData.ConditionalBody) {
                if (locationData.ConditionalBody[body].Prereq == "HAS_KEY") {
                    if (conditionData.hasKey) {
                        this.engine.show(locationData.ConditionalBody[body].Text);
                    }
                } else if (locationData.ConditionalBody[body].Prereq == "TOGGLED_SWITCH") {
                    if (conditionData.toggledSwitch) {
                        this.engine.show(locationData.ConditionalBody[body].Text);
                    }
                } else if (locationData.ConditionalBody[body].Prereq == "UNTOGGLED_SWITCH") {
                    if (conditionData.toggledSwitch == false) {
                        this.engine.show(locationData.ConditionalBody[body].Text);
                    }
                } else if (locationData.ConditionalBody[body].Prereq == "NO_HAS_KEY") {
                    if (conditionData.hasKey == false) {
                        this.engine.show(locationData.ConditionalBody[body].Text);
                    }
                }
            }
        }

        if (Object.hasOwn(locationData, "Effect")) {
            if (locationData.Effect == "GAIN_KEY") {
                conditionData.hasKey = true;
            } else if (locationData.Effect == "TOGGLE_SWITCH") {
                conditionData.toggledSwitch = true;
            }
        }

        if(Object.hasOwn(locationData, "Choices")) { // TODO: check if the location has any Choices
            for(let choice in locationData.Choices) { // TODO: loop over the location's Choices
                this.engine.addChoice(locationData.Choices[choice].Text, locationData.Choices[choice]); // TODO: use the Text of the choice
                // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
            }
        } else {
            this.engine.addChoice("The end.");
        }

        if (Object.hasOwn(locationData, "Conditionals")) {
            for (let conditional in locationData.Conditionals) {
                if (locationData.Conditionals[conditional].Prereq == "HAS_KEY") {
                    if (conditionData.hasKey) {
                        this.engine.addChoice(locationData.Conditionals[conditional].Text, locationData.Conditionals[conditional]);
                    }
                } else if (locationData.Conditionals[conditional].Prereq == "TOGGLED_SWITCH") {
                    if (conditionData.toggledSwitch) {
                        this.engine.addChoice(locationData.Conditionals[conditional].Text, locationData.Conditionals[conditional]);
                    }
                } else if (locationData.Conditionals[conditional].Prereq == "UNTOGGLED_SWITCH") {
                    if (conditionData.toggledSwitch == false) {
                        this.engine.addChoice(locationData.Conditionals[conditional].Text, locationData.Conditionals[conditional]);
                    }
                } else if (locationData.Conditionals[conditional].Prereq == "NO_HAS_KEY") {
                    if (conditionData.hasKey == false) {
                        this.engine.addChoice(locationData.Conditionals[conditional].Text, locationData.Conditionals[conditional]);
                    }
                }
            }
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

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');