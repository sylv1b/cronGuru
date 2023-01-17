# cronGuru

## An autovoter for gurushots.com

cronGuru is an autovoter for challenges of gurushots.com. Simply login and it will vote to all the challenges that you joined. It will vote just enough to maintain your ratio at the highest possible level. It will also apply free boost to the picture with the most vote when available.

## Why cronGuru?

Gurushots is a great site for those who love photography. As a gurushots user, I quickly realized that voting would take too much time and that I had to find an automated solution. I started to use the solutions that existed, javascript scripts that "clicked" for me on the pictures in order to vote. That was not satisfying!!! I still had to visit each challenge regulary to "autovote" and the amout of votes that I gave was much more that was requiered to maintain the visibility ratio.

So I decided to write my own implementation with those requirements:

- Autonomous: It has to do the job by itself
- Vote only to the amount of pictures to maintain 100% visibility ration
- Never miss a free boost

## Install

```
git clone https://github.com/sylv1b/cronGuru.git
cd cronGuru
npm install
```

## Setup

### First use

The first time, you have to get the user object from gurushots (it contains the auth token)
Run:

```
npm run get-token
```

Enter your email and password when prompted. Copy the user object from terminal. Depending of your config, you can create environement variables on your server or modify the file ./src/prodConfig.js. In developement mode, you have to create a ./src/prodConfig.js file. Just copy and paste the content of ./src/prodConfig.js and update the user details.

When this is done, simply run

```
npm start
```

From now on, you don't need to vote anymore.

## Misc

- Gurushots has a request rate that is pretty low, do no try to make this multiuser ;-)
- I also made an app to vote to all or individual challenges with a single button press, this is very conveniant to get max voting ration when entering a new challenge. I keep it for myself for the moment
- I run cronGuru in CapRover, whitch requires the ./captain-definition file. More info about CapRover [here](https://caprover.com)
