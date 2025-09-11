/**
 * PodcastScroller - Interactive TypeScript client-side functionality
 * Astro Island component for podcast carousel with touch/mouse support
 */

interface PodcastScrollerState {
  currentIndex: number;
  totalItems: number;
  cardWidth: number;
  isAnimating: boolean;
  touchStartX: number;
  touchCurrentX: number;
  isDragging: boolean;
  autoplayInterval?: number;
}

class PodcastScroller {
  private container: HTMLElement;
  private track: HTMLElement;
  private prevBtn: HTMLButtonElement;
  private nextBtn: HTMLButtonElement;
  private indicators: NodeListOf<HTMLButtonElement>;
  private cards: NodeListOf<HTMLElement>;
  private featuredPlayer: HTMLElement;
  private state: PodcastScrollerState;

  constructor(container: HTMLElement) {
    this.container = container;
    this.track = container.querySelector('[data-podcast-track]') as HTMLElement;
    this.prevBtn = container.querySelector('.control-prev') as HTMLButtonElement;
    this.nextBtn = container.querySelector('.control-next') as HTMLButtonElement;
    this.indicators = container.querySelectorAll('[data-indicator-index]') as NodeListOf<HTMLButtonElement>;
    this.cards = container.querySelectorAll('.podcast-card') as NodeListOf<HTMLElement>;
    this.featuredPlayer = document.querySelector('[data-featured-player]') as HTMLElement;

    this.state = {
      currentIndex: 0,
      totalItems: this.cards.length,
      cardWidth: 0,
      isAnimating: false,
      touchStartX: 0,
      touchCurrentX: 0,
      isDragging: false
    };

    this.init();
  }

  private init(): void {
    this.calculateDimensions();
    this.bindEvents();
    this.updateUI();
    this.startAutoplay();
  }

  private calculateDimensions(): void {
    if (this.cards.length > 0) {
      const cardStyle = window.getComputedStyle(this.cards[0]);
      const cardWidth = this.cards[0].offsetWidth;
      const gap = parseInt(cardStyle.marginRight) || 16;
      this.state.cardWidth = cardWidth + gap;
    }
  }

