import { lexer, tokensToString } from './lexer';

export function translate(code: string, translationTable: Record<string, string>): string {
    // Déterminer si nous sommes en mode compilation (de Baguette vers C) ou traduction (de C vers Baguette)
    const isCompileMode = translationTable['vrai'] === 'true' || translationTable['si'] === 'if';

    // Analyser le code avec notre lexer avancé
    const tokens = lexer(code, isCompileMode);

    // Reconstruire le code avec les tokens traités
    return tokensToString(tokens);
}
