# Synex - A Discord Bot

### Made by Rohan

Synex is a feature-rich **Discord bot** built with **TypeScript** and **Discord.js v14**. It offers a variety of functionalities to manage your Discord server, including custom commands, user management, activity tracking, and more.

---

### 🚀 Features

- **Custom Commands**: Easily create and manage commands tailored to your server's needs.
- **User Management**: Manage roles, permissions, and server settings effortlessly.
- **Activity Tracking**: Track and gain insights into user activity.
- **Modular**: Easily extend functionality with custom modules and commands.
- **Highly Customizable**: Adjust settings and commands to fit your server’s preferences.

---

### 🔧 Tech Stack

- **Programming Language**: TypeScript
- **Discord Library**: Discord.js v14
- **Database**: Calm.db (simple, JSON-based database)
- **Additional Libraries**:
  - Axios (for making HTTP requests)
  - Colors (for colorful CLI output)
  - tsup (for bundling the project)
  - Bun (package manager)
  - ESLint (for maintaining code quality)
  - Prettier (for code formatting)

---

### ⚙️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/RohanDaCoder/synex.git
   cd synex
   ```

2. Install dependencies using **bun**:
   ```bash
   bun install
   ```

3. **Configure Your Token**:
   Rename the `token.example.json` file to `token.json` and replace `"Your Token Here"` with your actual Discord Bot Token:
   ```json
   { 
     "token": "Your Token Here"
   }
   ```

4. **Configure Bot Settings**:
   Rename `src/config.example.ts` to `src/config.ts` and adjust the settings (e.g., bot ID, developer server IDs, etc.):
   ```typescript
   import { Config, EmojisType } from './types';

   const config: Config = {
     clientID: '1270321720292540446', // The Bot's ID
     devGuildIds: ['1271700025646387221'], // Developer Server IDS
     devUserIds: ['922419431508938773'], // Developer's IDS
   };

   // Emojis
   const Emojis: EmojisType = {
     Success: '<a:true:1270323437419626619>',
     Failed: '<a:false:1270323464884060254>',
     Loading: '<a:loading:1270323480746790923>',
     Money: '<:money:1306229612388552746>',
   };

   export { Emojis };
   export default config;
   ```

5. **Build and Start**:
   After configuration, build and start the bot:
   ```bash
   bun run build
   bun run start
   ```

---

### 📦 Bundled Into One File

Synex bundles into a single file, resulting in a lightweight **2 MB** final build.

**Warning**: The **Discord Bot Token** is included in the final bundle, so be cautious and ensure the repository is private or securely manage your token.

---

### 💡 Contributing

Contributions are welcome! Whether you want to fix bugs, add new features, or improve existing ones, feel free to open an issue or submit a pull request.

To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push your changes (`git push origin feature/your-feature`)
5. Create a pull request

---

### 📫 Contact

- **Author**: Rohan
- **Discord**: [rohan_ohio](https://discordapp.com/users/rohan_ohio)
- **GitHub**: [RohanDaCoder](https://github.com/RohanDaCoder)

Feel free to reach out with any questions, suggestions, or feedback!

---

### ⚖️ License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
