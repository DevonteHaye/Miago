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

  if (!app) {
    console.error("Missing #app container in index.html");
    return;
  }

  try {
    const response = await fetch(pageMap[pageName]);

    if (!response.ok) {
      throw new Error("Could not load " + pageMap[pageName]);
    }

    app.innerHTML = await response.text();

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
    console.error(error);
    app.innerHTML = `
      <div style="padding:20px;font-family:Arial;">
        <h2>Page failed to load</h2>
        <p>${error.message}</p>
      </div>
    `;
  }
}

function sendOffer(button) {
  const price = prompt("Enter your offer price in JMD:");
  if (price) {
    button.textContent = "Offer Sent: $" + price + " JMD";
    button.style.opacity = "0.75";
  }
}

window.loadPage = loadPage;
window.sendOffer = sendOffer;

document.addEventListener("DOMContentLoaded", () => {
  loadPage("home");
});
