import { program } from 'commander';
import { registerHelloCommand } from './commands/hello';
import { version } from '../package.json';

async function main() {
    program
        .version(version)
        .name("hello-cli")
        .description('Time CLI - A simple command-line time tracker');

    // Register all commands
    registerHelloCommand(program);


    // Add default behavior or help if no command is specified
    program.on('command:*', () => {
        console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
        process.exit(1);
    });

    // Parse arguments and execute corresponding command action
    await program.parseAsync(process.argv);

     // If no command was matched by Commander (and arguments were provided), show error.
     // If no arguments were provided at all, show help.
    if (process.argv.slice(2).length > 0 && !program.args.includes(process.argv[2])) {
         if (!program.commands.map(cmd => cmd.name()).includes(process.argv[2]) && !['--help', '-h', '--version', '-V'].includes(process.argv[2])) {
             console.error('Invalid command: %s\nSee --help for a list of available commands.', process.argv[2]);
             process.exit(1);
         }
    } else if (!process.argv.slice(2).length) {
        program.outputHelp();
    }
}

main().catch(error => {
    console.error("An unexpected error occurred:", error);
    process.exit(1);
});