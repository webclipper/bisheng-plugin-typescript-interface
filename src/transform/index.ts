import { parse } from '@babel/parser';
import { isTSInterfaceDeclaration, TSInterfaceDeclaration } from '@babel/types';
import * as fs from 'fs';

export function readInterfaceAstByName(
  filePath: string,
  name: string
): TSInterfaceDeclaration | null {
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const ast = parse(fs.readFileSync(filePath).toString(), {
    plugins: ['typescript']
  });
  for (let node of ast.program.body) {
    if (isTSInterfaceDeclaration(node) && node.id.name === name) {
      return node;
    }
  }
  return null;
}
