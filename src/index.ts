import * as fs from 'fs';
import * as glob from 'glob';
import * as handlebars from 'handlebars';
import { compile } from 'json-schema-to-typescript';
import * as path from 'path';
import { IOutput, ProcessedSchema } from './types';
import { capitalizeFirstLetter } from './utils';

const compileConfig = {
  bannerComment: '',
  style: { singleQuote: true }
};
const outputFilename = 'schema.d.ts';
const template = handlebars.compile(fs.readFileSync(path.join(__dirname, 'types.ts.template')).toString());

export async function compileFile(filePath: string): Promise<IOutput> {
  const processedSchema: ProcessedSchema = [];
  const output: IOutput = {};

  const schemaFile = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const schemaKeys = Object.keys(schemaFile).sort();

  schemaKeys.forEach((schemaName) => {
    const schema = schemaFile[schemaName];

    if (schema.properties) {
      processedSchema.push({
        name: schemaName,
        promise: compile(schema, `I${capitalizeFirstLetter(schemaName)}`, compileConfig)
      });
    }
  });

  const waitForProcessing = processedSchema.map((schema) => schema.promise);
  const compiled = await Promise.all(waitForProcessing);

  processedSchema.forEach((schema, index) => {
    output[schema.name] = compiled[index];
  });

  return output;
}

export default function convert(schemaGlob): void {
  console.log(`looking for fastify request schemas in ${schemaGlob}`);
  // find all filepaths for any files called 'schema.ts'
  const filePaths = glob.sync(schemaGlob);

  filePaths.forEach(async (filePath) => {
    console.log(`found fastify request schemas in ${filePath}`);
    const filePathArr = filePath.split('/');
    const origFolder = filePathArr.slice(0, filePathArr.length - 1).join('/');
    const compiledData = await compileFile(filePath);

    if (Object.keys(compiledData).length > 0) {
      const fileData = template({
        compiled: compiledData,
        interfaceName: 'Request'
      });

      const outputPath = path.join(origFolder, outputFilename);
      console.log(`writing typescript schema to ${outputPath}`);

      fs.writeFileSync(outputPath, fileData);
    }
  });
}
