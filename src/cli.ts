#!/usr/bin/env node
import { program } from 'commander';
import greetCommand from './commands/greet.js';

program.name('hello-cli');
program.addCommand(greetCommand);

program.parse(process.argv);