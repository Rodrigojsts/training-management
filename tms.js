document.addEventListener('DOMContentLoaded', () => {

  // --- Local Storage Helper Functions ---
  const isLoggedIn = () => localStorage.getItem("isLoggedIn") === "true";
  const setLoggedIn = (loggedIn) => localStorage.setItem("isLoggedIn", loggedIn ? "true" : "false");

  // --- DOM Element Selection ---
  const burgerMenu = document.querySelector('.burger-menu');
  const burgerMenuContent = document.querySelector('.burger-menu-content');
  const headerMenu = document.querySelector('.header-menu');
  const logoutButton = document.querySelector('.logout');
  const menuItems = document.querySelectorAll('.burger-menu-content h3');

  // --- Error Handling ---
  if (!burgerMenu || !burgerMenuContent || !headerMenu || !logoutButton) {
    console.error("Element(s) not found. Check HTML.");
    return;
  }

  // --- Event Listeners ---

  // Logout
  logoutButton.addEventListener('click', () => {
    setLoggedIn(false);
    window.location.href = "login.html";
  });

  // Burger Menu Toggle
  burgerMenu.addEventListener('click', (event) => {
    event.stopPropagation();
    burgerMenu.classList.toggle('active');
    burgerMenuContent.classList.toggle('active');
    headerMenu.classList.toggle('active');
    console.log("Burger menu toggled.");
  });

  // Submenu Toggles
  menuItems.forEach(item => {
    item.addEventListener('click', (event) => {
      event.stopPropagation();
      const subMenu = item.nextElementSibling;
      if (subMenu && subMenu.classList.contains('sub-menu')) {
        subMenu.style.display = subMenu.style.display === 'block' ? 'none' : 'block';
        console.log(`Toggled submenu for: ${item.textContent}`);
      } else {
        console.warn("Submenu not found or missing 'sub-menu' class.");
      }
    });
  });

  // Close Burger Menu on Outside Click
  document.addEventListener('click', (event) => {
    if (burgerMenuContent.classList.contains('active') &&
        !burgerMenuContent.contains(event.target) &&
        !burgerMenu.contains(event.target)) {
      burgerMenu.classList.remove('active');
      burgerMenuContent.classList.remove('active');
      headerMenu.classList.remove('active');
      console.log("Closed burger menu due to outside click.");
    }
  });


  // --- Check Login Status on Load ---
  if (isLoggedIn()) {
    // User is logged in - Add your logic here (e.g., show/hide content)
    console.log("User is logged in.");

  } else {
    // User is not logged in
    console.log("User is NOT logged in.");
     // Consider redirecting if this page requires login:
     // window.location.href = "/login.html";  // Uncomment and adjust path if needed
  }

});
