let povorot_cubird_2 = 0
let mySprite3: Sprite = null
let projectile: Sprite = null
let povorot_cubird = 0
let mySprite2: Sprite = null
let engine_power = 0
let acceleration_fly = 0
let povorot = 0
let room = 0
let enemy_cubird = 0
let tnt = 0
let mini_arena = 0
story.showPlayerChoices("упасть", "сдохнуть", "стать пупсом")
if (story.checkLastAnswer("сдохнуть") == true) {
    game.gameOver(false)
}
if (story.checkLastAnswer("стать пупсом") == true) {
    game.gameOver(true)
}
let enemy_cubird_2 = 0
let speed = 60
mini_arena = 0
tnt = 0
enemy_cubird = 0
info.setLife(10)
room = 1
povorot = 1
tiles.setCurrentTilemap(tilemap`уровень1`)
let mySprite = sprites.create(assets.image`главный герой`, SpriteKind.Player)
mySprite.x = 64
mySprite.y = 64
controller.moveSprite(mySprite, speed, 3)
acceleration_fly = 0
scene.cameraFollowSprite(mySprite)
scene.setBackgroundImage(assets.image`фон гд лока`)
engine_power = 100
namespace SpriteKind {
    export const projectile_enemy = SpriteKind.create()
    export const cubird_enemy_1 = SpriteKind.create()
    export const enemy_cubird_2 = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile1`, function (sprite, location) {
    if (room == 1) {
        room = 2
        tiles.setCurrentTilemap(tilemap`уровень2`)
        mySprite.x = 400
        mySprite2 =sprites.create(assets.image`dawdaw`, SpriteKind.cubird_enemy_1)
        mySprite2.setPosition(25, 91)
        enemy_cubird = 1
        povorot_cubird = 1
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    mySprite,
    assets.animation`d`,
    500,
    false
    )
    povorot = 1
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`debag_block`, function (sprite, location) {
    mySprite.y = SpriteKind.Player + 1
})
scene.onOverlapTile(SpriteKind.Projectile, assets.tile`d`, function (sprite, location) {
    sprites.destroy(projectile, effects.fountain, 2000)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    mySprite,
    assets.animation`g`,
    500,
    false
    )
    povorot = 0
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (povorot == 1) {
        projectile = sprites.createProjectileFromSprite(assets.image`gf`, mySprite, 30, 30)
    } else {
    tnt = 1
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`g`, function (sprite, location) {
    if (room == 1) {
        room = 3
        tiles.setCurrentTilemap(tilemap`уровень0`)
        mySprite2 = sprites.create(assets.image`dawdaw`, SpriteKind.cubird_enemy_1)
    }
    if (room == 2) {
        tiles.setCurrentTilemap(tilemap`1 комната`)
        mySprite.x = 32
        room = 1
        sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    }
})
sprites.onDestroyed(SpriteKind.Enemy, function (sprite) {
    if (room == 3) {
        mini_arena += 1
        if (mini_arena == 1) {
            mySprite2 = sprites.create(assets.image`dawdaw`, SpriteKind.cubird_enemy_1)
            mySprite3 = sprites.create(assets.image`dawdaw`, SpriteKind.enemy_cubird_2)
        }
    }
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (acceleration_fly == 1) {
        controller.moveSprite(mySprite, 90, engine_power * 2)
        if (povorot == 1) {
            animation.runImageAnimation(
            mySprite,
            assets.animation`fsdf`,
            100,
            true
            )
        } else {
            animation.runImageAnimation(
            mySprite,
            assets.animation`с`,
            100,
            true
            )
        }
    } else {
        if (povorot == 0) {
            animation.runImageAnimation(
            mySprite,
            assets.animation`f`,
            500,
            false
            )
        } else {
            animation.runImageAnimation(
            mySprite,
            assets.animation`dsfsd`,
            500,
            false
            )
            controller.moveSprite(mySprite, 70, 3)
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`шип`, function (sprite, location) {
    info.changeLifeBy(-1)
    mySprite.y += -12
})
sprites.onOverlap(SpriteKind.cubird_enemy_1, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprites.destroy(mySprite2, effects.disintegrate, 10)
})
sprites.onOverlap(SpriteKind.enemy_cubird_2, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprites.destroy(mySprite3, effects.disintegrate, 10)
})
game.onUpdateInterval(1300, function () {
    if (controller.up.isPressed() == true) {
        acceleration_fly = 0
        if (povorot == 0) {
            animation.runImageAnimation(
            mySprite,
            assets.animation`fdsf`,
            500,
            false
            )
            controller.moveSprite(mySprite, 70, 3)
        } else {
            animation.runImageAnimation(
            mySprite,
            assets.animation`sdfsdf`,
            500,
            false
            )
            controller.moveSprite(mySprite, 70, 3)
        }
    }
    if (room == 3) {
        if (mini_arena == 5) {
            speed = 90
            game.gameOver(true)
        }
    }
})
game.onUpdateInterval(2000, function () {
    if (controller.right.isPressed() == true) {
        acceleration_fly = 1
    } else {
        if (controller.left.isPressed() == true) {
            acceleration_fly = 1
        } else {
            acceleration_fly = 0
        }
    }
})
game.onUpdateInterval(100, function () {
    if (enemy_cubird == 1) {
        if (mySprite2.isHittingTile(CollisionDirection.Left) == true) {
            povorot_cubird = 1
            animation.runImageAnimation(
            mySprite2,
            assets.animation`sdfsdfsd`,
            500,
            false
            )
        }
        if (mySprite2.isHittingTile(CollisionDirection.Right) == true) {
            povorot_cubird = 0
            animation.runImageAnimation(
            mySprite2,
            assets.animation`dsfsdfsdf`,
            500,
            false
            )
        }
        if (povorot_cubird == 1) {
            mySprite2.x += 3
        } else {
            mySprite2.x += -3
        }
        mySprite2.y += 3
    }
    if (enemy_cubird_2 == 1) {
        if (mySprite3.isHittingTile(CollisionDirection.Left) == true) {
            povorot_cubird_2 = 1
            animation.runImageAnimation(
            mySprite3,
            assets.animation`dfsdf`,
            500,
            false
            )
        }
        if (mySprite3.isHittingTile(CollisionDirection.Right) == true) {
            povorot_cubird_2 = 0
            animation.runImageAnimation(
            mySprite3,
            assets.animation`ghjghj`,
            500,
            false
            )
        }
        if (povorot_cubird_2 == 1) {
            mySprite3.x += 3
        } else {
            mySprite3.x += -3
        }
        mySprite3.y += 3
    }
    mySprite.y += 2
})
game.onUpdateInterval(300, function () {
    if (enemy_cubird == 1) {
        if (mySprite.overlapsWith(mySprite2)) {
            info.changeLifeBy(-1)
            mySprite.y += -12
        }
    }
})
})