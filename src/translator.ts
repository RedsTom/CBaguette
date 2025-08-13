import { translateCToBaguette, compileBaguetteToC } from './lexer';

export function translate(code: string, translationTable: Record<string, string>): string {
    // Déterminer si nous sommes en mode compilation ou traduction à partir de la table fournie
    const isBaguetteToC = translationTable['néant'] === 'void' || translationTable['si'] === 'if';

    if (isBaguetteToC) {
        // Mode compilation : C🥖 vers C
        return compileBaguetteToC(code);
    } else {
        // Mode traduction : C vers C🥖
        return translateCToBaguette(code);
    }
}
