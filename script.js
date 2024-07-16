let level = 1;
let score = 0;
let stoneDurability = 100;
let knifeStrength = 10;
let knifeUpgradeLevel = 0;
let upgradeChance = 1;
let upgradeSuccessCount = 0;

const levelElement = document.getElementById('level-number');
const scoreElement = document.getElementById('score-number');
const stoneElement = document.getElementById('stone');
const breakEffectElement = document.getElementById('break-effect');
const cutButton = document.getElementById('cut-button');
const upgradeButton = document.getElementById('upgrade-button');
const upgradeLevelElement = document.getElementById('upgrade-level');
const upgradeChanceElement = document.getElementById('upgrade-chance-number');
const upgradeCountElement = document.getElementById('upgrade-count-number');
const damageIndicatorElement = document.getElementById('damage-indicator');

const stoneColors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
    '#F7DC6F', '#BB8FCE', '#F1948A', '#82E0AA', '#85C1E9'
];

function getStoneColor(level) {
    return stoneColors[(level - 1) % stoneColors.length];
}

function updateStoneAppearance() {
    const stoneColor = getStoneColor(level);
    stoneElement.style.backgroundColor = stoneColor;
}

function playBreakEffect() {
    breakEffectElement.style.opacity = '1';
    setTimeout(() => {
        breakEffectElement.style.opacity = '0';
    }, 300);
}

function updateKnifeStrength() {
    knifeStrength = 10 + (knifeUpgradeLevel * 2);
}

function updateUpgradeChance() {
    upgradeChance = 1 / Math.pow(2, knifeUpgradeLevel);
    upgradeChanceElement.textContent = `${(upgradeChance * 100).toFixed(2)}%`;
}

function showUpgradeResult(result) {
    const upgradeResultElement = document.getElementById('upgrade-result');
    upgradeResultElement.textContent = result;
    upgradeResultElement.style.opacity = '1';
    upgradeResultElement.style.color = result === '성공!' ? 'green' : 'red';
    setTimeout(() => {
        upgradeResultElement.style.opacity = '0';
    }, 500);
}

function upgradeKnife() {
    if (knifeUpgradeLevel < 10 && Math.random() < upgradeChance) {
        knifeUpgradeLevel++;
        upgradeSuccessCount++;
        upgradeLevelElement.textContent = `+${knifeUpgradeLevel}`;
        upgradeCountElement.textContent = `+${upgradeSuccessCount}`;
        updateKnifeStrength();
        updateUpgradeChance();
        showUpgradeResult('성공!');
    } else if (knifeUpgradeLevel >= 10) {
        showUpgradeResult('최대 레벨!');
    } else {
        showUpgradeResult('실패!');
    }
}

function showDamageIndicator(damage) {
    damageIndicatorElement.textContent = `-${damage}`;
    damageIndicatorElement.style.opacity = '1';
    setTimeout(() => {
        damageIndicatorElement.style.opacity = '0';
    }, 500);
}

function cutStone() {
    stoneDurability -= knifeStrength;
    playBreakEffect();
    showDamageIndicator(knifeStrength);
    score += knifeStrength;
    scoreElement.textContent = score;
    
    if (stoneDurability <= 0) {
        level++;
        levelElement.textContent = level;
        
        if (level > 100) {
            alert(`축하합니다! 모든 레벨을 클리어하셨습니다! 최종 점수: ${score}`);
            resetGame();
            return;
        }
        
        stoneDurability = 100 + (level - 1) * 10;
        updateStoneAppearance();
        stoneElement.style.transform = 'scale(1)';
    } else {
        const scale = Math.max(0.5, stoneDurability / (100 + (level - 1) * 10));
        stoneElement.style.transform = `scale(${scale})`;
    }
}

function resetGame() {
    level = 1;
    score = 0;
    stoneDurability = 100;
    knifeStrength = 10;
    knifeUpgradeLevel = 0;
    upgradeChance = 1;
    upgradeSuccessCount = 0;
    
    levelElement.textContent = level;
    scoreElement.textContent = score;
    upgradeLevelElement.textContent = '+0';
    upgradeCountElement.textContent = '+0';
    updateStoneAppearance();
    stoneElement.style.transform = 'scale(1)';
    updateUpgradeChance();
}

cutButton.addEventListener('click', cutStone);
upgradeButton.addEventListener('click', upgradeKnife);

updateStoneAppearance();
updateKnifeStrength();
updateUpgradeChance();