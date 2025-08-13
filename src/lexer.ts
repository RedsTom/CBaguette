import { table, reversedTable } from './keywords';

// Types de tokens
export enum TokenType {
    KEYWORD = 'keyword',
    IDENTIFIER = 'identifier',
    STRING_LITERAL = 'string',
    CHAR_LITERAL = 'char',
    NUMBER = 'number',
    PREPROCESSOR = 'preprocessor',
    COMMENT_BLOCK = 'comment_block',
    COMMENT_LINE = 'comment_line',
    OPERATOR = 'operator',
    PUNCTUATION = 'punctuation',
    WHITESPACE = 'whitespace',
    NEWLINE = 'newline',
    OTHER = 'other'
}

export interface Token {
    type: TokenType;
    value: string;
    line: number;
    column: number;
}

// Classe de base pour les lexers
class BaseLexer {
    protected code: string;
    protected position: number = 0;
    protected line: number = 1;
    protected column: number = 1;
    protected keywords: Set<string>;

    constructor(code: string) {
        this.code = code;
        this.keywords = new Set();
    }

    public tokenize(): Token[] {
        const tokens: Token[] = [];

        while (this.position < this.code.length) {
            const token = this.nextToken();
            if (token) {
                tokens.push(token);
            }
        }

        return tokens;
    }

    protected nextToken(): Token | null {
        if (this.position >= this.code.length) {
            return null;
        }

        const char = this.peek();
        const startLine = this.line;
        const startColumn = this.column;

        // Espaces blancs
        if (/\s/.test(char)) {
            return this.readWhitespace(startLine, startColumn);
        }

        // Commentaires de bloc
        if (char === '/' && this.peek(1) === '*') {
            return this.readBlockComment(startLine, startColumn);
        }

        // Commentaires de ligne
        if (char === '/' && this.peek(1) === '/') {
            return this.readLineComment(startLine, startColumn);
        }

        // Directives de préprocesseur
        if (char === '#' && (this.column === 1 || this.isWhitespaceBeforeCurrent())) {
            return this.readPreprocessor(startLine, startColumn);
        }

        // Chaînes de caractères
        if (char === '"') {
            return this.readString(startLine, startColumn);
        }

        // Caractères
        if (char === '\'') {
            return this.readChar(startLine, startColumn);
        }

        // Nombres
        if (/[0-9]/.test(char) || (char === '.' && /[0-9]/.test(this.peek(1)))) {
            return this.readNumber(startLine, startColumn);
        }

        // Identifiants et mots-clés
        if (/[a-zA-Z_éèêëàâäôöùûüÿçÉÈÊËÀÂÄÔÖÙÛÜŸÇ]/.test(char)) {
            return this.readIdentifierOrKeyword(startLine, startColumn);
        }

        // Opérateurs et ponctuation
        return this.readOperatorOrPunctuation(startLine, startColumn);
    }

    protected readWhitespace(startLine: number, startColumn: number): Token {
        let value = '';

        while (this.position < this.code.length && /\s/.test(this.peek())) {
            const char = this.advance();
            value += char;

            if (char === '\n') {
                return {
                    type: TokenType.NEWLINE,
                    value,
                    line: startLine,
                    column: startColumn
                };
            }
        }

        return {
            type: TokenType.WHITESPACE,
            value,
            line: startLine,
            column: startColumn
        };
    }

    protected readBlockComment(startLine: number, startColumn: number): Token {
        let value = '';
        value += this.advance(); // '/'
        value += this.advance(); // '*'

        while (this.position < this.code.length) {
            if (this.peek() === '*' && this.peek(1) === '/') {
                value += this.advance(); // '*'
                value += this.advance(); // '/'
                break;
            }
            value += this.advance();
        }

        return {
            type: TokenType.COMMENT_BLOCK,
            value,
            line: startLine,
            column: startColumn
        };
    }

    protected readLineComment(startLine: number, startColumn: number): Token {
        let value = '';
        value += this.advance(); // '/'
        value += this.advance(); // '/'

        while (this.position < this.code.length && this.peek() !== '\n') {
            value += this.advance();
        }

        return {
            type: TokenType.COMMENT_LINE,
            value,
            line: startLine,
            column: startColumn
        };
    }

