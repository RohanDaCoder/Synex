

;await (async()=>{
  'use strict';
// --- CommandKit require() polyfill ---
  if (typeof require === "undefined") {
    const { createRequire } = await import("node:module");
    const __require = createRequire(import.meta.url);
    Object.defineProperty(globalThis, "require", {
      value: (id) => {
        return __require(id);
      },
      configurable: true,
      enumerable: false,
      writable: true,
    });
  }
// --- CommandKit require() polyfill ---


})();



// src/index.ts
import "dotenv/config";
import { Client, IntentsBitField } from "discord.js";
import { CommandKit } from "commandkit";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
var __dirname = dirname(fileURLToPath(import.meta.url));
var client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent
  ]
});
new CommandKit({
  client,
  eventsPath: join(__dirname, "events"),
  commandsPath: join(__dirname, "commands"),
  bulkRegister: true
});
client.login(process.env.TOKEN);
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgJ2RvdGVudi9jb25maWcnO1xuXG5pbXBvcnQgeyBDbGllbnQsIEludGVudHNCaXRGaWVsZCB9IGZyb20gJ2Rpc2NvcmQuanMnO1xuaW1wb3J0IHsgQ29tbWFuZEtpdCB9IGZyb20gJ2NvbW1hbmRraXQnO1xuXG5pbXBvcnQgeyBqb2luLCBkaXJuYW1lIH0gZnJvbSAnbm9kZTpwYXRoJztcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tICdub2RlOnVybCc7XG5cbmNvbnN0IF9fZGlybmFtZSA9IGRpcm5hbWUoZmlsZVVSTFRvUGF0aChpbXBvcnQubWV0YS51cmwpKTtcblxuY29uc3QgY2xpZW50ID0gbmV3IENsaWVudCh7XG4gIGludGVudHM6IFtcbiAgICBJbnRlbnRzQml0RmllbGQuRmxhZ3MuR3VpbGRzLFxuICAgIEludGVudHNCaXRGaWVsZC5GbGFncy5HdWlsZE1lbWJlcnMsXG4gICAgSW50ZW50c0JpdEZpZWxkLkZsYWdzLkd1aWxkTWVzc2FnZXMsXG4gICAgSW50ZW50c0JpdEZpZWxkLkZsYWdzLk1lc3NhZ2VDb250ZW50LFxuICBdLFxufSk7XG5cbm5ldyBDb21tYW5kS2l0KHtcbiAgY2xpZW50LFxuICBldmVudHNQYXRoOiBqb2luKF9fZGlybmFtZSwgJ2V2ZW50cycpLFxuICBjb21tYW5kc1BhdGg6IGpvaW4oX19kaXJuYW1lLCAnY29tbWFuZHMnKSxcbiAgYnVsa1JlZ2lzdGVyOiB0cnVlLFxufSk7XG5cbmNsaWVudC5sb2dpbihwcm9jZXNzLmVudi5UT0tFTik7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQUEsT0FBTztBQUVQLFNBQVMsUUFBUSx1QkFBdUI7QUFDeEMsU0FBUyxrQkFBa0I7QUFFM0IsU0FBUyxNQUFNLGVBQWU7QUFDOUIsU0FBUyxxQkFBcUI7QUFFOUIsSUFBTSxZQUFZLFFBQVEsY0FBYyxZQUFZLEdBQUcsQ0FBQztBQUV4RCxJQUFNLFNBQVMsSUFBSSxPQUFPO0FBQUEsRUFDeEIsU0FBUztBQUFBLElBQ1AsZ0JBQWdCLE1BQU07QUFBQSxJQUN0QixnQkFBZ0IsTUFBTTtBQUFBLElBQ3RCLGdCQUFnQixNQUFNO0FBQUEsSUFDdEIsZ0JBQWdCLE1BQU07QUFBQSxFQUN4QjtBQUNGLENBQUM7QUFFRCxJQUFJLFdBQVc7QUFBQSxFQUNiO0FBQUEsRUFDQSxZQUFZLEtBQUssV0FBVyxRQUFRO0FBQUEsRUFDcEMsY0FBYyxLQUFLLFdBQVcsVUFBVTtBQUFBLEVBQ3hDLGNBQWM7QUFDaEIsQ0FBQztBQUVELE9BQU8sTUFBTSxRQUFRLElBQUksS0FBSzsiLAogICJuYW1lcyI6IFtdCn0K