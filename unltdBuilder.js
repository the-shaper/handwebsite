//this is a test to see if it updates


document.addEventListener("DOMContentLoaded", function () {
  // Function to change button states
  function toggleButtonStates(classPrefix) {
    document.querySelectorAll(`.${classPrefix}`).forEach((parent) => {
      parent.classList.remove("selected");
      parent.classList.add("default");
      parent.querySelectorAll(".unltd-button-text, .unltd-icon-wrapper")
           .forEach((element) => {
             element.classList.remove("selected");
             element.classList.add("default");
           });
    });

    document.querySelectorAll(`.${classPrefix} input[type="radio"]:checked`)
           .forEach((checked) => {
             let parent = checked.closest(`.${classPrefix}`);
             parent.classList.remove("default");
             parent.classList.add("selected");
             parent.querySelectorAll(".unltd-button-text, .unltd-icon-wrapper")
                  .forEach((element) => {
                    element.classList.remove("default");
                    element.classList.add("selected");
                  });
           });
  }

  function initializeRadioButtons(classPrefix) {
    document.querySelectorAll(`.${classPrefix} input[type="radio"]`)
           .forEach((radio) => {
             radio.addEventListener("change", () => toggleButtonStates(classPrefix));
           });

    let firstRadioButton = document.querySelector(`.${classPrefix} input[type="radio"]`);
    if (firstRadioButton) {
      firstRadioButton.checked = true;
      toggleButtonStates(classPrefix);
    }
  }

  // Function to update radio button summary
  function updateRadioSummary(groupName) {
    document.querySelectorAll(`.Pdetailblockwrapper.${groupName}`).forEach(block => {
      block.style.display = 'none';
    });

    let selectedRadio = document.querySelector(`input[name="${groupName}"]:checked`);
    if (selectedRadio) {
      let selectedValue = selectedRadio.value;
      let summaryBlock = document.querySelector(`.Pdetailblockwrapper.${selectedValue}`);
      if (summaryBlock) {
        summaryBlock.style.display = 'block';
        summaryBlock.querySelector(".unltd-lvl-summ.name").textContent = selectedRadio.getAttribute("data-name");
        summaryBlock.querySelector(".unltd-lvl-summ.price").textContent = `$${selectedRadio.getAttribute("data-price")}`;
      }
    }
  }

  // Function to update checkbox summary
  function updateCheckboxSummary(checkboxId, detailBlockId) {
    let checkbox = document.getElementById(checkboxId);
    let detailBlock = document.getElementById(detailBlockId);

    if (checkbox && detailBlock) {
      detailBlock.style.display = checkbox.checked ? "block" : "none";
      detailBlock.querySelector(".unltd-lvl-summ.name").textContent = checkbox.getAttribute("data-name");
      detailBlock.querySelector(".unltd-lvl-summ.price").textContent = `$${checkbox.getAttribute("data-price")}`;
    }
  }

  // Initialize radio buttons and set initial summary for both groups
  initializeRadioButtons("radio-field-parent-unltd_a");
  initializeRadioButtons("radio-field-parent-unltd_b");
  updateRadioSummary("unltdA");
  updateRadioSummary("unltdB");

  // Add event listeners for radio buttons
  document.querySelectorAll('input[name="unltdA"], input[name="unltdB"]').forEach(radio => {
    radio.addEventListener('change', () => {
      updateRadioSummary(radio.getAttribute('name'));
    });
  });

  // Initialize checkboxes and set initial summary for each
  for (let i = 1; i <= 5; i++) {
    let checkboxId = `powerUp${i}`;
    let detailBlockId = `p${i}detailBlock`;
    updateCheckboxSummary(checkboxId, detailBlockId);
    document.getElementById(checkboxId).addEventListener("change", () => {
      updateCheckboxSummary(checkboxId, detailBlockId);
    });
  }

  // Function to toggle the 'selected' class for power-up checkboxes
  function toggleSelectedClass(checkboxId, parentClass, defaultSymbolClass, selectedSymbolClass) {
    const checkbox = document.getElementById(checkboxId);
    const parentDiv = document.querySelector(parentClass);
    const defaultSymbolDivs = document.querySelectorAll(defaultSymbolClass);
    const selectedSymbolDivs = document.querySelectorAll(selectedSymbolClass);

    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        parentDiv.classList.add("selected");
        defaultSymbolDivs.forEach(div => div.classList.remove("selected"));
        selectedSymbolDivs.forEach(div => div.classList.add("selected"));
      } else {
        parentDiv.classList.remove("selected");
        defaultSymbolDivs.forEach(div => div.classList.add("selected"));
        selectedSymbolDivs.forEach(div => div.classList.remove("selected"));
      }
    });
  }

  // Initialize each power-up
  ["1", "2", "3", "4", "5"].forEach(num => {
    toggleSelectedClass(
      `powerUp${num}`,
      `.power-up-square-wrapper.p${num}`,
      `.plan-powerup-row-symbol.p${num}.selected`,
      `.plan-powerup-row-symbol.p${num}`
    );
  });

  // Agency Navbar Icon
  if (window.location.pathname.includes("/agency/")) {
    var agencyNavItem = document.querySelector("#agency-nav-item");
    if (agencyNavItem) {
      agencyNavItem.classList.add("show-arrow");
    }
  }
});