    protected readPreprocessor(startLine: number, startColumn: number): Token {
        let value = '';
        value += this.advance(); // '#'

        // Ignorer les espaces après le #
        while (this.position < this.code.length && /\s/.test(this.peek()) && this.peek() !== '\n') {
            value += this.advance();
        }

        // Lire la directive
        while (this.position < this.code.length && this.peek() !== '\n') {
            // Gestion des lignes de continuation
            if (this.peek() === '\\' && this.peek(1) === '\n') {
                value += this.advance(); // '\'
                value += this.advance(); // '\n'
                continue;
            }
            value += this.advance();
        }

        return {
            type: TokenType.PREPROCESSOR,
            value,
            line: startLine,
            column: startColumn
        };
    }

    protected readString(startLine: number, startColumn: number): Token {
        let value = '';
        value += this.advance(); // '"'

        while (this.position < this.code.length && this.peek() !== '"') {
            if (this.peek() === '\\') {
                value += this.advance(); // '\'
                if (this.position < this.code.length) {
                    value += this.advance(); // caractère échappé
                }
            } else {
                value += this.advance();
            }
        }

        if (this.position < this.code.length) {
            value += this.advance(); // '"'
        }

        return {
            type: TokenType.STRING_LITERAL,
            value,
            line: startLine,
            column: startColumn
        };
    }

    protected readChar(startLine: number, startColumn: number): Token {
        let value = '';
        value += this.advance(); // '\''

        while (this.position < this.code.length && this.peek() !== '\'') {
            if (this.peek() === '\\') {
                value += this.advance(); // '\'
                if (this.position < this.code.length) {
                    value += this.advance(); // caractère échappé
                }
            } else {
                value += this.advance();
            }
        }

        if (this.position < this.code.length) {
            value += this.advance(); // '\''
        }

        return {
            type: TokenType.CHAR_LITERAL,
            value,
            line: startLine,
            column: startColumn
        };
    }

    protected readNumber(startLine: number, startColumn: number): Token {
        let value = '';

        // Nombres hexadécimaux
        if (this.peek() === '0' && (this.peek(1) === 'x' || this.peek(1) === 'X')) {
            value += this.advance(); // '0'
            value += this.advance(); // 'x' ou 'X'

            while (this.position < this.code.length && /[0-9a-fA-F]/.test(this.peek())) {
                value += this.advance();
            }
        }
        // Nombres octaux
        else if (this.peek() === '0' && /[0-7]/.test(this.peek(1))) {
            value += this.advance(); // '0'

            while (this.position < this.code.length && /[0-7]/.test(this.peek())) {
                value += this.advance();
            }
        }
        // Nombres décimaux
        else {
            // Partie entière
            while (this.position < this.code.length && /[0-9]/.test(this.peek())) {
                value += this.advance();
            }

            // Partie décimale
            if (this.peek() === '.') {
                value += this.advance(); // '.'

                while (this.position < this.code.length && /[0-9]/.test(this.peek())) {
                    value += this.advance();
                }
            }

            // Exposant
            if (this.peek() === 'e' || this.peek() === 'E') {
                value += this.advance(); // 'e' ou 'E'

                if (this.peek() === '+' || this.peek() === '-') {
                    value += this.advance(); // '+' ou '-'
                }

                while (this.position < this.code.length && /[0-9]/.test(this.peek())) {
                    value += this.advance();
                }
            }
        }

        // Suffixes (L, U, F, etc.)
        while (this.position < this.code.length && /[a-zA-Z]/.test(this.peek())) {
            value += this.advance();
        }

        return {
            type: TokenType.NUMBER,
            value,
            line: startLine,
            column: startColumn
        };
    }

    protected readIdentifierOrKeyword(startLine: number, startColumn: number): Token {
        let value = '';

        while (this.position < this.code.length && /[a-zA-Z0-9_éèêëàâäôöùûüÿçÉÈÊËÀÂÄÔÖÙÛÜŸÇ]/.test(this.peek())) {
            value += this.advance();
        }

        // Déterminer si c'est un mot-clé ou un identifiant
        const type = this.keywords.has(value) ? TokenType.KEYWORD : TokenType.IDENTIFIER;

        return {
            type,
            value,
            line: startLine,
            column: startColumn
        };
    }

