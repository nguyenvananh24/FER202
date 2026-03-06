===== Personal Budget Management - progresstest2 =====

== Installed Packages ==
- react, react-dom, react-scripts
- react-router-dom      (routing)
- react-bootstrap       (UI components)
- bootstrap             (CSS framework)
- axios                 (HTTP client)
- react-icons           (icon set)
- json-server           (mock REST API)

== How to Run ==

1. Install dependencies (if node_modules is missing):
   npm install

2. Start JSON Server (in one terminal):
   npm run server
   --> Runs on http://localhost:3001

3. Start React App (in another terminal):
   npm start
   --> Runs on http://localhost:3000

== Test Accounts ==
Username: anhnv    Password: admin123   (Nguyễn Văn Anh)
Username: TamNT    Password: admin123   (Nguyễn Thị Tâm)

== Routes ==
- /login  → Login page (public)
- /home   → Dashboard (protected, requires login)

== Features ==
- Authentication with validation (empty fields, min 6 chars password)
- View expenses for logged-in user only
- Add / Edit / Delete expenses with real-time update
- Filter expenses by category
- Total amount displayed in VND format (e.g., 2,720,000 ₫)
- Dates displayed in DD-MM-YYYY format
- State managed via useContext + useReducer (AuthContext, ExpenseContext)
