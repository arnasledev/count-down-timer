**Change time interval for session or create new count down timer**

If you willing to start a new countdown for all users or change time for all users 
(which is basically the same as starting new session) you have to change cookie name

`const cookieName = "countDownTimer_v001"` change value to `countDownTimer_v002` 
and so on with the next sessions

**Countdown time**

To change count down time you need to update `countDownTime` variable. There is everything in seconds. 
If you want to change countdown time for all users use instructions above.

**More or less variables to see in timer**

As default you will see hours, minutes and seconds in your timer. If you want to remove or add 
any of the elements you should check `variablesToShow` constant and change `boolean` value of the  
element you wont/want to see. 