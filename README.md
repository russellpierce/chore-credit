# Chore Credit Tracker PWA


⚠️ Almost Entirely 'Vibe Coded' with Cursor ⚠️

A Progressive Web App for tracking chore credits and managing children's tasks with a timestamped transaction ledger.

## Features

### 🎯 **Core Functionality**
- **Credit Tracking**: Add/subtract credits for each child with atomic operations
- **Transaction Ledger**: Timestamped history of all credit changes with notes
- **Child Management**: Add, delete, and manage children dynamically
- **Auto-Cleanup**: Automatically removes ledger entries older than 14 days
- **PWA Support**: Installable as a standalone app with offline capabilities

### 📊 **Data Storage**
- **Zapier Store Integration**: Cloud-synced data using Zapier Store Client
- **Atomic Operations**: Safe concurrent updates using `incrBy` for balances
- **List-based Ledger**: Transaction history stored as lists for efficient retrieval
- **Automatic Cleanup**: Old ledger entries automatically removed after 14 days

### 🎨 **User Interface**
- **Tab Navigation**: Easy switching between children
- **Modern Design**: Glass-morphism UI with gradient backgrounds
- **Responsive Layout**: Works on desktop, tablet, and mobile devices
- **Real-time Updates**: Immediate feedback for all operations

## Storage Structure

| Key Pattern | Purpose | Example |
|-------------|---------|---------|
| `'children'` | List of all children | `["Child A", "Child B"]` |
| `'{child}:balance'` | Credit balance per child | `"Child A:balance"` → `15` |
| `'{child}:ledger'` | Transaction history | `"Child A:ledger"` → `[{amount: 5, note: "Cleaned room", timestamp: 1234567890}]` |

## Ledger Entry Format

```javascript
{
  amount: 5,                    // Credit amount (positive/negative)
  note: "Cleaned room",         // Transaction note
  timestamp: 1234567890,        // Unix timestamp
  balance: 20                   // Balance after transaction
}
```

## Usage

### Adding Credits
1. Select a child's tab
2. Use +/- buttons or type amount in the input field
3. Add an optional note for the transaction
4. Click "Submit" to record the transaction

### Managing Children
1. Click "Manage Children" button
2. **Add Child**: Enter name and click "Add Child"
3. **Delete Child**: Click "Delete" next to child name (removes all data)

### Transaction History
- View all transactions in the "Transaction History" section
- Entries show amount, note, and timestamp
- Positive amounts in green, negative in red
- Automatically cleaned after 14 days

## Technical Details

### Dependencies
- **Zapier Store Client**: For cloud data persistence

### Browser Support
- Modern browsers with ES6+ support
- Service Worker for offline functionality
- PWA installation support

### Data Persistence
- All data synced to Zapier Store
- Automatic fallback to local storage on network issues
- Atomic operations prevent data corruption

## Development

### File Structure
```
chore-credit/
├── chore_pwa_app.html          # Main PWA application
├── zapier-store-client.min.js  # Zapier Store Client library
├── simple_pwa_app.html         # Original template (unchanged)
└── README.md                   # This file
```

### Configuration
Edit the `APP_CONFIG` object in `chore_pwa_app.html`:
```javascript
const APP_CONFIG = {
    children: ["Child A", "Child B"],  // Default children
    appName: "Chore Credit Tracker",
    zapierSecret: "your-uuid-here"     // Your Zapier Store secret
};
```

## Installation

1. **Local Development**: Open `chore_pwa_app.html` in a browser
2. **PWA Installation**: Use browser's install prompt or "Install App" button
3. **Production**: Deploy to any static hosting service

## Future Enhancements

- [ ] Export transaction history to CSV
- [ ] Set credit goals and rewards
- [ ] Parent/child role management
- [ ] Multi-family support
- [ ] Advanced reporting and analytics

---

Built with ❤️ using modern web technologies and Zapier Store for "reliable" data persistence.
