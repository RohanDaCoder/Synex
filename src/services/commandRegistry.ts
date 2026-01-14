import { Command } from '../commands/base/Command';

export class CommandRegistry {
  private commands: Map<string, Command>;

  constructor() {
    this.commands = new Map();
  }

  get size(): number {
    return this.commands.size;
  }

  register(command: Command): void {
    this.commands.set(command.name, command);
  }

  get(name: string): Command | undefined {
    return this.commands.get(name);
  }

  getAll(): Command[] {
    return Array.from(this.commands.values());
  }

  getByGroup(group: string): Command[] {
    return this.getAll().filter((cmd) => cmd.options.group === group);
  }
}

export const commandRegistry = new CommandRegistry();
