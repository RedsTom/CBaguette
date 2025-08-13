#!/usr/bin/env node
import { program } from 'commander';
import * as fs from 'fs';
import { translate } from './translator';
import { table, reversedTable } from './keywords';

program
    .version('1.0.0')
    .description('A C to Baguette language translator');

program
    .command('compile <inputFile> <outputFile>')
    .alias('c')
    .description('Compile Baguette to C')
    .action((inputFile, outputFile) => {
        const code = fs.readFileSync(inputFile, 'utf-8');
        const translatedCode = translate(code, reversedTable);
        fs.writeFileSync(outputFile, translatedCode);
        console.log(`Compiled ${inputFile} to ${outputFile}`);
    });

program
    .command('translate <inputFile> <outputFile>')
    .alias('t')
    .description('Translate C to Baguette')
    .action((inputFile, outputFile) => {
        const code = fs.readFileSync(inputFile, 'utf-8');
        const translatedCode = translate(code, table);
        fs.writeFileSync(outputFile, translatedCode);
        console.log(`Translated ${inputFile} to ${outputFile}`);
    });

program.parse(process.argv);
