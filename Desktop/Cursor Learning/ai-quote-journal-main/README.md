# AI Quote Journal (For Kids!)

## What is This?
This is a magic journal app! You can write your own stories or secrets, and a friendly robot (AI) will give you a cool summary or a happy quote. Everything you write is saved just for you!

---

## How Do I Use It?
1. **Sign Up or Log In**
   - Tell the app your email and a secret password. This is like making your own secret club!
2. **Write a Journal Entry**
   - Type your story, your day, or anything you want to remember.
3. **Ask the Robot for Help**
   - You can ask the robot to "Summarize this" (make it short and sweet) or "Give me a quote" (something inspiring!).
4. **See Your Robot's Answer**
   - The robot will show you a summary or a quote. It's like magic!
5. **Look at All Your Stories**
   - You can see, change, or erase your old stories any time.
6. **Log Out**
   - When you're done, you can leave the club safely.

---

## What Are All These Folders?
- **/auth** — This is the club's door! It helps you sign up and log in.
- **/journal** — This is where your stories live. You can write, read, change, or erase them here.
- **/api** — This is the magic helper that talks to the robot and the database.
- **/utils** — These are little helpers, like the secret guard who checks your ticket (token).
- **/prisma** — This is the magic book that remembers everything (the database setup).
- **/frontend** — This is your colorful web app where you can write and see your stories!

---

## How Does the Magic Work?
- When you sign up, your password is scrambled so no one can peek!
- When you log in, you get a secret ticket (token) to use the app.
- Only you can see or change your stories.
- The robot (AI) helps you with summaries and quotes.

---

## How to Start the App (With a Grown-Up's Help)

### 1. **Backend (The Magic Clubhouse)**
- Open a terminal in the main folder (where you see package.json).
- Type `npm install` and press Enter. (This gets all the magic tools!)
- Type `npx prisma generate` and press Enter. (This sets up the magic book.)
- Type `npx prisma migrate dev --name init` and press Enter. (This builds the story shelves!)
- Type `node api/server.js` and press Enter. (This opens the club door!)

### 2. **Frontend (The Colorful Web App)**
- Open a new terminal window.
- Go to the `frontend` folder:
  ```sh
  cd frontend
  ```
- Type `npm install` and press Enter. (This gets the web app tools!)
- Type `npm start` and press Enter. (This opens the web app at http://localhost:3000)

---

## What Can You Do in the Web App?
- **Sign Up**: Make your own account with an email and password.
- **Log In**: Enter your club and get your secret ticket.
- **See Your Dashboard**: All your stories are listed here!
- **Write a New Entry**: (Coming next!)
- **View, Edit, or Delete an Entry**: (Coming soon!)
- **Log Out**: Leave the club safely.

---

## How is Everything Saved?
- There are two lists in the magic book:
  - **User**: This is you! It remembers your email and password (scrambled).
  - **JournalEntry**: These are your stories. Each story belongs to you.

---

## Have Fun!
Write your stories, ask the robot for help, and enjoy your magic journal!

---

## What We Have Built So Far
- A backend server with fun, kid-friendly code and comments.
- A React frontend with:
  - Sign Up and Login pages (connected to the backend!)
  - A Dashboard that lists all your journal entries after you log in.
- All code is organized and easy to read for beginners and kids.

**Next up:** Add the New Entry form, Single Entry View, Edit, and Delete features to the web app! 