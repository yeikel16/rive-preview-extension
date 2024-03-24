function initializeRive(webviewUri) {
  const r = new rive.Rive({
    src: webviewUri,
    canvas: document.getElementById("canvas"),
    autoplay: true,
    onLoad: () => {
      r.resizeDrawingSurfaceToCanvas();
      r.enableFPSCounter();

      const contentsRive = r.contents;
      console.log(contentsRive);

      const animationControlsDiv = document.getElementById("animationControls");
      contentsRive.artboards[0].animations.forEach((animation) => {
        const button = document.createElement("button");
        button.textContent = animation;
        button.addEventListener("click", () => {
          r.play(animation);
          console.log("Activating animation:", animation);
        });
        animationControlsDiv.appendChild(button);
      });

      // const stateMachineControlsDiv = document.getElementById(
      //   "stateMatchineControls"
      // );
      // contentsRive.artboards[0].stateMachines.forEach((stateMatchine) => {
      //   stateMatchine.inputs.forEach((input) => {
      //     const button = document.createElement("button");
      //     const inputName = input.name;

      //     button.textContent = inputName;
      //     button.addEventListener("click", () => {
      //       const inputType = input.type;
      //       switch (inputType) {
      //         case rive.StateMachineInputType.Trigger:
      //           input.fire();
      //           break;
      //         case rive.StateMachineInputType.Number:
      //           input.value = 42;
      //           break;
      //         case rive.StateMachineInputType.Boolean:
      //           input.value = true;
      //           break;
      //       }
      //       console.log("Activating input:", input.name);
      //     });
      //     stateMachineControlsDiv.appendChild(button);
      //   });
      // });

      const stateMachineNames = r.stateMachineNames;
      const playingAnimationNames = r.playingAnimationNames;
      const playingStateMachineNames = r.playingStateMachineNames;
      const pausedAnimationNames = r.pausedAnimationNames;
      const pausedStateMachineNames = r.pausedStateMachineNames;

      console.log("stateMachineNames", stateMachineNames);
      console.log("playingAnimationNames", playingAnimationNames);
      console.log("playingStateMachineNames", playingStateMachineNames);
      console.log("pausedAnimationNames", pausedAnimationNames);
      console.log("pausedStateMachineNames", pausedStateMachineNames);
    },
    onStateChange: (e) => {
      console.log("onStateChange", e);

    }
  });

  function onRiveEventReceived(riveEvent) {
    console.log("Rive Event Fired", riveEvent);
  }

  r.on(rive.EventType.RiveEvent, onRiveEventReceived);

  // Controladores de eventos para los botones de reproducción, pausa y detención
  document.getElementById("playButton").addEventListener("click", () => {
    r.play();
    updateButtons("playing")
  });

  document.getElementById("pauseButton").addEventListener("click", () => {
    r.pause();
    updateButtons("paused")
  });

  document.getElementById("stopButton").addEventListener("click", () => {
    r.stop();
    updateButtons("stopped")
  });
}

function updateButtons(animationState) {
  const playButton = document.getElementById("playButton");
  const pauseButton = document.getElementById("pauseButton");
  const stopButton = document.getElementById("stopButton");

  switch (animationState) {
    case "playing":
      playButton.disabled = true;
      pauseButton.disabled = false;
      stopButton.disabled = false;
      break;
    case "paused":
      playButton.disabled = false;
      pauseButton.disabled = true;
      stopButton.disabled = false;
      break;
    case "stopped":
      playButton.disabled = false;
      pauseButton.disabled = true;
      stopButton.disabled = true;
      break;
  }
}