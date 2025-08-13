// Définition des mots-clés C avec leurs équivalents en français
export interface KeywordMapping {
    originalKeyword: string;      // Mot-clé C original
    translatedKeyword: string;    // Version française
    category: KeywordCategory;    // Catégorie du mot-clé
    description?: string;         // Description optionnelle
}

// Catégories de mots-clés
export enum KeywordCategory {
    TYPE = 'type',                // Types de données
    CONTROL_FLOW = 'control',     // Contrôle de flux
    STORAGE = 'storage',          // Spécificateurs de stockage
    OPERATOR = 'operator',        // Opérateurs
    QUALIFIER = 'qualifier',      // Qualificateurs
    CONSTANT = 'constant',        // Constantes
    OTHER = 'other'               // Autres
}

// Définition structurée des mots-clés
export const KEYWORDS: KeywordMapping[] = [
    // Types de données
    { originalKeyword: 'void', translatedKeyword: 'néant', category: KeywordCategory.TYPE, description: 'Type vide' },
    { originalKeyword: 'char', translatedKeyword: 'caractère', category: KeywordCategory.TYPE, description: 'Caractère' },
    { originalKeyword: 'int', translatedKeyword: 'entier', category: KeywordCategory.TYPE, description: 'Entier' },
    { originalKeyword: 'float', translatedKeyword: 'flottant', category: KeywordCategory.TYPE, description: 'Nombre à virgule flottante' },
    { originalKeyword: 'double', translatedKeyword: 'flottantprécis', category: KeywordCategory.TYPE, description: 'Flottant double précision' },
    { originalKeyword: 'short', translatedKeyword: 'entiercourt', category: KeywordCategory.TYPE, description: 'Entier court' },
    { originalKeyword: 'long', translatedKeyword: 'entierlong', category: KeywordCategory.TYPE, description: 'Entier long' },
    { originalKeyword: 'signed', translatedKeyword: 'ouijeveuxlesigne', category: KeywordCategory.TYPE, description: 'Avec signe' },
    { originalKeyword: 'unsigned', translatedKeyword: 'jmencarrelaracedusigne', category: KeywordCategory.TYPE, description: 'Sans signe' },
    { originalKeyword: 'bool', translatedKeyword: 'boule', category: KeywordCategory.TYPE, description: 'Booléen' },

    // Structures de contrôle
    { originalKeyword: 'if', translatedKeyword: 'si', category: KeywordCategory.CONTROL_FLOW, description: 'Condition si' },
    { originalKeyword: 'else', translatedKeyword: 'sinon', category: KeywordCategory.CONTROL_FLOW, description: 'Condition sinon' },
    { originalKeyword: 'switch', translatedKeyword: 'enfonctionde', category: KeywordCategory.CONTROL_FLOW, description: 'Sélection multiple' },
    { originalKeyword: 'case', translatedKeyword: 'lorsque', category: KeywordCategory.CONTROL_FLOW, description: 'Cas dans un switch' },
    { originalKeyword: 'default', translatedKeyword: 'pardéfaut', category: KeywordCategory.CONTROL_FLOW, description: 'Cas par défaut' },
    { originalKeyword: 'for', translatedKeyword: 'pour', category: KeywordCategory.CONTROL_FLOW, description: 'Boucle pour' },
    { originalKeyword: 'while', translatedKeyword: 'tantque', category: KeywordCategory.CONTROL_FLOW, description: 'Boucle tant que' },
    { originalKeyword: 'do', translatedKeyword: 'faire', category: KeywordCategory.CONTROL_FLOW, description: 'Boucle faire... tant que' },
    { originalKeyword: 'break', translatedKeyword: 'arrêter', category: KeywordCategory.CONTROL_FLOW, description: 'Sortir d\'une boucle' },
    { originalKeyword: 'continue', translatedKeyword: 'continuer', category: KeywordCategory.CONTROL_FLOW, description: 'Passer à l\'itération suivante' },
    { originalKeyword: 'return', translatedKeyword: 'retourner', category: KeywordCategory.CONTROL_FLOW, description: 'Retourner une valeur' },
    { originalKeyword: 'goto', translatedKeyword: 'allerà', category: KeywordCategory.CONTROL_FLOW, description: 'Aller à un label' },

    // Spécificateurs de stockage
    { originalKeyword: 'auto', translatedKeyword: 'automatique', category: KeywordCategory.STORAGE, description: 'Variable automatique' },
    { originalKeyword: 'static', translatedKeyword: 'statique', category: KeywordCategory.STORAGE, description: 'Variable statique' },
    { originalKeyword: 'extern', translatedKeyword: 'externe', category: KeywordCategory.STORAGE, description: 'Variable externe' },
    { originalKeyword: 'typedef', translatedKeyword: 'enregistrertype', category: KeywordCategory.STORAGE, description: 'Définition de type' },
    { originalKeyword: 'thread_local', translatedKeyword: 'fillocal', category: KeywordCategory.STORAGE, description: 'Variable locale au thread' },

    // Qualificateurs
    { originalKeyword: 'const', translatedKeyword: 'constante', category: KeywordCategory.QUALIFIER, description: 'Valeur constante' },
    { originalKeyword: 'volatile', translatedKeyword: 'volatile', category: KeywordCategory.QUALIFIER, description: 'Variable volatile' },
    { originalKeyword: 'restrict', translatedKeyword: 'restreint', category: KeywordCategory.QUALIFIER, description: 'Pointeur non aliasé' },
    { originalKeyword: 'inline', translatedKeyword: 'linéarisé', category: KeywordCategory.QUALIFIER, description: 'Fonction en ligne' },

    // Types composés et opérations
    { originalKeyword: 'struct', translatedKeyword: 'classe', category: KeywordCategory.TYPE, description: 'Structure' },
    { originalKeyword: 'union', translatedKeyword: 'union', category: KeywordCategory.TYPE, description: 'Union' },
    { originalKeyword: 'enum', translatedKeyword: 'énumération', category: KeywordCategory.TYPE, description: 'Énumération' },
    { originalKeyword: 'sizeof', translatedKeyword: 'taillede', category: KeywordCategory.OPERATOR, description: 'Taille en octets' },

    // Constantes
    { originalKeyword: 'true', translatedKeyword: 'vrai', category: KeywordCategory.CONSTANT, description: 'Vrai' },
    { originalKeyword: 'false', translatedKeyword: 'faux', category: KeywordCategory.CONSTANT, description: 'Faux' },
    { originalKeyword: 'nullptr', translatedKeyword: 'pointeurverslenéant', category: KeywordCategory.CONSTANT, description: 'Pointeur nul' },

    // Fonctionnalités C11/C++
    { originalKeyword: 'alignas', translatedKeyword: 'alignercomme', category: KeywordCategory.QUALIFIER, description: 'Alignement' },
    { originalKeyword: 'alignof', translatedKeyword: 'alignementde', category: KeywordCategory.OPERATOR, description: 'Obtenir l\'alignement' },
    { originalKeyword: 'constexpr', translatedKeyword: 'expressionconstante', category: KeywordCategory.QUALIFIER, description: 'Expression constante' },
    { originalKeyword: 'static_assert', translatedKeyword: 'ouijesuissurque', category: KeywordCategory.OTHER, description: 'Assertion statique' },
    { originalKeyword: 'typeof', translatedKeyword: 'typede', category: KeywordCategory.OPERATOR, description: 'Type de l\'expression' },
    { originalKeyword: 'typeof_unqual', translatedKeyword: 'typedequalifié', category: KeywordCategory.OPERATOR, description: 'Type de l\'expression sans qualificateurs' }
];

// Création des tables de mapping C->Baguette et Baguette->C
export const table: Record<string, string> = Object.fromEntries(
    KEYWORDS.map(({ originalKeyword, translatedKeyword }) => [originalKeyword, translatedKeyword])
);

export const reversedTable: Record<string, string> = Object.fromEntries(
    KEYWORDS.map(({ originalKeyword, translatedKeyword }) => [translatedKeyword, originalKeyword])
);

// Fonction utilitaire pour obtenir tous les mots-clés d'une catégorie
export function getKeywordsByCategory(category: KeywordCategory): KeywordMapping[] {
    return KEYWORDS.filter(keyword => keyword.category === category);
}

// Fonction pour vérifier si un mot est un mot-clé original (C)
export function isCKeyword(word: string): boolean {
    return Object.keys(table).includes(word);
}

// Fonction pour vérifier si un mot est un mot-clé traduit (Baguette)
export function isBaguetteKeyword(word: string): boolean {
    return Object.keys(reversedTable).includes(word);
}
