
let level1;

function initLevel(){
    level1 = new Levels(
        [
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud()
        ],
        [new MonsterTurtle(),
        new MonsterFly(),
        new MonsterBomb(),
        new MonsterBlue(),
        new MonsterTurtle(),
        new MonsterFly(),
        new MonsterBomb(),
        new MonsterBlue(),
        new MonsterTurtle(),
        new MonsterFly(),
        new MonsterBomb(),
        new MonsterBlue(),
        new MonsterTurtle(),
        new MonsterFly(),
        new MonsterBomb(),
        new MonsterBlue()],
        [new endBossTurtle()],
        [new chest()],
        [
            new BackgroundObject('img/backgrounds/02/layers/l1_sky.png', -1200),
            new BackgroundObject('img/backgrounds/02/layers/l2_mountains.png', -1200),
            new BackgroundObject('img/backgrounds/02/layers/l4_bg-ground01.png', -1200),
            new BackgroundObject('img/backgrounds/02/layers/l5_bg-ground02.png', -1200),
            new BackgroundObject('img/backgrounds/02/layers/l6_ground.png',-1200 ),
    
            new BackgroundObject('img/backgrounds/02/layers/l1_sky.png', 0),
            new BackgroundObject('img/backgrounds/02/layers/l2_mountains.png', 0),
            new BackgroundObject('img/backgrounds/02/layers/l4_bg-ground01.png', 0),
            new BackgroundObject('img/backgrounds/02/layers/l5_bg-ground02.png', 0),
            new BackgroundObject('img/backgrounds/02/layers/l6_ground.png', 0),
    
            new BackgroundObject('img/backgrounds/02/layers/l1_sky.png', 1200),
            new BackgroundObject('img/backgrounds/02/layers/l2_mountains.png', 1200),
            new BackgroundObject('img/backgrounds/02/layers/l4_bg-ground01.png', 1200),
            new BackgroundObject('img/backgrounds/02/layers/l5_bg-ground02.png', 1200),
            new BackgroundObject('img/backgrounds/02/layers/l6_ground.png',1200 ),
    
            new BackgroundObject('img/backgrounds/02/layers/l1_sky.png', 1200 * 2),
            new BackgroundObject('img/backgrounds/02/layers/l2_mountains.png', 1200 * 2),
            new BackgroundObject('img/backgrounds/02/layers/l4_bg-ground01.png', 1200 * 2),
            new BackgroundObject('img/backgrounds/02/layers/l5_bg-ground02.png', 1200 * 2),
            new BackgroundObject('img/backgrounds/02/layers/l6_ground.png', 1200 * 2),
    
            new BackgroundObject('img/backgrounds/02/layers/l1_sky.png', 1200 * 3),
            new BackgroundObject('img/backgrounds/02/layers/l2_mountains.png', 1200 * 3),
            new BackgroundObject('img/backgrounds/02/layers/l4_bg-ground01.png', 1200 * 3),
            new BackgroundObject('img/backgrounds/02/layers/l5_bg-ground02.png', 1200 * 3),
            new BackgroundObject('img/backgrounds/02/layers/l6_ground.png', 1200 * 3),
    
            new BackgroundObject('img/backgrounds/02/layers/l1_sky.png', 1200 * 4),
            new BackgroundObject('img/backgrounds/02/layers/l2_mountains.png', 1200 * 4),
            new BackgroundObject('img/backgrounds/02/layers/l4_bg-ground01.png', 1200 * 4),
            new BackgroundObject('img/backgrounds/02/layers/l5_bg-ground02.png', 1200 * 4),
            new BackgroundObject('img/backgrounds/02/layers/l6_ground.png', 1200 * 4),
    
            new BackgroundObject('img/backgrounds/02/layers/l1_sky.png', 1200 * 5),
            new BackgroundObject('img/backgrounds/02/layers/l2_mountains.png', 1200 * 5),
            new BackgroundObject('img/backgrounds/02/layers/l4_bg-ground01.png', 1200 * 5),
            new BackgroundObject('img/backgrounds/02/layers/l5_bg-ground02.png', 1200 * 5),
            new BackgroundObject('img/backgrounds/02/layers/l6_ground.png', 1200 * 5),
    
            new BackgroundObject('img/backgrounds/02/layers/l1_sky.png', 1200 * 6),
            new BackgroundObject('img/backgrounds/02/layers/l2_mountains.png', 1200 * 6),
            new BackgroundObject('img/backgrounds/02/layers/l4_bg-ground01.png', 1200 * 6),
            new BackgroundObject('img/backgrounds/02/layers/l5_bg-ground02.png', 1200 * 6),
            new BackgroundObject('img/backgrounds/02/layers/l6_ground.png', 1200 * 6),
    
            new BackgroundObject('img/backgrounds/02/layers/l1_sky.png', 1200 * 7),
            new BackgroundObject('img/backgrounds/02/layers/l2_mountains.png', 1200 * 7),
            new BackgroundObject('img/backgrounds/02/layers/l4_bg-ground01.png', 1200 * 7),
            new BackgroundObject('img/backgrounds/02/layers/l5_bg-ground02.png', 1200 * 7),
            new BackgroundObject('img/backgrounds/02/layers/l6_ground.png', 1200 * 7)
        ],
        [
            new Platform('img/plattform/Pad_02_1.png', 400 , 200, 250, 100),
            new Platform('img/plattform/Pad_02_1.png', 1200, 280, 250, 100),
            new Platform('img/plattform/Pad_02_1.png', 2200, 150, 180, 100),
            new Platform('img/plattform/Pad_02_1.png', 3200, 150, 250, 100),
            new Platform('img/plattform/Pad_02_1.png', 4200, 200, 250, 100),
            new Platform('img/plattform/Pad_02_1.png', 5200, 220, 250, 100),
            new Platform('img/plattform/Pad_02_1.png', 6200, 280, 180, 100),
            new Platform('img/plattform/Pad_02_1.png', 900, 150, 250, 100),
            new Platform('img/plattform/Pad_02_1.png', 1700, 220, 250, 100),

            
        ],
        [
            new Star(),
            new Star(),
            new Star(),
            new Star(),
            new Star(),
            new Star(),
            new Star(),
            new Star(),
            new Star(),
            new Star(),
            new Star(),
            new Star(),
            new Star(),
            new Star(),
            new Star(),
            new Star(),
            new Star(),
        ],
        [
            new Crystal('img/cristals/1.png'),
            new Crystal('img/cristals/2.png'),
            new Crystal('img/cristals/3.png'),
            new Crystal('img/cristals/4.png'),
            new Crystal('img/cristals/6.png'),
            new Crystal('img/cristals/7.png'),
            new Crystal('img/cristals/8.png'),
            new Crystal('img/cristals/9.png'),
            new Crystal('img/cristals/10.png'),
            new Crystal('img/cristals/12.png'),
            new Crystal('img/cristals/13.png'),
            new Crystal('img/cristals/16.png'),
            new Crystal('img/cristals/19.png'),
            new Crystal('img/cristals/8.png'),
            new Crystal('img/cristals/9.png'),
            new Crystal('img/cristals/10.png'),
            new Crystal('img/cristals/12.png'),
    
        ]
    );
}



