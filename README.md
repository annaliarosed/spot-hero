
# SpotHero FE Coding Challenge Submission

#### Video demonstration:

https://user-images.githubusercontent.com/56635645/153947147-7ce54b6d-a533-4a49-a3a4-4df78d0a1130.mov


#### Libraries chosen

1. react-hook-form
  - I really like this form library for the very thorough documentation and validation it provides.
2. framer-motion
  - I used this only for the animation of the incoming and exiting modal. I decided it was better time management to bring in the library and use it instead of spending too much time on implementing the animation with only css.

#### Notes

You will see 

```
{/* @ts-expect-error */}
```

in some of the code in front of `<Image />` and `<TextButton />` this is because of the mix of `tsx` and `jsx` components. I decided it was more important to show my submission then go through and change the reusable components from `jsx` to `tsx` and provide typing for them. Although given more time I would definitely type everything.

# SpotHero FE Coding Challenge
Complete the two stories below to finalize a fictitious SpotHero checkout flow.

## Prerequisites
* node/npm

## Story #1
### Background
Users want to see details about a spot before purchasing it.

### Requirements
Implement a modal that shows the spot details. Follow [the design](./screens/search-modal.jpg) provided by the product team.
* The modal should animate in and out gracefully, not just appear/disappear.

## Story #2
### Background
Users should be able to purchase a spot.

### Requirements
Add a form that takes user input, verifies it, and allows the user to hit the confirmation page. Follow [the design](./screens/checkout.jpg) provided by the product team.
* Email and Phone Number fields are required and should [display errors](./screens/checkout-errors.jpg) if not filled out correctly.
* Phone Number should only allow entry of digits. Bonus points for auto-formating to a US phone number (such as *(xxx) xxx-xxxx*).
* Adjust the confirmation page (if necessary) to ensure it works and renders correctly.
* Make sure that a second run through the flow and booking another spot updates all UI correctly.

## Directions
You may use any additional open source tools you wish to satisfy the requirements.

1. Download or clone this repository.
1. Run `npm install` to download all necessary dependencies.
1. Run `npm start` to serve the API *(see API notes below)* and spin up the local development environment.
1. Implement your solution.
1. Package up your project as a zip file and upload it to the relevant location within [Greenhouse](http://greenhouse.io).

## API
The API lives at `http://localhost:8001/api`.

Available routes include:
* `GET /spots` - Get a list of available spots.
* `GET /spots/:id` - Get a spot by `id`.
* `GET /reservations/:id` - Get a reservation by `id`
* `POST /reservations` - Purchase a spot.
    ```
    {
        spotId: int,
        email: string,
        phone: string,
        lastName: string,
        firstName: string,
    }
    ```

## Notes
* Make sure to include all necessary fields for the API request in [story #2](#story-2)
* If you are unfamiliar with [json-server](https://www.npmjs.com/package/json-server#filter), it may be worth the time to familiarize yourself with it
* Would anything here make sense to test?
* This repository may have old packages, feel free to upgrade the packages and leave an explanation here in the README explaining your thought process.
* Remember, the devil is in the details
# spot-hero


