//THIS VERSION WORKS UP TO WHERE THE POWER-UP CHECKBOXES ACTIVATE THEIR RESPECTIVE ICONS ON THE LEFT COLUMN THEN THEY ARE CHECKED

document.addEventListener("DOMContentLoaded", function () {
  function toggleButtonStates(classPrefix) {
    // Reset all buttons, text, and icon elements to default state
    document.querySelectorAll(`.${classPrefix}`).forEach((parent) => {
      parent.classList.remove("selected");
      parent.classList.add("default");
      parent
        .querySelectorAll(".unltd-button-text, .unltd-icon-wrapper")
        .forEach((element) => {
          element.classList.remove("selected");
          element.classList.add("default");
        });
    });

    // Apply 'selected' class to the checked radio button's parent, text, and icon elements
    document
      .querySelectorAll(`.${classPrefix} input[type="radio"]:checked`)
      .forEach((checked) => {
        let parent = checked.closest(`.${classPrefix}`);
        parent.classList.remove("default");
        parent.classList.add("selected");
        parent
          .querySelectorAll(".unltd-button-text, .unltd-icon-wrapper")
          .forEach((element) => {
            element.classList.remove("default");
            element.classList.add("selected");
          });
      });
  }

  function initializeRadioButtons(classPrefix) {
    // Add a change event listener to all radio buttons in the group
    document
      .querySelectorAll(`.${classPrefix} input[type="radio"]`)
      .forEach((radio) => {
        radio.addEventListener("change", () => toggleButtonStates(classPrefix));
      });

    // Set the first radio button in the group to be checked by default
    let firstRadioButton = document.querySelector(
      `.${classPrefix} input[type="radio"]`,
    );
    if (firstRadioButton) {
      firstRadioButton.checked = true;
      toggleButtonStates(classPrefix); // Set initial state
    }
  }

  // FUNCTION FOR UPDATING ELEMENTS BASED ON unltdA RADIO SELECTION
  function updateElementsForUnltdA() {
    let radioA = document.querySelector('input[name="unltdA"]:checked');
    if (radioA) {
      let value = radioA.value;
      // Reset the elements to default
      document
        .querySelectorAll(
          ".compare-column-symbol_a1, .compare-column-symbol_a2, .compare-column-info.a1, .compare-column-info.a2",
        )
        .forEach((el) => {
          el.classList.remove("selected");
          el.classList.add("default");
        });
      // Apply 'selected' class based on the radio button's value
      if (value === "lvl1") {
        document
          .querySelectorAll(
            ".compare-column-symbol_a1, .compare-column-info.a1",
          )
          .forEach((el) => {
            el.classList.remove("default");
            el.classList.add("selected");
          });
      } else if (value === "lvl2") {
        document
          .querySelectorAll(
            ".compare-column-symbol_a2, .compare-column-info.a2",
          )
          .forEach((el) => {
            el.classList.remove("default");
            el.classList.add("selected");
          });
      }
    }
  }

  // FUNCTION FOR UPDATING ELEMENTS BASED ON unltdB RADIO SELECTION
  function updateElementsForUnltdB() {
    let radioB = document.querySelector('input[name="unltdB"]:checked');
    if (radioB) {
      let value = radioB.value;
      // Reset the elements to default
      document
        .querySelectorAll(
          ".compare-column-symbol_b1, .compare-column-symbol_b2, .compare-column-info.b1, .compare-column-info.b2",
        )
        .forEach((el) => {
          el.classList.remove("selected");
          el.classList.add("default");
        });
      // Apply 'selected' class based on the radio button's value
      if (value === "lvl1") {
        document
          .querySelectorAll(
            ".compare-column-symbol_b1, .compare-column-info.b1",
          )
          .forEach((el) => {
            el.classList.remove("default");
            el.classList.add("selected");
          });
      } else if (value === "lvl2") {
        document
          .querySelectorAll(
            ".compare-column-symbol_b2, .compare-column-info.b2",
          )
          .forEach((el) => {
            el.classList.remove("default");
            el.classList.add("selected");
          });
      }
    }
  }

  // Initialize radio buttons for both groups
  initializeRadioButtons("radio-field-parent-unltd_a");
  initializeRadioButtons("radio-field-parent-unltd_b");

  // Initial update of elements for both groups
  updateElementsForUnltdA();
  updateElementsForUnltdB();

  // Add change event listeners for both radio button groups
  document.querySelectorAll('input[name="unltdA"]').forEach((radio) => {
    radio.addEventListener("change", updateElementsForUnltdA);
  });
  document.querySelectorAll('input[name="unltdB"]').forEach((radio) => {
    radio.addEventListener("change", updateElementsForUnltdB);
  });

  // POWER UP CHECKBOXES

  // Function to toggle the 'selected' class for power-up checkboxes
  function toggleSelectedClass(
    checkboxId,
    parentClass,
    defaultSymbolClass,
    selectedSymbolClass,
  ) {
    const checkbox = document.getElementById(checkboxId);
    const parentDiv = document.querySelector(parentClass);
    const defaultSymbolDivs = document.querySelectorAll(defaultSymbolClass);
    const selectedSymbolDivs = document.querySelectorAll(selectedSymbolClass);

    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        parentDiv.classList.add("selected");
        defaultSymbolDivs.forEach((div) => div.classList.remove("selected"));
        selectedSymbolDivs.forEach((div) => div.classList.add("selected"));
      } else {
        parentDiv.classList.remove("selected");
        defaultSymbolDivs.forEach((div) => div.classList.add("selected"));
        selectedSymbolDivs.forEach((div) => div.classList.remove("selected"));
      }
    });
  }
  // Initialize for each power-up
  toggleSelectedClass(
    "powerUp1",
    ".power-up-square-wrapper.p1",
    ".plan-powerup-row-symbol.p1.selected",
    ".plan-powerup-row-symbol.p1",
  );
  toggleSelectedClass(
    "powerUp2",
    ".power-up-square-wrapper.p2",
    ".plan-powerup-row-symbol.p2.selected",
    ".plan-powerup-row-symbol.p2",
  );
  toggleSelectedClass(
    "powerUp3",
    ".power-up-square-wrapper.p3",
    ".plan-powerup-row-symbol.p3.selected",
    ".plan-powerup-row-symbol.p3",
  );
  toggleSelectedClass(
    "powerUp4",
    ".power-up-square-wrapper.p4",
    ".plan-powerup-row-symbol.p4.selected",
    ".plan-powerup-row-symbol.p4",
  );
  toggleSelectedClass(
    "powerUp5",
    ".power-up-horizontal",
    ".plan-powerup-row-symbol.p5.selected",
    ".plan-powerup-row-symbol.p5",
  );

  // AGENCY NAVBAR ICON

  if (window.location.pathname.includes("/agency/")) {
    // Select the AGENCY navbar item
    var agencyNavItem = document.querySelector("#agency-nav-item");
    // Add a class to show the arrow
    agencyNavItem.classList.add("show-arrow");
  }
});
