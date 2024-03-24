import * as vscode from "vscode";
import { RivePreviewProvider } from "./rivePreview";

export function activate(context: vscode.ExtensionContext) {
  // Register RivePreview provider
  context.subscriptions.push(RivePreviewProvider.register(context));
}
