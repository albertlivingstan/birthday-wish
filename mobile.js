let highestZ = 1;

class Paper {
  constructor() {
    this.holdingPaper = false;
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchMoveX = 0;
    this.touchMoveY = 0;
    this.prevTouchX = 0;
    this.prevTouchY = 0;
    this.velX = 0;
    this.velY = 0;
    this.rotation = Math.random() * 30 - 15;
    this.currentPaperX = 0;
    this.currentPaperY = 0;
    this.rotating = false;
  }

  init(paper) {
    paper.addEventListener('touchmove', (e) => {
      if (this.holdingPaper && e.touches.length === 1) {
        this.touchMoveX = e.touches[0].clientX;
        this.touchMoveY = e.touches[0].clientY;

        if (!this.rotating) {
          this.velX = this.touchMoveX - this.prevTouchX;
          this.velY = this.touchMoveY - this.prevTouchY;

          this.currentPaperX += this.velX;
          this.currentPaperY += this.velY;

          paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
        }

        this.prevTouchX = this.touchMoveX;
        this.prevTouchY = this.touchMoveY;
      }
    });

    paper.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.holdingPaper = true;

        paper.style.zIndex = highestZ++;
        
        this.touchStartX = e.touches[0].clientX;
        this.touchStartY = e.touches[0].clientY;
        this.prevTouchX = this.touchStartX;
        this.prevTouchY = this.touchStartY;
      }
    });

    paper.addEventListener('touchend', (e) => {
      if (e.touches.length === 0) {
        this.holdingPaper = false;
        this.rotating = false;
      }
    });

    // For two-finger rotation on touch screens
    paper.addEventListener('gesturestart', (e) => {
      this.rotating = true;
    });

    paper.addEventListener('gesturechange', (e) => {
      if (this.rotating) {
        this.rotation += e.rotation;
        paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
      }
    });

    paper.addEventListener('gestured', () => {
      this.rotating = false;
    });
  }
}

document.querySelectorAll('.paper').forEach(paperElement => {
  const paper = new Paper();
  paper.init(paperElement);
});
