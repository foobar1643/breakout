define(function() {
    var Settings = function() {
        return;
    }

    // Tells game render to draw hashmap that is used for spatial hashing. true/false.
    Settings.DRAW_HASHMAP = false;

    // Maximum frames per second. Affects game loop and screen updates. Currently does nothing (i think).
    Settings.MAX_FPS = 60;

    // Game field width and height in pixels. Used when creating a canvas element, will be more complex in the future.
    Settings.SCREEN_WIDTH = 800;
    Settings.SCREEN_HEIGHT = 600;

    return Settings;
});
