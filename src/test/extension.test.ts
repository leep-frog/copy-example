
// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import path from 'path';
import * as vscode from 'vscode';
// import * as myExtension from '../../extension';

function relativeFile(...fileParts: string[]) {
	return path.resolve(__dirname, "..", "..", "src", "test", "test-workspace", ...fileParts);
}

async function runCommand(command: string) {
	return vscode.commands.executeCommand(command);
}

async function delay(ms: number) {
	await new Promise(resolve => setTimeout(resolve, ms));
}

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Sample test', async () => {
		vscode.window.showInformationMessage(`HELLO`);

		// Open the file
		const file = relativeFile("example.txt");
		await vscode.workspace.openTextDocument(file).then(doc => vscode.window.showTextDocument(doc));

		// Wait for file to load
		await delay(3000);

		// Highlight text
		await runCommand("cursorEndSelect");
		await delay(3000);
		await runCommand("editor.action.clipboardCopyAction");
		await runCommand("cursorDown");
		await delay(3000);
		await runCommand("editor.action.clipboardPasteAction");
		await delay(3000);
		vscode.window.showInformationMessage(`GOODBYE`);
		await delay(3000);
	});
});
