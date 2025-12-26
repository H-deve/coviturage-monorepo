// document.addEventListener("DOMContentLoaded", function () {
//   alert("pop up message");

// Toggle dropdown on profile icon click
document.addEventListener("DOMContentLoaded", function () {
  const profileMenu = document.querySelector(".profile-menu");
  const dropdown = document.querySelector(".dropdown");

  profileMenu.addEventListener("click", function () {
    profileMenu.classList.toggle("active");
  });

  document.addEventListener("click", function (event) {
    if (!profileMenu.contains(event.target)) {
      profileMenu.classList.remove("active");
    }
  });

  /**
   * ce code permet de faire apparaitre et disparaitre le menu de navigation
   * lorsqu'on clique sur l'icône hamburger
   *
   */
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
      navLinks.classList.toggle("show");
    });
  }

  const destinationInput = document.getElementById("destination");
  const departureInput = document.getElementById("departure");

  const destinationSuggestionContainer = document.getElementById(
    "destinationSuggestions"
  );
  const departureSuggestionContainer = document.getElementById(
    "departureSuggestions"
  );

  const geoNamesUsername = "moatasm"; // Replace with your actual username
  let selectedIndex = -1;

  const fetchCities = async (query) => {
    try {
      const response = await fetch(
        `https://secure.geonames.org/searchJSON?q=${query}&country=FR&maxRows=10&username=${geoNamesUsername}`
      );
      const data = await response.json();
      return data.geonames?.map((city) => city.name) || [];
    } catch (error) {
      console.error("Error fetching cities:", error);
      return [];
    }
  };

  /**
   *  cette fonction permet d'afficher les suggestions de villes
   *  lorsqu'on commence à taper dans le champ de recherche
   *
   * @param {*} inputField
   * @param {*} suggestionContainer
   * @param {*} suggestions
   * @returns
   */
  const showSuggestions = (inputField, suggestionContainer, suggestions) => {
    suggestionContainer.innerHTML = "";
    if (!suggestions.length)
      return (suggestionContainer.style.display = "none");

    suggestions.forEach((city, index) => {
      const item = document.createElement("div");
      item.classList.add("suggestion-item");
      item.textContent = city;
      item.addEventListener("click", () =>
        selectSuggestion(inputField, suggestionContainer, city)
      );
      suggestionContainer.appendChild(item);
    });

    positionSuggestions(inputField, suggestionContainer);
  };

  /**
   *  cette fonction permet de positionner la liste des suggestions
   *  juste en dessous du champ de recherche
   *
   * @param {*} inputField
   * @param {*} suggestionContainer
   */
  const positionSuggestions = (inputField, suggestionContainer) => {
    const rect = inputField.getBoundingClientRect();
    suggestionContainer.style.top = `${rect.bottom + window.scrollY}px`;
    suggestionContainer.style.left = `${rect.left + window.scrollX}px`;
    suggestionContainer.style.width = `${rect.width}px`;
    suggestionContainer.style.display = "block";
  };

  /**
   *  cette fonction permet de sélectionner une suggestion
   * et de la mettre dans le champ de recherche
   *
   * @param {*} inputField
   * @param {*} suggestionContainer
   * @param {*} city
   */
  const selectSuggestion = (inputField, suggestionContainer, city) => {
    inputField.value = city;
    suggestionContainer.style.display = "none";
    selectedIndex = -1;
  };

  const handleInput = async (inputField, suggestionContainer) => {
    const query = inputField.value.trim();
    if (query.length > 1) {
      const cities = await fetchCities(query);
      showSuggestions(inputField, suggestionContainer, cities);
    } else {
      suggestionContainer.style.display = "none";
    }
  };

  const handleKeydown = (event, inputField, suggestionContainer) => {
    const items = suggestionContainer.getElementsByClassName("suggestion-item");
    if (!items.length) return;

    if (event.key === "ArrowDown") {
      if (selectedIndex < items.length - 1)
        updateSelection(inputField, items, ++selectedIndex);
    } else if (event.key === "ArrowUp") {
      if (selectedIndex > 0)
        updateSelection(inputField, items, --selectedIndex);
    } else if (event.key === "Enter" && selectedIndex >= 0) {
      selectSuggestion(
        inputField,
        suggestionContainer,
        items[selectedIndex].textContent
      );
    }
  };

  const updateSelection = (inputField, items, index) => {
    [...items].forEach((item) => item.classList.remove("active"));
    items[index].classList.add("active");
    inputField.value = items[index].textContent;
  };

  destinationInput.addEventListener("input", () =>
    handleInput(destinationInput, destinationSuggestionContainer)
  );
  departureInput.addEventListener("input", () =>
    handleInput(departureInput, departureSuggestionContainer)
  );

  destinationInput.addEventListener("keydown", (e) =>
    handleKeydown(e, destinationInput, destinationSuggestionContainer)
  );
  departureInput.addEventListener("keydown", (e) =>
    handleKeydown(e, departureInput, departureSuggestionContainer)
  );

  document.addEventListener("click", (event) => {
    if (
      !destinationInput.contains(event.target) &&
      !destinationSuggestionContainer.contains(event.target)
    ) {
      destinationSuggestionContainer.style.display = "none";
    }
    if (
      !departureInput.contains(event.target) &&
      !departureSuggestionContainer.contains(event.target)
    ) {
      departureSuggestionContainer.style.display = "none";
    }
  });
});

