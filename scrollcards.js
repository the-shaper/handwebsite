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

  // Function to update the summary for radio button selections
  function updateRadioSelection(groupName) {
    // Hide all summary blocks for this group
    document.querySelectorAll(`.summary-block-${groupName}`).forEach(block => {
      block.style.display = 'none';
    });

    // Get the selected radio button for this group
    let selectedRadio = document.querySelector(`input[name="${groupName}"]:checked`);
    if (selectedRadio) {
      // Show the corresponding summary block
      let summaryBlockId = `summary-${groupName}-${selectedRadio.value}`;
      document.getElementById(summaryBlockId).style.display = 'block';
    }
  }

  ['unltdA', 'unltdB'].forEach(groupName => {
    updateRadioSelection(groupName); // Set initial state
    document.querySelectorAll(`input[name="${groupName}"]`).forEach(radio => {
      radio.addEventListener('change', () => updateRadioSelection(groupName));
    });
  });
  
  // Function to update the summary for checkbox selections
  function updateCheckboxSummary(checkboxId, detailBlockId) {
    let checkbox = document.getElementById(checkboxId);
    let detailBlock = document.getElementById(detailBlockId);

    if (checkbox && detailBlock) {
      // Show or hide the detail block based on checkbox state
      detailBlock.style.display = checkbox.checked ? "block" : "none";

      // Update the text for name and price
      detailBlock.querySelector(".unltd-lvl-summ.name").textContent =
        checkbox.getAttribute("data-name");
      detailBlock.querySelector(".unltd-lvl-summ.price").textContent =
        `$${checkbox.getAttribute("data-price")}`;
    }
  }

  // Initialize radio buttons for both groups
  initializeRadioButtons("radio-field-parent-unltd_a");
  initializeRadioButtons("radio-field-parent-unltd_b");

  // Initial update of elements for both groups
  updateElementsForUnltdA();
  updateElementsForUnltdB();

  // Call updateRadioSummary to set the initial summary state for each radio group
  updateRadioSummary("unltdA", "unltdAselection");
  updateRadioSummary("unltdB", "unltdBselection");

  // Add change event listeners for both radio button groups
  // Add change event listeners for both radio button groups
  document.querySelectorAll('input[name="unltdA"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      updateElementsForUnltdA();
      updateRadioSummary("unltdA", "unltdAselection");
    });
  });
  document.querySelectorAll('input[name="unltdB"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      updateElementsForUnltdB();
      updateRadioSummary("unltdB", "unltdBselection");
    });
  });

  // POWER UP CHECKBOXES
  // Initialize checkboxes and update summaries
  for (let i = 1; i <= 5; i++) {
    let checkboxId = `powerUp${i}`;
    let detailBlockId = `p${i}detailBlock`;
    updateCheckboxSummary(checkboxId, detailBlockId);
    document
      .getElementById(checkboxId)
      .addEventListener("change", () =>
        updateCheckboxSummary(checkboxId, detailBlockId),
      );
  }

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