  private bindEvents(): void {
    // Navigation buttons
    this.prevBtn?.addEventListener('click', () => this.goToPrevious());
    this.nextBtn?.addEventListener('click', () => this.goToNext());

    // Indicator buttons
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => this.goToSlide(index));
    });

    // Touch/Mouse events for dragging
    this.track.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
    this.track.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: false });
    this.track.addEventListener('touchend', () => this.handleTouchEnd());

    this.track.addEventListener('mousedown', (e) => this.handleMouseDown(e));
    this.track.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    this.track.addEventListener('mouseup', () => this.handleMouseUp());
    this.track.addEventListener('mouseleave', () => this.handleMouseUp());

    // Card click events
    this.cards.forEach((card, index) => {
      card.addEventListener('click', (e) => this.handleCardClick(e, index));
      card.addEventListener('keydown', (e) => this.handleCardKeydown(e, index));
    });

    // Featured player events
    const closeBtn = this.featuredPlayer?.querySelector('[data-close-player]');
    closeBtn?.addEventListener('click', () => this.closeFeaturedPlayer());

    // Escape key to close player
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.featuredPlayer?.classList.contains('active')) {
        this.closeFeaturedPlayer();
      }
    });

    // Window resize
    window.addEventListener('resize', () => {
      this.calculateDimensions();
      this.updatePosition();
    });

    // Pause autoplay on hover
    this.container.addEventListener('mouseenter', () => this.stopAutoplay());
    this.container.addEventListener('mouseleave', () => this.startAutoplay());

    // Pause autoplay when tab not visible
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.stopAutoplay();
      } else {
        this.startAutoplay();
      }
    });
  }

  private handleTouchStart(e: TouchEvent): void {
    this.stopAutoplay();
    this.state.touchStartX = e.touches[0].clientX;
    this.state.isDragging = true;
  }

  private handleTouchMove(e: TouchEvent): void {
    if (!this.state.isDragging) return;

    e.preventDefault();
    this.state.touchCurrentX = e.touches[0].clientX;
    const deltaX = this.state.touchCurrentX - this.state.touchStartX;
    
    // Add resistance at boundaries
    const resistance = this.getBoundaryResistance(deltaX);
    const currentTranslate = -this.state.currentIndex * this.state.cardWidth;
    const newTranslate = currentTranslate + deltaX * resistance;

    this.track.style.transform = `translateX(${newTranslate}px)`;
  }

  private handleTouchEnd(): void {
    if (!this.state.isDragging) return;

    this.state.isDragging = false;
    const deltaX = this.state.touchCurrentX - this.state.touchStartX;
    const threshold = this.state.cardWidth * 0.3;

    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        this.goToPrevious();
      } else {
        this.goToNext();
      }
    } else {
      this.updatePosition();
    }

    this.startAutoplay();
  }

  private handleMouseDown(e: MouseEvent): void {
    e.preventDefault();
    this.stopAutoplay();
    this.state.touchStartX = e.clientX;
    this.state.isDragging = true;
    this.track.style.cursor = 'grabbing';
  }

  private handleMouseMove(e: MouseEvent): void {
    if (!this.state.isDragging) return;

    this.state.touchCurrentX = e.clientX;
    const deltaX = this.state.touchCurrentX - this.state.touchStartX;
    const resistance = this.getBoundaryResistance(deltaX);
    const currentTranslate = -this.state.currentIndex * this.state.cardWidth;
    const newTranslate = currentTranslate + deltaX * resistance;

    this.track.style.transform = `translateX(${newTranslate}px)`;
  }

  private handleMouseUp(): void {
    if (!this.state.isDragging) return;

    this.state.isDragging = false;
    this.track.style.cursor = 'grab';

    const deltaX = this.state.touchCurrentX - this.state.touchStartX;
    const threshold = this.state.cardWidth * 0.3;

    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        this.goToPrevious();
      } else {
        this.goToNext();
      }
    } else {
      this.updatePosition();
    }

    this.startAutoplay();
  }

  private getBoundaryResistance(deltaX: number): number {
    const isAtStart = this.state.currentIndex === 0;
    const isAtEnd = this.state.currentIndex === this.getMaxIndex();

    if ((isAtStart && deltaX > 0) || (isAtEnd && deltaX < 0)) {
      return 0.3; // Add resistance at boundaries
    }
    return 1;
  }

  private handleCardClick(e: MouseEvent, index: number): void {
    // Don't open if dragging
    if (Math.abs(this.state.touchCurrentX - this.state.touchStartX) > 10) {
      return;
    }

    this.openFeaturedPlayer(index);
  }

  private handleCardKeydown(e: KeyboardEvent, index: number): void {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.openFeaturedPlayer(index);
    }
  }

  private openFeaturedPlayer(index: number): void {
    const podcast = this.getPodcastData(index);
    if (!podcast || !this.featuredPlayer) return;

    // Update content
    const titleEl = this.featuredPlayer.querySelector('[data-featured-title]');
    const descriptionEl = this.featuredPlayer.querySelector('[data-featured-description]');
    const embedEl = this.featuredPlayer.querySelector('[data-audio-embed]');

    if (titleEl) titleEl.textContent = podcast.title;
    if (descriptionEl) descriptionEl.textContent = podcast.description || '';
    
    // Simulate audio embed (in real app, this would be an actual embed)
    if (embedEl) {
      embedEl.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
          <div style="font-size: 4rem; margin-bottom: 1rem;">🎧</div>
          <p style="color: var(--color-gray-600); margin-bottom: 1rem;">Lecteur audio simulé</p>
          <p style="font-size: 0.9rem; color: var(--color-gray-500);">Embed ID: ${podcast.episodeEmbedId}</p>
        </div>
      `;
    }

    // Show player
    this.featuredPlayer.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Focus management
    const closeBtn = this.featuredPlayer.querySelector('[data-close-player]') as HTMLElement;
    closeBtn?.focus();

    // Analytics
    this.trackEvent('podcast_play', { podcast_id: podcast.id, podcast_title: podcast.title });
  }

  private closeFeaturedPlayer(): void {
    if (!this.featuredPlayer) return;

    this.featuredPlayer.classList.remove('active');
    document.body.style.overflow = '';
    
    // Return focus to the card that opened the player
    const activeCard = this.cards[this.state.currentIndex];
    activeCard?.focus();
  }

  private getPodcastData(index: number) {
    const card = this.cards[index];
    if (!card) return null;

    const titleEl = card.querySelector('.podcast-title');
    const descriptionEl = card.querySelector('.podcast-description');
    
    return {
      id: card.dataset.podcastId || '',
      title: titleEl?.textContent || '',
      description: descriptionEl?.textContent || '',
      episodeEmbedId: card.dataset.podcastId || ''
    };
  }

  private goToPrevious(): void {
    if (this.state.isAnimating) return;
    
    const newIndex = Math.max(0, this.state.currentIndex - 1);
    this.goToSlide(newIndex);
  }

  private goToNext(): void {
    if (this.state.isAnimating) return;
    
    const newIndex = Math.min(this.getMaxIndex(), this.state.currentIndex + 1);
    this.goToSlide(newIndex);
  }

  private goToSlide(index: number): void {
    if (this.state.isAnimating || index === this.state.currentIndex) return;

    this.state.isAnimating = true;
    this.state.currentIndex = Math.max(0, Math.min(this.getMaxIndex(), index));
    
    this.updatePosition();
    this.updateUI();

    // Reset animation lock
    setTimeout(() => {
      this.state.isAnimating = false;
    }, 500);

    // Analytics
    this.trackEvent('podcast_scroll', { index: this.state.currentIndex });
  }

  private updatePosition(): void {
    const translateX = -this.state.currentIndex * this.state.cardWidth;
    this.track.style.transform = `translateX(${translateX}px)`;
  }

  private updateUI(): void {
    // Update navigation buttons
    if (this.prevBtn) {
      this.prevBtn.disabled = this.state.currentIndex === 0;
    }
    if (this.nextBtn) {
      this.nextBtn.disabled = this.state.currentIndex === this.getMaxIndex();
    }

    // Update indicators
    this.indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === this.state.currentIndex);
    });

    // Update ARIA live region for screen readers
    this.announceSlideChange();
  }

  private announceSlideChange(): void {
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.textContent = `Podcast ${this.state.currentIndex + 1} sur ${this.state.totalItems}`;
    
    document.body.appendChild(liveRegion);
    
    setTimeout(() => {
      document.body.removeChild(liveRegion);
    }, 1000);
  }

  private getMaxIndex(): number {
    const visibleCards = Math.floor(this.container.offsetWidth / this.state.cardWidth);
    return Math.max(0, this.state.totalItems - visibleCards);
  }

  private startAutoplay(): void {
    if (this.state.autoplayInterval) return;
    
    this.state.autoplayInterval = window.setInterval(() => {
      if (this.state.currentIndex === this.getMaxIndex()) {
        this.goToSlide(0);
      } else {
        this.goToNext();
      }
    }, 5000);
  }

  private stopAutoplay(): void {
    if (this.state.autoplayInterval) {
      clearInterval(this.state.autoplayInterval);
      this.state.autoplayInterval = undefined;
    }
  }

  private trackEvent(eventName: string, data: Record<string, any>): void {
    // Analytics tracking (would integrate with actual analytics service)
    console.log('Analytics:', eventName, data);
    
    // Example: gtag('event', eventName, data);
    // Example: analytics.track(eventName, data);
  }

  // Public methods for external control
  public destroy(): void {
    this.stopAutoplay();
    // Remove event listeners if needed
  }

  public getCurrentIndex(): number {
    return this.state.currentIndex;
  }

  public getTotalItems(): number {
    return this.state.totalItems;
  }
}

// Initialize all podcast scrollers on the page
function initializePodcastScrollers(): void {
  const scrollers = document.querySelectorAll('[data-podcast-scroller]');
  
  scrollers.forEach((scroller) => {
    new PodcastScroller(scroller as HTMLElement);
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializePodcastScrollers);
} else {
  initializePodcastScrollers();
}

// Export for potential external use
export { PodcastScroller, initializePodcastScrollers };