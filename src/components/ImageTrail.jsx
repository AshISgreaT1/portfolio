import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './ImageTrail.css';

function lerp(a, b, n) {
  return (1 - n) * a + n * b;
}

function getLocalPointerPos(event, rect) {
  const source = event.touches?.[0] ?? event;

  return {
    x: source.clientX - rect.left,
    y: source.clientY - rect.top
  };
}

function getMouseDistance(p1, p2) {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;

  return Math.hypot(dx, dy);
}

class ImageItem {
  DOM = { el: null, inner: null };
  defaultStyle = { scale: 1, x: 0, y: 0, opacity: 0 };
  rect = null;

  constructor(element) {
    this.DOM.el = element;
    this.DOM.inner = element.querySelector('.image-trail__inner');
    this.getRect();
    this.resize = () => {
      gsap.set(this.DOM.el, this.defaultStyle);
      this.getRect();
    };
    window.addEventListener('resize', this.resize);
  }

  getRect() {
    this.rect = this.DOM.el.getBoundingClientRect();
  }

  destroy() {
    window.removeEventListener('resize', this.resize);
    gsap.killTweensOf([this.DOM.el, this.DOM.inner]);
  }
}

class ImageTrailController {
  constructor(container, variant) {
    this.container = container;
    this.variant = variant;
    this.images = [...container.querySelectorAll('.image-trail__item')].map((img) => new ImageItem(img));
    this.imagesTotal = this.images.length;
    this.imgPosition = 0;
    this.zIndexVal = 1;
    this.activeImagesCount = 0;
    this.isIdle = true;
    this.threshold = 62;
    this.frame = 0;
    this.started = false;
    this.mousePos = { x: 0, y: 0 };
    this.lastMousePos = { x: 0, y: 0 };
    this.cacheMousePos = { x: 0, y: 0 };

    this.handlePointerMove = (event) => {
      const rect = this.container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(event, rect);

      if (!this.started) {
        this.started = true;
        this.cacheMousePos = { ...this.mousePos };
        this.lastMousePos = { ...this.mousePos };
        this.frame = requestAnimationFrame(() => this.render());
      }
    };

    container.addEventListener('mousemove', this.handlePointerMove);
    container.addEventListener('touchmove', this.handlePointerMove, { passive: true });
  }

  render() {
    const distance = getMouseDistance(this.mousePos, this.lastMousePos);
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.16);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.16);

    if (distance > this.threshold) {
      this.showNextImage();
      this.lastMousePos = { ...this.mousePos };
    }

    if (this.isIdle && this.zIndexVal !== 1) {
      this.zIndexVal = 1;
    }

    this.frame = requestAnimationFrame(() => this.render());
  }

  showNextImage() {
    if (!this.imagesTotal) return;

    this.zIndexVal += 1;
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
    const img = this.images[this.imgPosition];
    const x = this.mousePos.x - img.rect.width / 2;
    const y = this.mousePos.y - img.rect.height / 2;
    const cachedX = this.cacheMousePos.x - img.rect.width / 2;
    const cachedY = this.cacheMousePos.y - img.rect.height / 2;

    gsap.killTweensOf([img.DOM.el, img.DOM.inner]);

    const timeline = gsap.timeline({
      onStart: () => this.onImageActivated(),
      onComplete: () => this.onImageDeactivated()
    });

    const variants = {
      1: { startScale: 1, endScale: 0.22, rotate: 0, innerScale: 1 },
      2: { startScale: 0, endScale: 0.24, rotate: 0, innerScale: 2.2 },
      3: { startScale: 0, endScale: 0.25, rotate: gsap.utils.random(-8, 8), innerScale: 1.18 },
      4: { startScale: 0.2, endScale: 0.2, rotate: gsap.utils.random(-16, 16), innerScale: 1.45 }
    };
    const config = variants[this.variant] ?? variants[1];

    timeline
      .fromTo(
        img.DOM.el,
        {
          opacity: 1,
          scale: config.startScale,
          zIndex: this.zIndexVal,
          x: cachedX,
          y: cachedY,
          rotation: config.rotate
        },
        {
          duration: 0.42,
          ease: 'power2.out',
          scale: 1,
          x,
          y,
          rotation: config.rotate
        },
        0
      )
      .fromTo(
        img.DOM.inner,
        { scale: config.innerScale, filter: this.variant === 2 ? 'brightness(180%)' : 'brightness(110%)' },
        { duration: 0.42, ease: 'power2.out', scale: 1, filter: 'brightness(100%)' },
        0
      )
      .to(
        img.DOM.el,
        {
          duration: 0.48,
          ease: 'power3.in',
          opacity: 0,
          scale: config.endScale
        },
        0.46
      );
  }

  onImageActivated() {
    this.activeImagesCount += 1;
    this.isIdle = false;
  }

  onImageDeactivated() {
    this.activeImagesCount -= 1;
    if (this.activeImagesCount === 0) {
      this.isIdle = true;
    }
  }

  destroy() {
    cancelAnimationFrame(this.frame);
    this.container.removeEventListener('mousemove', this.handlePointerMove);
    this.container.removeEventListener('touchmove', this.handlePointerMove);
    this.images.forEach((image) => image.destroy());
  }
}

export default function ImageTrail({ items = [], variant = 1 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return undefined;

    const controller = new ImageTrailController(containerRef.current, variant);

    return () => controller.destroy();
  }, [variant, items]);

  return (
    <div className="image-trail" ref={containerRef}>
      {items.map((url, index) => (
        <div className="image-trail__item" key={`${url}-${index}`}>
          <div className="image-trail__inner" style={{ backgroundImage: `url(${url})` }} />
        </div>
      ))}
    </div>
  );
}
