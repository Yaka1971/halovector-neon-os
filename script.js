console.log("HALOVECTOR Neon OS Initialized");

document.addEventListener("mousemove", (e) => {

  const glow = document.querySelector(".cursor-glow");

  if(glow){
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  }

});