/**
 * cette fonction permet de faire défiler les messages
 * dans la barre d'annonce
 *
 */
document.addEventListener("DOMContentLoaded", function () {
  const announcement = document.getElementById("announcement");

  const messages = [
    "🚗 Réservez votre trajet avec YlaGO en toute simplicité !",
    "🔥 Profitez des meilleurs tarifs pour vos voyages !",
    "🌍 Voyagez confortablement avec YlaGO !",
    "💼 Besoin d'un trajet pro ? YlaGO est là pour vous !",
  ];

  let index = 0;
  let isHovering = false;

  // Initial positioning based on screen size
  function updatePosition() {
    if (window.innerWidth <= 768) {
      announcement.style.left = "0";
      announcement.style.transform = "translateX(0)";
    } else {
      announcement.style.left = "50%";
      announcement.style.transform = "translateX(-50%)";
    }
  }

  /**
   *  pour afficher les messages dans la barre d'annonce
   *
   */
  announcement.parentElement.addEventListener("mouseenter", () => {
    isHovering = true;
  });

  announcement.parentElement.addEventListener("mouseleave", () => {
    isHovering = false;
  });

  /**
   *  cette fonction permet de faire défiler les messages
   * dans la barre d'annonce
   * @returns
   */
  function showAnnouncement() {
    if (isHovering) return; // Don't change if user is hovering

    announcement.textContent = messages[index];
    announcement.style.visibility = "visible";
    announcement.style.animation = "swapIn 0.5s ease-in-out forwards";

    setTimeout(() => {
      if (!isHovering) {
        // Only fade out if not hovering
        announcement.style.animation = "swapOut 0.5s ease-in-out forwards";

        setTimeout(() => {
          announcement.style.visibility = "hidden";
          index = (index + 1) % messages.length;
        }, 500);
      }
    }, 4500); // Show message for 4.5 seconds before fade out
  }

  // Initial position setup
  updatePosition();
  window.addEventListener("resize", updatePosition);

  // Start the cycle
  showAnnouncement();
  const interval = setInterval(showAnnouncement, 6000); // Rotate every 5 seconds

  // Pause on hover
  announcement.addEventListener("mouseenter", () => {
    clearInterval(interval);
  });

  announcement.addEventListener("mouseleave", () => {
    setInterval(showAnnouncement, 6000);
  });
});
