## TODO

A beautiful, production-ready to-do application with Mac-inspired design aesthetics built using modern web technologies.

## 🚀 Technologies Used

- **React 19** - Modern UI library
- **Vite** - Lightning-fast build tool
- **JavaScript (ES6+)** - Core programming language
- **CSS3** - Styling with glassmorphism effects
- **React Icons** - Beautiful icon library

## ✨ Features

### Core Functionality
- ✅ Create, edit, and delete tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Add detailed notes to tasks
- ✅ Set due dates with calendar picker
- ✅ Assign priority levels (Low, Medium, High)
- ✅ Categorize tasks by list type (Personal, Work, Shopping, Health, Study)

### Advanced Features
- 📅 **Calendar View** - Visual calendar showing tasks by date
- 🔁 **Repeating Reminders** - Daily, Weekly, Monthly options
- 🎨 **8 Theme Colors** - Customizable color schemes
- 📊 **Smart Filters** - All, Today, Upcoming, Important, Completed views
- 💾 **Local Storage** - Automatic data persistence
- 📱 **Responsive Design** - Works on all screen sizes

### UI/UX Highlights
- 🌟 Glassmorphism design
- ✨ Smooth animations and transitions
- 🎯 Clean, minimal interface
- 🖱️ Intuitive interactions
- 🌈 Beautiful gradient themes

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist` folder.

## 🌐 Deploy to Vercel

### Option 1: Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

### Option 2: Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Vite and deploy

### Option 3: Deploy Button

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=YOUR_REPO_URL)

## 📁 Project Structure

```
TODO/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx          # Navigation sidebar
│   │   ├── Sidebar.css
│   │   ├── TodoList.jsx          # Main task list view
│   │   ├── TodoList.css
│   │   ├── TodoItem.jsx          # Individual task item
│   │   ├── TodoItem.css
│   │   ├── TodoForm.jsx          # Task creation form
│   │   ├── TodoForm.css
│   │   ├── CalendarView.jsx     # Calendar interface
│   │   ├── CalendarView.css
│   │   ├── ThemeSelector.jsx    # Theme picker
│   │   └── ThemeSelector.css
│   ├── App.jsx                   # Main app component
│   ├── App.css
│   ├── index.css                 # Global styles
│   └── main.jsx                  # App entry point
├── public/                       # Static assets
├── index.html                    # HTML template
├── package.json                  # Dependencies
├── vite.config.js               # Vite configuration
├── vercel.json                  # Vercel deployment config
└── README.md                     # This file
```

## 🎨 Available Themes

1. Ocean Blue (Default)
2. Royal Purple
3. Sunset Pink
4. Vibrant Orange
5. Forest Green
6. Ocean Teal
7. Crimson Red
8. Golden Yellow

## 📝 Usage Guide

### Creating a Task
1. Click "New Task" button
2. Enter task name (required)
3. Optionally add:
   - Notes for additional details
   - Due date
   - Priority level
   - Repeat schedule
   - List category
4. Click "Create Task"

### Editing a Task
1. Click the edit icon on any task
2. Modify the details
3. Click "Save"

### Viewing Calendar
1. Click the calendar icon in the sidebar
2. Navigate months using arrow buttons
3. See tasks indicated by colored dots
4. Click any date to filter tasks

### Changing Theme
1. Click the palette icon in the sidebar
2. Select your preferred color theme
3. Theme preference is saved automatically

## 🔧 Configuration

### Customizing Colors
Edit `src/index.css` to modify theme colors:

```css
:root {
  --theme-blue: #007AFF;
  --theme-purple: #AF52DE;
  /* Add more custom colors */
}
```

### Adding New List Types
Edit `src/components/TodoForm.jsx`:

```jsx
<option value="custom">🎯 Custom</option>
```

## 🐛 Known Issues

None currently! The app is production-ready and fully tested.

## 📄 License

MIT License - Feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

## 💡 Future Enhancements

- [ ] Cloud sync with backend
- [ ] Collaboration features
- [ ] Task attachments
- [ ] Subtasks
- [ ] Tags and labels
- [ ] Search functionality
- [ ] Export/Import tasks
- [ ] Dark/Light mode toggle
- [ ] Keyboard shortcuts

## 📧 Support

For issues or questions, please open an issue on GitHub.

---

**Built with ❤️ using React and Vite**
