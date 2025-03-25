import 'media-chrome'
import '@mux/mux-video'
import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { unsafeSVG } from 'lit/directives/unsafe-svg.js'
import skateboardRaw from './assets/skateboard-svgrepo-com.svg?raw'

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('otw-player')
export class OtwPlayer extends LitElement {

    firstUpdated() {
        const muxVideo = this.shadowRoot?.querySelector('mux-video');
        if (muxVideo) {
            muxVideo.addEventListener('play', () => {
                const timeRange = this.shadowRoot?.querySelector('media-time-range');
                if (timeRange) {
                    const svg = timeRange.querySelector('svg');
                    if (svg) {
                        // Reset the animation
                        svg.style.animation = 'none';
                        // Force reflow
                        void svg.offsetWidth;
                        // Apply new animations
                        svg.style.animation = 'spin3D 0.1s linear, spark 0.5s ease-in-out infinite';
                    }
                }
            });

            muxVideo.addEventListener('pause', () => {
                const timeRange = this.shadowRoot?.querySelector('media-time-range');
                if (timeRange) {
                    const svg = timeRange.querySelector('svg');
                    if (svg) {
                        // Reset animations
                        svg.style.animation = 'spark 0.5s ease-in-out';
                    }
                }
            });
        }
    }

    /**
     * Copy for the read the docs hint.
     */
    @property()
    docsHint = 'Off The Wall Player'

    @property()
    playbackId?: string;

    @property()
    videoTitle?: string;

    @property()
    videoDescription?: string;

    private getSvgWithAttributes() {
        // Replace the first <svg tag with one that includes your attributes
        return skateboardRaw.replace(
            '<svg',
            '<svg slot="thumb"'
        );
    }

  render() {
    return html`
      <media-controller>
        <mux-video
            playback-id="${this.playbackId}"
            slot="media"
            crossorigin
            muted
        ></mux-video>
        <media-loading-indicator slot="centered-chrome" noautohide></media-loading-indicator>
        <media-control-bar>
            <media-play-button></media-play-button>
            <media-seek-backward-button></media-seek-backward-button>
            <media-seek-forward-button ></media-seek-forward-button>
            <media-mute-button></media-mute-button>
            <media-volume-range></media-volume-range>
            <media-time-range>
                ${unsafeSVG(this.getSvgWithAttributes())}
            </media-time-range>
            <media-time-display showduration remaining></media-time-display>
            <media-playback-rate-button></media-playback-rate-button>
            <media-fullscreen-button></media-fullscreen-button>
        </media-control-bar>
    </media-controller>
    `
  }

  static styles = css`
    :host {
        max-width: 1280px;
        margin: 0 auto;
        padding: 2rem;
        text-align: center;
    }

    media-time-range {
        --media-control-background: transparent;
        --media-control-hover-background: transparent;
        --media-range-track-border-radius: 3px;
        --media-preview-time-margin: 0 0 -15px;
    }
    
    media-time-range svg {
        scale: 2;
        fill: red;
        transform-origin: center;
        transform-style: preserve-3d;
    }
    
    media-time-range:hover svg {
        transform: rotate(-45deg);
        animation: sparkHover 0.2s ease-in-out infinite;
    }

 @keyframes spin3D {
        0% {
            transform: scale(4) rotate3d(1, 0, 0, -45deg) rotate3d(0, 1, 0, 0deg);
        }
        25% {
            transform: scale(4) rotate3d(1, 0, 0, -45deg) rotate3d(0, 1, 0, 90deg);
        }
        50% {
            transform: scale(4) rotate3d(1, 0, 0, -45deg) rotate3d(0, 1, 0, 180deg);
        }
        75% {
            transform: scale(4) rotate3d(1, 0, 0, -45deg) rotate3d(0, 1, 0, 270deg);
        }
        100% {
            transform: scale(4) rotate3d(1, 0, 0, -45deg) rotate3d(0, 1, 0, 360deg);
        }
    }

  @keyframes spark {
        0% {
            filter: drop-shadow(0 0 0 yellow);
        }
        50% {
            filter: drop-shadow(0 0 40px yellow) 
                    drop-shadow(0 0 50px orange)
                    drop-shadow(0 0 60px red);
        }
        100% {
            filter: drop-shadow(0 0 0 yellow);
        }
    }

    @keyframes sparkHover {
        0% {
            transform: scale(2) rotate(-40deg);
            filter: drop-shadow(0 0 0 yellow);
        }
        50% {
            transform: scale(1.5) rotate(-35deg);
            filter: drop-shadow(0 0 20px yellow) 
                    drop-shadow(0 0 30px orange)
                    drop-shadow(0 0 40px red);
        }
        100% {
            transform: scale(2) rotate(-45deg);
            filter: drop-shadow(0 0 0 yellow);
        }
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'otw-player': OtwPlayer
  }
}
