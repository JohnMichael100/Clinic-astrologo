# Dr. Astrologo | General Surgery

A multi-page clinic website built with React, React Router, HTML, CSS and JavaScript (Vite as the build tool). Font: Arial throughout.

## Pages

- Home: introduction, surgical care, practice approach and consultation call to action
- About: the practice and its care approach
- Services: service details, process, FAQ accordion
- Dr. Astrologo: surgeon profile
- Appointment: medical intake, image attachment, and demo checkout with a fixed PHP 1,000 consultation fee and confirmation step
- Contact: contact details and validated message form
- 404 page for unknown URLs

## Run it

Requires Node.js 18 or newer.

    npm install
    npm run dev        # development server
    npm run build      # production build in /dist
    npm run preview    # preview the production build

## Structure

    src/
      main.jsx          entry point
      App.jsx           routes and layout
      data.js           all editable content (services, doctors, hours, contact)
      styles.css        all styling and animations
      components/       Navbar, Footer, Icon, Reveal, Counter, Field, PageHeader
      pages/            one file per page

## Before going live

- Replace the placeholder address, phone, email and hours in `src/data.js`.
- The appointment checkout is a demo: it does not collect payment or send/save appointment or medical information. Configure the consultation fee in `src/data.js`, connect appointment intake to a secure backend, and integrate a payment provider before accepting real payments.
- The contact form validates input but does not send it anywhere yet. Connect the `submit` function in `Contact.jsx` to your backend or email service.
- The site uses client-side routing. Configure your host to serve `index.html` for all paths so direct links and refreshes work.
- Add real photography and an accessibility and security review before launch. A site handling patient data also needs privacy-law compliance (for example HIPAA or GDPR) on the backend.
