import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Backup plugin loaded!');

	const disposable = vscode.commands.registerCommand('file-backup.copyFile', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage('No active file.');
            return;
        }
		const document = editor.document;
        const filePath = document.uri.fsPath;
        const dir = path.dirname(filePath);
        const ext = path.extname(filePath);
        const baseName = path.basename(filePath, ext);


		let dateTime = new Date()
		let copyName = `${baseName}_backup ${dateTime.getHours()}-${dateTime.getMinutes()}-${dateTime.getSeconds()}${ext}`;
		let copyPath = path.join(dir, copyName);

		console.log(copyPath);
		fs.writeFile(copyPath, editor.document.getText(), (err) => {
			if (err) {
				vscode.window.showInformationMessage(`Error while creating!: ${err.message}`);
				return;
			}
			vscode.window.showInformationMessage(`File created!!!: ${copyName}`);
			});

	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