    protected readOperatorOrPunctuation(startLine: number, startColumn: number): Token {
        let value = this.advance();

        // Opérateurs composés de deux caractères
        const twoCharOps = [
            '++', '--', '+=', '-=', '*=', '/=', '%=', '&=', '|=', '^=', '<<', '>>',
            '==', '!=', '<=', '>=', '&&', '||', '->', '..'
        ];

        if (this.position < this.code.length) {
            const twoChars = value + this.peek();

            if (twoCharOps.includes(twoChars)) {
                value += this.advance();
            }
        }

        // Déterminer si c'est un opérateur ou une ponctuation
        const type = this.isOperator(value) ? TokenType.OPERATOR : TokenType.PUNCTUATION;

        return {
            type,
            value,
            line: startLine,
            column: startColumn
        };
    }

    protected advance(): string {
        if (this.position >= this.code.length) {
            return '';
        }

        const char = this.code[this.position];
        this.position++;

        if (char === '\n') {
            this.line++;
            this.column = 1;
        } else {
            this.column++;
        }

        return char;
    }

    protected peek(offset: number = 0): string {
        const pos = this.position + offset;

        if (pos >= this.code.length) {
            return '';
        }

        return this.code[pos];
    }

    protected isWhitespaceBeforeCurrent(): boolean {
        let pos = this.position - 1;

        while (pos >= 0 && this.code[pos] !== '\n') {
            if (!/\s/.test(this.code[pos])) {
                return false;
            }
            pos--;
        }

        return true;
    }

    protected isOperator(value: string): boolean {
        const operators = [
            '+', '-', '*', '/', '%', '=', '!', '<', '>', '&', '|', '^', '~',
            '++', '--', '+=', '-=', '*=', '/=', '%=', '&=', '|=', '^=',
            '<<', '>>', '<<=', '>>=', '==', '!=', '<=', '>=', '&&', '||', '->'
        ];

        return operators.includes(value);
    }
}

// Lexer spécifique pour le code C
export class CLexer extends BaseLexer {
    constructor(code: string) {
        super(code);
        // Définir les mots-clés C
        this.keywords = new Set(Object.keys(table));
    }
}

// Lexer spécifique pour le code C🥖
export class BaguetteLexer extends BaseLexer {
    constructor(code: string) {
        super(code);
        // Définir les mots-clés C🥖
        this.keywords = new Set(Object.keys(reversedTable));
    }
}

// Fonction pour traduire le code C vers C🥖
export function translateCToBaguette(code: string): string {
    const cLexer = new CLexer(code);
    const tokens = cLexer.tokenize();
    return processTokensForTranslation(tokens);
}

// Fonction pour compiler le code C🥖 vers C
export function compileBaguetteToC(code: string): string {
    const baguetteLexer = new BaguetteLexer(code);
    const tokens = baguetteLexer.tokenize();
    return processTokensForCompilation(tokens);
}

// Traitement des tokens pour la traduction C -> C🥖
function processTokensForTranslation(tokens: Token[]): string {
    const result: string[] = [];

    for (const token of tokens) {
        if (token.type === TokenType.KEYWORD) {
            // Remplacer uniquement les mots-clés C par leurs équivalents C🥖
            const translated = table[token.value];
            if (translated) {
                result.push(translated);
            } else {
                result.push(token.value);
            }
        } else {
            // Conserver les autres tokens tels quels
            result.push(token.value);
        }
    }

    return tokensToString(result);
}

// Traitement des tokens pour la compilation C🥖 -> C
function processTokensForCompilation(tokens: Token[]): string {
    const result: string[] = [];

    for (const token of tokens) {
        if (token.type === TokenType.KEYWORD) {
            // Remplacer uniquement les mots-clés C🥖 par leurs équivalents C
            const compiled = reversedTable[token.value];
            if (compiled) {
                result.push(compiled);
            } else {
                result.push(token.value);
            }
        } else {
            // Conserver les autres tokens tels quels
            result.push(token.value);
        }
    }

    return tokensToString(result);
}

// Fonction pour reconstituer le code à partir des tokens
export function tokensToString(tokens: string[]): string {
    return tokens.join('');
}
