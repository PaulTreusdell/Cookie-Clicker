const grandmaLevel = document.querySelector('.grandma-level');
const mineLevel = document.querySelector('.mine-level');
const factoryLevel = document.querySelector('.factory-level');
const mainCookie = document.querySelector('.main-cookie');
const autoClicker = document.querySelector('.autoclicker');
const cookiesDisplay = document.querySelector('.cookies-display');
const grandmaPicture = document.getElementById('grandma');
const minePicture = document.getElementById('mine');
const factoryPicture = document.getElementById('factory');
const grandmaCost = document.querySelector('.grandma-cost');
const mineCost = document.querySelector('.mine-cost');
const factoryCost = document.querySelector('.factory-cost');
const resetButton = document.querySelector('.reset');
let cookies = JSON.parse(localStorage.getItem('cookies')) || 0;
let gLevel = JSON.parse(localStorage.getItem('grandma-level')) || 0;
let mLevel = JSON.parse(localStorage.getItem('mine-level')) || 0;
let fLevel = JSON.parse(localStorage.getItem('factory-level')) || 0;
let gCost = JSON.parse(localStorage.getItem('grandma-cost')) || 50;
let mCost = JSON.parse(localStorage.getItem('mine-cost')) || 100;
let fCost = JSON.parse(localStorage.getItem('factory-cost')) || 1000;
updateCookies();
let autoPlaying = true;

mainCookie.addEventListener("click", function() {
  click();
});

autoClicker.addEventListener("click", function() {
  autoPlay();
});

resetButton.addEventListener("click", function() {
  cookies = 0;
  localStorage.removeItem('cookies');
  gLevel = 0;
  localStorage.removeItem('grandma-level');
  mLevel = 0;
  localStorage.removeItem('mine-level');
  fLevel = 0;
  localStorage.removeItem('factory-level');
  gCost = 50;
  localStorage.removeItem('grandma-cost');
  mCost = 100;
  localStorage.removeItem('mine-cost');
  fCost = 1000;
  localStorage.removeItem('factory-cost');
  if (!autoPlaying) {
    autoPlay();
  }
  updateCookies();
});

grandmaPicture.addEventListener("click", function() {
  if (cookies >= gCost) {
    cookies -= gCost;
    gLevel += 1;
    gCost *= 2;
    updateCookies()
    localStorage.setItem("cookies", JSON.stringify(cookies));
    localStorage.setItem("grandma-level", JSON.stringify(gLevel));
    localStorage.setItem("grandma-cost", JSON.stringify(gCost));
  }
})


minePicture.addEventListener("click", function() {
  if (cookies >= mCost) {
    cookies -= mCost;
    mLevel += 1;
    mCost *= 1.20;
    updateCookies()
    localStorage.setItem("cookies", JSON.stringify(cookies));
    localStorage.setItem("mine-level", JSON.stringify(mLevel));
    localStorage.setItem("mine-cost", JSON.stringify(mCost));
  }
})

factoryPicture.addEventListener("click", function() {
  if (cookies >= fCost) {
    cookies -= fCost;
    fLevel += 1;
    fCost *= 1.20;
    updateCookies()
    localStorage.setItem("cookies", JSON.stringify(cookies));
    localStorage.setItem("furnace-level", JSON.stringify(fLevel));
    localStorage.setItem("furnace-cost", JSON.stringify(fCost));
  }
})

function updateCookies() {
  cookiesDisplay.innerHTML = `You have ${Math.floor(cookies)} cookies!`;
  factoryLevel.innerHTML = `Level: ${fLevel}`;
  factoryCost.innerHTML = `Cost: ${Math.floor(fCost)}`;
  mineLevel.innerHTML = `Level: ${mLevel}`;
  mineCost.innerHTML = `Cost: ${Math.floor(mCost)}`;
  grandmaLevel.innerHTML = `Level: ${gLevel}`;
  grandmaCost.innerHTML = `Cost: ${Math.floor(gCost)}`;
}

function autoPlay() {
  if (autoPlaying) {
    autoClicker.innerHTML = "Turn Off AutoClicker";
    IntervalId = setInterval(function() {
      click();
    }, 1000);
    autoPlaying = false;
  }
  else {
    autoPlaying = true;
    clearInterval(IntervalId);
    autoClicker.innerHTML = "Turn On AutoClicker";
  }
}

function cookieIncrement() {
  const grandmaBonus = gLevel * 2;
  const mineBonus = mLevel * 15;
  const factoryBonus = fLevel * 100;
  return 1 + grandmaBonus + mineBonus + factoryBonus;
}

function click() {
  mainCookie.style.height = "395px";
  mainCookie.style.width = "395px";
  setTimeout(function() {
    mainCookie.style.height = "400px";
    mainCookie.style.width = "400px";
  }, 5);
  cookies += cookieIncrement();
  localStorage.setItem("cookies", JSON.stringify(cookies));
  updateCookies();
}