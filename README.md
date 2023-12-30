# Bright Lights
Figma template: https://www.figma.com/file/KiUNzxGXlW8vwHH0fMR5ls/Templates-%2320.-More-on-Figma.info?node-id=1%3A4

A solo project featuring a pop-music page initially designed for wide screen and later adapted for all screen sizes. It responds to both mouse and touch interactions using pointer events.

Key features include:
1. Custom Player and Playlist Implementation:
   - Manipulating the play/pause button and navigating through the track using a slider.
   - Indicators display the current track time and duration.
   - In the case of multiple tracks in the playlist, the player automatically switches to the next track (or to the starting track if the last one ends).
   - A scrolling effect is applied to the current track's name if it's too long, allowing the full track name to be visible by continuously scrolling.
   - Local storage is used to store information about the currently playing track, so that after reloading the page, both the player and playlist retain their last positions.
     
2. Custom Slider Implementation:
   - Rendering slides based on incoming content information.
   - Navigation with previous/next buttons and dot indicators.
   - Navigation through mouse/touch scrolling.
   - Response to screen resizing optimized with debouncing.
  
TODO:
- Add links.
- Top/bottom navigation bar, linked to sections.
- ABOUT section. Bottom info panels slides on mouseover.
- NEWS section. "Read more" realization.
- MUSIC section. Side picture pulsation realization (while track is playing).
- TOURS section. "Tickets" redirection realization.
  
