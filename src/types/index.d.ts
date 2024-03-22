import type { IframeAPI } from "./SpotifyAPI"
export {}

declare global {
  interface Window {
    onSpotifyIframeApiReady: (API: IframeAPI) => void
  }
}
