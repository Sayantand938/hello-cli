import { Command } from 'commander';

const greetCmd = new Command('greet')
  .description('Say hello to someone')
  .requiredOption('--name <name>', 'Name to greet')
  .action((options) => {
    console.log(`Hello, ${options.name}!`);
  });

export default greetCmd;