document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("fade-in");
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".about").forEach(section => {
    observer.observe(section);
  });
});
