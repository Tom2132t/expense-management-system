# Expense Management System

## Description
The **Expense Management System** is a demo application built with Angular to simplify expense tracking and management for both general users and businesses. Users can create trips, add categorized expenses, and send them for approval. The app simulates role-based authentication and provides different functionalities for End Users, Approvers, and Finance roles.

---

## Features

### End User
- Create a trip:
  - **Trip Name**
  - **Trip Duration**
  - **Trip Start/End Date**
- Add expenses to a trip by category:
  - **Car Rental**:
    - Car Name
    - Pick-up/Drop-off time, date, and location
    - Total Price
  - **Hotel**:
    - Hotel Name
    - Location
    - Check-in/Check-out date
    - Total Price
  - **Flight**:
    - Airline
    - Departure/Arrival time, date, and location
    - Total Price
  - **Taxi**:
    - From, To
    - Time and date
    - Total Price
- Edit and view expenses
- Send a trip for approval:
  - Once sent, no further modifications are allowed.

### Approver
- View all trips and their expenses
- Add notes
- Approve or cancel a trip

### Finance
- View all approved trips
- Mark trips as "Refunded" or "In Process"

---

## Technologies Used

- **Frontend**: Angular, Angular Material, Tailwind CSS, DaisyUI, BroadChannel
- **State Management**: NgRx (Store, Effects, Entity, Router Store, DevTools)
- **Mock Backend**: JSON-server
- **Documentation**: Combodoc
- **Linting & Formatting**: ESLint, Prettier, Husky, Lint Staged
- **Testing**: Karma, Jasmine

---

## Setup & Installation

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v22.5.1)
- [Angular CLI](https://angular.io/cli) (v17.3.11)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Tom2132t/expense-management-system.git
   cd expense-management-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the JSON-server (mock backend):
   ```bash
   npm run start:json-server
   ```

4. Start the Angular development server:
   ```bash
   ng serve
   ```

5. Open your browser at `http://localhost:4200`.

---

## Roles & Authentication

The app simulates role-based authentication using JSON-server:

- **End User**: Full control over creating trips and adding expenses.
- **Approver**: Can view trips, add notes, and approve/cancel them.
- **Finance**: Can view approved trips and manage their statuses.

---

## Folder Structure

```plaintext
src/
├── app/
│   ├── auth/                     # Authentication module
│   │   ├── guards/               # Route guards
│   │   │   └── auth.guard.ts     # Authentication guard
│   │   ├── interceptors/         # HTTP interceptors
│   │   ├── components/           # Authentication-related components
│   │   ├── auth.routes.ts        # Authentication routes
│   │   └── auth.service.ts       # Authentication service
│   ├── core/                     # Core module
│   │   ├── layout/               # Layout components
│   │   │   ├── footer/           # Footer component
│   │   │   ├── header/           # Header component
│   │   │   ├── layout/           # Layout wrapper component
│   │   │   └── sidenav/          # Sidenav component
│   ├── services/                 # Shared services (e.g., API calls)
│   │   └── api.service.ts        # Example API service
│   ├── features/                 # Feature modules
│   │   ├── trip/                 # Trip feature module
│   │   │   │   ├── trip-list/    # Trip list component
│   │   │   │   │   └── trip-list.component.ts
│   │   │   │   ├── trip-detail/  # Trip detail component
│   │   │   │   │   └── trip-detail.component.ts
│   │   │   ├── trip.routes.ts    # Trip feature routes
│   │   ├── dashboard/                 # Dashboard feature module
│   │   │   │   ├── dashboard.component.ts    # Dashboard component
│   │   │   ├── dashboard.routes.ts    # Trip feature routes
│   │   ├── profile/                 # Profile feature module
│   │   │   │   ├── profile.component.ts    # Profile component
│   │   │   ├── profile.routes.ts    # Profile feature routes
│   ├── shared/                   # Shared module
│   │   ├── components/           # Shared UI components
│   │   │   ├── confirm-dialog/   # Confirmation dialog component
│   │   │   ├── not-found/        # Not Found component
│   │   │   └── toaster/          # Toaster component
│   │   ├── directives/           # Shared directives
│   │   │   └── toggle-password.directive.ts
│   ├── enums/                    # Enums
│   ├── models/                   # Data models
│   ├── store/                    # NgRx store setup
│   │   ├── trip/                
│   │   │   └── trip.actions.ts   # Store actions
│   │   │   └── trip.reducer.ts   # Store reducers
│   │   │   └── trip.selectors.ts   # Store selectors
│   │       └── trip.effects.ts   # Store effects
│   │       └── app.effects.ts   
│   │       └── app.state.ts   
│   ├── app.module.ts             # Root module
│   └── app.component.ts          # Root component
├── assets/                       # Static assets (e.g., images, styles)
├── environments/                 # Environment-specific configurations
│   ├── environment.ts            # Default environment
├── index.html                    # Main HTML file
├── main.ts                       # Application bootstrap
└── styles.scss                   # Global styles

```

---

## Scripts

| Script                  | Description                           |
|-------------------------|---------------------------------------|
| `ng serve`              | Start the development server         |
| `npm run start:json-server` | Start the mock backend server       |
| `ng build`              | Build the project for production     |
| `ng test`               | Run unit tests                      |
| `ng lint`               | Check for linting issues            |
| `npm run format`        | Format the codebase using Prettier  |
| `npm run compodoc:serve` | Runs the compodoc lib for documentation  |

---

## Limitations

- The app uses `json-server` to simulate a backend. It does not connect to a live database or API.
- Role-based authentication is simulated and not secure for production environments.

---

## Contributing

Contributions are welcome! Follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature XYZ"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request.

---

