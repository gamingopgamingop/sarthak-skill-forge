# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/c3f59b9b-7bbc-4f6c-8fd2-f89738d8aed2

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/c3f59b9b-7bbc-4f6c-8fd2-f89738d8aed2) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## React Animation Libraries Overview

| Library | What it’s good for / Unique Features | Trade-offs / When it might be less ideal |
| --- | --- | --- |
| **React Spring** | Physics-based animations, smooth natural motions; good for interactive UI elements. ([DEV Community](https://dev.to/sovannaro/13-awesome-react-animation-libraries-to-elevate-your-design-projects-549g?utm_source=chatgpt.com)) | Slightly larger API surface; more setup required for some animations vs using built-in variants in Framer Motion. |
| **GSAP (GreenSock Animation Platform)** | Very powerful timelines, fine control; works with raw JS, SVG, canvas, etc. High performance. ([DEV Community](https://dev.to/sovannaro/13-awesome-react-animation-libraries-to-elevate-your-design-projects-549g?utm_source=chatgpt.com)) | More complex sometimes; steeper learning curve; may add more bundle size especially if you need many features. |
| **Anime.js** | Lightweight, good for CSS properties, SVGs, DOM; simpler timeline/sequence animations. ([积玉工作室](https://jiyushe.com/producthunk/best-framer-motion-alternatives-and-competitors.html?utm_source=chatgpt.com)) | Fewer abstractions for gestures or layout transitions; might need more manual orchestration. |
| **React Motion** | Another physics-based approach; less opinionated, good if you want control. ([Developer Updates](https://www.developerupdates.com/blog/useful-react-animation-libraries?utm_source=chatgpt.com)) | Less feature rich in terms of gestures/shared layout etc compared to Framer Motion; maybe less active development (depending on version). |
| **Popmotion** | Functional style animation library; good for low level control, springs, keyframes. ([积玉工作室](https://jiyushe.com/producthunk/best-framer-motion-alternatives-and-competitors.html?utm_source=chatgpt.com)) | Less “batteries included” for layout transitions, shared element transitions; more work to assemble complex animations. |
| **React Transition Group** | Light & simple; good for enter/exit (mount/unmount) animations, simple transitions. ([DEV Community](https://dev.to/sovannaro/13-awesome-react-animation-libraries-to-elevate-your-design-projects-549g?utm_source=chatgpt.com)) | Not as rich for gesture support, layout transitions, or animation variants. More low-level. |
| **Lottie / lottie-react** | Great if you want vector animations designed in After Effects etc; small size; nice for decorative animations, icons etc. ([积玉工作室](https://jiyushe.com/producthunk/best-framer-motion-alternatives-and-competitors.html?utm_source=chatgpt.com)) | Not built for layout transitions, gestures, or dynamic interactive animations (you get what was created in AE mostly). |
| **React Flip Toolkit** | Useful for shared layout / list reordering animations (FLIP technique) etc. Very effective for list animations and reordering. ([reddit.com](https://www.reddit.com/r/reactjs/comments/uou1jp?utm_source=chatgpt.com)) | More specific in scope; you might need other libraries for gesture, complex animation flows, etc. |

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/c3f59b9b-7bbc-4f6c-8fd2-f89738d8aed2) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
