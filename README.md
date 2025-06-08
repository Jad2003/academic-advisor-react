
# EduGuide AI - Career Guidance Platform

A modern web application built with React, TypeScript, and Tailwind CSS that helps students discover career paths through personality assessments and grade analysis.

## 🚀 Quick Start for Beginners

### Prerequisites
1. **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
2. **Visual Studio Code** - [Download here](https://code.visualstudio.com/)

### Recommended VS Code Extensions
Install these extensions for the best development experience:
- **ES7+ React/Redux/React-Native snippets** - For React code snippets
- **Auto Rename Tag** - Automatically rename paired HTML/JSX tags
- **Bracket Pair Colorizer 2** - Color matching brackets
- **Prettier - Code formatter** - Auto-format your code
- **Thunder Client** - Test APIs (like Postman)
- **Live Server** - Preview HTML files
- **GitLens** - Enhanced Git capabilities

### 📦 Installation Steps

1. **Clone or download the project**
2. **Open VS Code** and open the project folder
3. **Open the terminal** in VS Code (`Terminal` → `New Terminal`)
4. **Install dependencies**:
   ```bash
   npm install
   ```
5. **Start the development server**:
   ```bash
   npm run dev
   ```
6. **Open your browser** and go to the URL shown in terminal (usually `http://localhost:5173`)

### 🌐 Making Your Site Accessible to Others

#### Option 1: Local Network Access
1. Find your local IP address:
   - Windows: Run `ipconfig` in command prompt
   - Mac/Linux: Run `ifconfig` in terminal
2. Share your IP with the port: `http://YOUR_IP:5173`
3. Others on the same WiFi can access it

#### Option 2: Deploy Online (Free)

**Using Netlify (Recommended):**
1. Create account at [netlify.com](https://netlify.com)
2. Run `npm run build` in your terminal
3. Drag the `dist` folder to Netlify
4. Get your live URL!

**Using Vercel:**
1. Create account at [vercel.com](https://vercel.com)
2. Connect your GitHub repository
3. Auto-deploy on every push

**Using GitHub Pages:**
1. Push code to GitHub repository
2. Go to repository Settings → Pages
3. Select source branch
4. Get your GitHub Pages URL

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Navigation bar
│   ├── JobOpportunities.tsx
│   └── ui/             # Shadcn UI components
├── pages/              # Different app pages
│   ├── Index.tsx       # Home page
│   ├── About.tsx       # About page
│   ├── Contact.tsx     # Contact page
│   ├── Domains.tsx     # Job domains page
│   ├── GradesAnalysis.tsx
│   ├── PersonalityAssessment.tsx
│   ├── Login.tsx
│   └── Signup.tsx
├── services/           # Data and API logic
├── hooks/              # Custom React hooks
└── lib/                # Utility functions
```

## 🛠️ Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Check code quality

## 🎨 Technologies Used

- **React** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS
- **Shadcn/ui** - Modern UI components
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons

## 🔧 Troubleshooting

**Common Issues:**
1. **Port already in use**: Try `npm run dev -- --port 3001`
2. **Dependencies issues**: Delete `node_modules` and run `npm install` again
3. **Build errors**: Check the terminal for specific error messages

**Getting Help:**
- Check the browser console (F12) for errors
- Look at the terminal output for build errors
- Use VS Code's built-in debugging tools

## 📚 Learning Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [VS Code Tips](https://code.visualstudio.com/docs/getstarted/tips-and-tricks)

## 🤝 Contributing

1. Make changes to your code
2. Test thoroughly
3. Commit with clear messages
4. Push to your repository

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
