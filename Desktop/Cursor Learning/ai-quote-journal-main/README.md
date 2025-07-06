# AI Quote Journal

## Project Description
AI Quote Journal is a web-based journal app where users can securely log in, write personal journal entries, and receive AI-generated summaries or inspirational quotes based on their writing. All journal entries and AI responses are stored in a database for each user.

---

## User Workflow
1. **Sign Up / Log In**: Users create an account or log in securely.
2. **Write Journal Entry**: Users write a new journal entry using a simple form.
3. **Choose AI Option**: Users select either "Summarize this" or "Give me a quote".
4. **Receive AI Response**: The app displays an AI-generated summary or inspirational quote based on the entry.
5. **View Dashboard**: Users can view, edit, or delete past entries and see all AI responses.
6. **Log Out**: Users can securely log out of their account.

---

## Folder Structure Summary

- `/auth` — Handles user authentication logic (sign up, log in, log out, password security).
- `/journal` — Manages journal entry routes, controllers, and related UI.
- `/api` — Contains handlers for AI integration and database operations.
- `/components` — Reusable UI components for the frontend (forms, buttons, etc.).
- `/database` — Database schema, models, and setup files (e.g., Prisma schema).
- `/utils` — Helper functions and middleware (e.g., authentication checks).
- `/frontend` — The main React frontend app (pages, assets, main app logic).

---

## Notes
- Built with beginner-friendly tools and a clean, organized architecture.
- Prioritizes security, simplicity, and readability.
- Easily extendable for new features in the future.

---

## Database Schema Explained

The app uses a simple database with two main tables (models):

### User
- **id**: Unique number for each user (auto-incremented)
- **email**: User's email address (must be unique)
- **password**: User's password (stored securely)
- **entries**: List of journal entries written by the user
- **createdAt**: When the user signed up

### JournalEntry
- **id**: Unique number for each journal entry (auto-incremented)
- **userId**: The ID of the user who wrote the entry
- **entryText**: The journal text the user wrote
- **aiResponse**: The AI's summary or quote
- **createdAt**: When the entry was created
- **updatedAt**: When the entry was last changed

**Relationship:**
- Each user can have many journal entries.
- Each journal entry belongs to one user.

This setup keeps your data organized and makes it easy to find all entries for a user, or see who wrote a specific entry. 