/** Ends the game if the weapon limit is reached.*/
function gameOverWhenMaxWeaponsNow(world) {
    if (world.GunShootL.length >= 5 && world.ThrowableObjectsL.length >= 5 && !world.gameEnd) {
        world.gameEnd = true;
        world.soundManager.stopMusic();
        world.soundManager.stopEndbossMusic();
        if (!world.isMuted()) { world.soundManager.play('gameOverSound'); }
    }
}

/** Checks if the character has died and triggers game over state. */
function checkGameEndAfterCharacterDeadNow(world) {
    if (world.character.gameEnd) {
        world.gameEnd = true;
        world.stopBackgroundMusic();
        if (!world.isMuted()) { world.soundManager.play('gameOverSound'); }
    }
}

/** Handles game win logic and plays win sound once. */
function checkGameWINNow(world) {
    if (world.gameWIN && !world.gameWinSoundPlayed) {
        world.gameWinSoundPlayed = true;
        world.stopBackgroundMusic();
        if (!world.isMuted()) { world.soundManager.play('winSound'); }
    }
}

/** Updates win UI for stars and crystals. */
function checkGameWinHaveStarOreCrystalNow(world) {
    world.gameWinShowStar.check(world.gameWIN, world.character.haveStar);
    world.gameWinShowCrystal.checkNow(world.gameWIN, world.character.haveCrystal);
}


/** Opens chests after endboss death. */
function afterEndbossDeadOpenChestToCollectNow(world) {
    world.deadEndboss = true;
    if (world.level && world.level.endboss) {
        world.level.endboss.forEach(endboss => {
            endboss.World = world;
            if (endboss.stop) endboss.stop();
        });
    }

    world.level.chest.forEach(chest => {
        chest.World = world;
        if (!chest.chestAnimationStarted) {
            chest.chestAnimationStarted = true;
            world.soundManager.play('chestSound');
            chest.animate();
        }
    });
}