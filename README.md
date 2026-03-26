# User Management Dashboard

A simple and responsive user management dashboard built with Vue 3 and Pinia.

The application allows users to:

- View a list of users
- Create new users
- Filter users
- View total admin count

## Live Demo

[View Live](https://dw-pay.netlify.app/)

## Tech Stack

- Vue 3
- Pinia (State Management)
- Vue Router
- CSS (vanilla CSS, no UI framework)

## Features

- Responsive table with mobile-friendly stacked layout.
- Validation-ready form.
- Clean and modern UI design system.
- Separate loading and error states for all mock requests (fetch and create).

## Responsiveness

The application is fully responsive.

- Desktop layout: Prominent card design, table layout for the users view, and responsive grid layout for the create user form.
- Mobile layout: card-stacked layout for the users view.

## State Management

Pinia is used here to manage global state management.

Separate states are used for:

1. Fetching users (isFetchingUsers, fetchUsersError).
2. Creating users (isCreatingUser, createUserError)

## Data Handling

No real API was used, so data is mocked and persisted using localstorage.
Pinia is the single source of truth while localStorage ensures persistence across tabs and page refreshes.

## Setup Instructions

Clone this repository:

```bash
git clone https://github.com/glory-arisah/dwpay.git
cd dwpay
npm install
npm run dev
```

## Design Decisions

- Used a card-based layout as a UI improvement.
- Designed mobile-first card stacking to improve responsiveness.
- Maintained consistent typography across pages.

## Future Improvements

- Integrate with a real Backend API.
- Add edit and delete operations for users.
- Improve accessibility (Keyboard navigation, ARIA roles).
