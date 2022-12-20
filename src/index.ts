import ts from 'typescript';
import path from 'path';

const transformer = (_: ts.Program) => (transformationContext: ts.TransformationContext) => (sourceFile: ts.SourceFile) => {
	function visitNode(node: ts.Node): ts.VisitResult<ts.Node> {
		if (shouldMutateModuleSpecifier(node)) {
			if (ts.isImportDeclaration(node)) {
				const newModuleSpecifier = transformationContext.factory.createStringLiteral(`${node.moduleSpecifier.text}.js`)
				node = transformationContext.factory.updateImportDeclaration(node, node.modifiers, node.importClause, newModuleSpecifier, node.assertClause);
			} else if (ts.isExportDeclaration(node)) {
				const newModuleSpecifier = transformationContext.factory.createStringLiteral(`${node.moduleSpecifier.text}.js`)
				node = transformationContext.factory.updateExportDeclaration(node, node.modifiers, node.isTypeOnly, node.exportClause, newModuleSpecifier, node.assertClause);
			}
		}

		return ts.visitEachChild(node, visitNode, transformationContext)
	}

	function shouldMutateModuleSpecifier(node: ts.Node): node is (ts.ImportDeclaration | ts.ExportDeclaration) & { moduleSpecifier: ts.StringLiteral } {
		if (!ts.isImportDeclaration(node) && !ts.isExportDeclaration(node)) return false
		if (node.moduleSpecifier === undefined) return false
		// only when module specifier is valid
		if (!ts.isStringLiteral(node.moduleSpecifier)) return false
		// only when path is relative
		if (!node.moduleSpecifier.text.startsWith('./') && !node.moduleSpecifier.text.startsWith('../')) return false
		// only when module specifier has no extension
		if (path.extname(node.moduleSpecifier.text) !== '') return false
		return true
	}

	return ts.visitNode(sourceFile, visitNode)
}

export default transformer;