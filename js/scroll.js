const hiddenClass = "story__block_hidden";
const activeClass = "story__block_active";
const activeDotClass = "pagination__dot_active";

document.addEventListener('DOMContentLoaded', initStoryBoards);

function initStoryBoards() {
  document
    .querySelectorAll(".story")
    .forEach(initStoryBoard);
}

function initStoryBoard(story) {
  const blocks = [...story.querySelectorAll(".story__block")];
  const pagination = story.querySelector(".story__pagination");
  const dotsContainer = pagination.querySelector(".pagination__dots");
  const dots = [];
  let activeBlock = null;
  let nextActiveBlock = null;

  initBlocks();

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const targetId = dot.dataset.target;
      const targetBlock = document.getElementById(targetId);
      
      if (targetBlock) {
        targetBlock.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });

        setActive(targetBlock);
      }
    });

    dot.addEventListener('mouseenter', () => {
      dot.style.transform = 'scale(1.2)';
    });

    dot.addEventListener('mouseleave', () => {
      dot.style.transform = '';
    });
  });

  function initBlocks() {
    blocks.forEach((block, index) => {
      hide(block);
      const dot = addDot(dotsContainer);
      dot.dataset.target = block.id;
      dots.push(dot);
      check(block);
    });
    setActive(nextActiveBlock);
  }

  function checkBlocks() {
    blocks.forEach(check);
    setActive(nextActiveBlock);
  }

  function check(block) {
    if (underVisibleLine(block)) {
      show(block);
      nextActiveBlock = block;
    }
  }

  function underVisibleLine(block) {
    const rect = block.getBoundingClientRect();
    const blockCenter = rect.top + 0.5 * rect.height;
    const windowThreshold = 0.8 * window.innerHeight;
    return blockCenter - windowThreshold <= 0;
  }

  function show(block) {
    block.classList.remove(hiddenClass);
  }

  function hide(block) {
    block.classList.add(hiddenClass);
  }

  function addDot(dotsContainer) {
    const dot = document.createElement('div');
    dot.className = "pagination__dot";
    dotsContainer.appendChild(dot);
    return dot;
  }

  function setActive(block) {
    if (activeBlock) {
      const index = blocks.indexOf(activeBlock);
      dots[index].classList.remove(activeDotClass);
      activeBlock.classList.remove(activeClass);
    }

    blocks.forEach(block => {
      block.classList.remove(activeClass); 
    });

    activeBlock = block;

    if (activeBlock) {
      const index = blocks.indexOf(activeBlock);
      dots[index].classList.add(activeDotClass);
      activeBlock.classList.add(activeClass);
    }
  }

  window.addEventListener('scroll', checkBlocks);
}
