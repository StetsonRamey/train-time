# Week-7 App -  Train Time
*Create a train scheduling app that will allow a user to input a train, destination, departure time, and frequency and return the arrival time and the minutes to the next train.*

Updated the portfolio page with link as well


[Portfolio Page][1]

[GifTastic Game Page][2]

[1]: https://stetsonramey.github.io/Responsive-Portfolio/portfolio.html
[2]: https://stetsonramey.github.io/train-time/

Table of Contents
=================
<!--ts-->
  * [Table of Contents](#table-of-contents)
  * [Philosophy](#philosophy)
  * [Struggles](#struggles)
  * [Ideas for Improvement](#ideas-for-improvement)
  * [Styling](#styling)
<!--te-->

  Philosophy
  ==========
  * frontend - basic boostrap theming
  * backend -
    * firebase database to store data
    * momentjs to get time information
    * javascript to handle functionality


  Struggles
  =========
  Getting momentjs to work right was the hardest part for me.  I kept getting an error when I'd try to load my `nextTrain` variable into my database.  I found that the error was happening because I was trying to `.push()` something that wasn't a string into firebase and firebase threw an error.  The fix was to add toLocaleString to the end of my firebase reference like so: `nextTrain: nextTrain.toLocaleString(),`.

  Once that was done, when I'd call my `nextTrain` variable it would bring it back weird, so I formatted it in the watcher with moment.

  Ideas for Improvement
  =====================
  I kept the styling to a minimum, just because this seemed to be a fairly "simple" app, so for improvement I could go crazy and really style this thing up.

  I thought about how to tackle the bonus of updating the text once every minute, but never got started on it.  I think it would be interesting to venture down that road, and that would certainly make the app more dynamic and useful.

  Styling
  =======
  Like I stated earlier, this I kept pretty simple.  I did incorporate some font awesome icons, which I hadn't done before and I think was interesting.  I tried to figure out how to get a fontawesome icon to tile across the background, but for time savers sake, did it the old fashioned way with an image.
