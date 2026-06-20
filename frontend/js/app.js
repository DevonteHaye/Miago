const pageMap = {
  home: "pages/home.html",
  experience: "pages/experience.html",
  rider: "pages/rider.html",
  driver: "pages/driver.html",
  profile: "pages/profile.html",
  host: "pages/host.html",
  golist: "pages/golist.html",
  deals: "pages/deals.html",
  inbox: "pages/inbox.html"
};
const pageMap = {
  home: "frontend/pages/home.html",
  experience: "frontend/pages/experience.html",
  rider: "frontend/pages/rider.html",
  driver: "frontend/pages/driver.html",
  profile: "frontend/pages/profile.html",
  host: "frontend/pages/host.html",
  golist: "frontend/pages/golist.html",
  deals: "frontend/pages/deals.html",
  inbox: "frontend/pages/inbox.html"
};

async function loadPage(pageName) {
  const app = document.getElementById("app");

  try {
    const response = await fetch(pageMap[pageName]);
    const html = await response.text();

    app.innerHTML = html;

    document.querySelectorAll(".bottom-nav button").forEach(btn => {
      btn.classList.remove("active");
    });

    const navMap = {
      home: "nav-home",
      experience: "nav-home",
      rider: "nav-rider",
      driver: "nav-rider",
      golist: "nav-golist",
      deals: "nav-deals",
      profile: "nav-profile",
      host: "nav-profile",
      inbox: "nav-inbox"
    };

    if (navMap[pageName]) {
      document.getElementById(navMap[pageName]).classList.add("active");
    }

    window.scrollTo(0, 0);
  } catch (error) {
    app.innerHTML = "<p>Page failed to load.</p>";
    console.error(error);
  }
}

function sendOffer(button) {
  const price = prompt("Enter your offer price in JMD:");
  if (price) {
    button.textContent = "Offer Sent: $" + price + " JMD";
    button.style.opacity = "0.75";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadPage("home");
});

const navMap = {
  home:"nav-home",
  experience:"nav-home",
  rider:"nav-rider",
  driver:"nav-rider",
  golist:"nav-golist",
  deals:"nav-deals",
  profile:"nav-profile",
  host:"nav-profile",
  inbox:"nav-inbox"
};

function setActiveNav(page){
  document.querySelectorAll(".bottom-nav button").forEach(btn => btn.classList.remove("active"));
  const activeNav = navMap[page];
  if(activeNav && document.getElementById(activeNav)){
    document.getElementById(activeNav).classList.add("active");
  }
}

async function goToPage(page){
  const app = document.getElementById("app");
  const pageFile = pageMap[page] || pageMap.home;

  try{
    const response = await fetch(pageFile);
    if(!response.ok) throw new Error("Page not found");

    app.innerHTML = await response.text();
    setActiveNav(page);
    window.scrollTo(0,0);
    location.hash = page;
  }catch(error){
    app.innerHTML = `<p style="color:red;font-weight:900;">Could not load ${pageFile}</p>`;
  }
}

function sendOffer(button){
  const price = prompt("Enter your offer price in JMD:");
  if(price){
    button.textContent = "Offer Sent: $" + price + " JMD";
    button.style.opacity = "0.75";
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const firstPage = location.hash.replace("#", "") || "home";
  goToPage(pageMap[firstPage] ? firstPage : "home");
});
