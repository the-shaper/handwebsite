$(window).on("load", function () {
  console.log("Window loaded.");

  if (typeof ScrollTrigger === "undefined") {
    console.error("ScrollTrigger is not loaded");
    return;
  }
  console.log("ScrollTrigger loaded.");

  $(".service-grid-wrapper").each(function (index) {
    console.log(`Service grid wrapper ${index} found.`);

    let childTriggers = $(this).find(".configurator-block-isolate");
    let childTargets = $(this).find(".plan-main-block");

    if (childTriggers.length === 0 || childTargets.length === 0) {
      console.error("Child elements not found.");
      return;
    }
    console.log("Child elements found.");

    childTargets.eq(0).show();

    function makeItemActive(index) {
      console.log(`Making item ${index} active.`);

      childTriggers.removeClass("is-active custom-scrollbar");
      childTargets
        .stop(true, true)
        .removeClass("is-active custom-scrollbar")
        .fadeOut({
          duration: 0,
          easing: "swing",
        });

      const activeTrigger = childTriggers.eq(index);
      const activeTarget = childTargets.eq(index);

      activeTrigger.addClass("is-active custom-scrollbar");
      activeTarget
        .stop(true, true)
        .addClass("is-active custom-scrollbar")
        .fadeIn({
          duration: 333,
          easing: "swing",
        });

      toggleButtonStates();
    }

    //makeItemActive(0);

    childTriggers.each(function (index) {
      console.log(`Creating ScrollTrigger for child ${index}.`);
      ScrollTrigger.create({
        trigger: this,
        scroller: ".configurator-column-isolate",
        start: "top center",
        end: "bottom center",
        markers: false,
        onToggle: ({ isActive }) => {
          if (isActive) {
            console.log(`Child ${index} is active.`);
            makeItemActive(index);
          }
        },
      });
    });
  });
});
