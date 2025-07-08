# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development Server
```bash
npm run start
# or
node_modules/.bin/http-server
```
This starts a local HTTP server to serve the HTML game files.

### Testing
```bash
npm test
```
Runs QUnit tests. Tests are located in the `test/` directory, with shooting game tests in `test/shooting/` and tennis game tests in `test/tennis_tests/`.

### Running Individual Tests
To run a specific test module, open the corresponding test HTML file in a browser:
- `test/tennis_tests/game_test.html` - Tennis game tests
- `test/tennis_tests/hi_score_test.html` - High score tests
- `test/tennis_tests/renderer_test.html` - Renderer tests

## Architecture

### Game Structure
The codebase contains multiple simple games implemented in vanilla JavaScript with HTML5 Canvas:

1. **Shooting Game** (`shooting/`) - A space shooter with enemies, bullets, and explosions
2. **Tennis Game** (`tennis/`) - A Pong-like game with ball physics and collision detection
3. **Ball Practice** (`ball/`, `canvas-practice/`) - Basic ball movement and canvas experiments

### Core Architecture Pattern
Each game follows a consistent MVC-like pattern:

- **Game Logic** (`game.js`) - Core game state, physics, and rules
- **Game Entry** (`game_entry.js`) - Initialization, game loop, and event handling
- **Renderer** (`renderer.js`) - Canvas drawing and visual presentation
- **Entity Classes** - Individual game objects (MyShip, Enemy, MyBullet, etc.)

### Key Components

#### Game Loop Structure
All games use `requestAnimationFrame` for smooth animation:
```javascript
function gameLoop(game, renderer) {
    game.update(deltaTime);
    renderer.render(game.getState());
    requestAnimationFrame(step);
}
```

#### Entity System
- **Status-based entities** - Objects have status enums (ACTIVE, EXPLODING, REMOVED)
- **Position tracking** - Entities use `cx`/`cy` for center coordinates
- **Collision detection** - `isCollidingWith()` method for entity interactions

#### Renderer Pattern
- **Separate renderers** - Each entity type has its own renderer class
- **State-based rendering** - Renderers receive state objects, not direct entity references
- **Screen management** - Title screen, game over screen, and main game rendering

### File Organization
- `assets/` - Game sprites (PNG images)
- `*_status.js` - Enum-like status constants
- `*_renderer.js` - Rendering logic for specific entity types
- `collision_detector.js` - Collision detection utilities
- `hi_score.js` - High score persistence (Firebase integration)

### Firebase Integration
- Used for high score persistence in tennis game
- Configuration in `firebase_config.js`
- Hosted at `https://my-web-game-f7504.web.app/`

### Testing Philosophy
- **QUnit framework** - All tests use QUnit
- **Comprehensive coverage** - Tests cover game logic, collision detection, state management
- **Entity testing** - Individual entity behavior is thoroughly tested
- **Game state testing** - Core game mechanics and state transitions are tested

## Development Notes

### Module System
- Uses ES6 modules (`import`/`export`)
- Set to `"type": "module"` in package.json

### Asset Loading
- Images are loaded asynchronously in renderers
- Game initialization waits for asset loading completion

### Game State Management
- Games expose `getState()` method for renderer access
- State objects contain only necessary data for rendering
- Game logic and rendering are cleanly separated

### Input Handling
- Arrow keys for movement
- Z key for shooting (in shooting game)
- Event handlers are set up in `game_entry.js`

### Performance Considerations
- Entities are filtered/removed when inactive or off-screen
- Collision detection breaks early on first hit
- Delta time is used for frame-rate independent movement (shooting game)