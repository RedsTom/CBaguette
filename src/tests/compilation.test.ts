import { compileBaguetteToC } from '../lexer';

describe('Compilation (C🥖 vers C)', () => {
    test('Compilation de base', () => {
        const codeBaguette = `
        néant main() {
            entier x = 10;
            si (x > 5) {
                retourner;
            }
        }
        `;

        const expectedC = `
        void main() {
            int x = 10;
            if (x > 5) {
                return;
            }
        }
        `;

        const compiledCode = compileBaguetteToC(codeBaguette);
        expect(compiledCode.replace(/\s+/g, ' ')).toEqual(expectedC.replace(/\s+/g, ' '));
    });

    test('Compilation avec des mots-clés complexes', () => {
        // Test complet
        const codeBaguette = `
        énumération State { INIT, RUNNING };
        classe Data { entier value; };
        néant process(classe Data *d) {
            statique entier count = 0;
            enfonctionde (count) {
                lorsque 0:
                    arrêter;
                pardéfaut:
                    retourner;
            }
        }
        `;

        const expectedC = `
        enum State { INIT, RUNNING };
        struct Data { int value; };
        void process(struct Data *d) {
            static int count = 0;
            switch (count) {
                case 0:
                    break;
                default:
                    return;
            }
        }
        `;

        const compiledCode = compileBaguetteToC(codeBaguette);

        // Comparaison mot par mot pour identifier le problème
        const cleanedCompiled = compiledCode.replace(/\s+/g, ' ').trim();
        const cleanedExpected = expectedC.replace(/\s+/g, ' ').trim();

        expect(cleanedCompiled).toEqual(cleanedExpected);
    });

    test('Compilation d\'un extrait de test2.c', () => {
        // Extrait du fichier test2.c
        const codeBaguette = `
        néant processState(classe ComplexStruct *s) {
            si (s == NULL) {
                retourner;
            }
            enfonctionde (s->currentState) {
                lorsque INIT:
                    arrêter;
                pardéfaut:
                    arrêter;
            }
        }`;

        const expectedC = `
        void processState(struct ComplexStruct *s) {
            if (s == NULL) {
                return;
            }
            switch (s->currentState) {
                case INIT:
                    break;
                default:
                    break;
            }
        }`;

        const compiledCode = compileBaguetteToC(codeBaguette);
        expect(compiledCode.replace(/\s+/g, ' ')).toEqual(expectedC.replace(/\s+/g, ' '));
    });

    test('Compilation des types de données', () => {
        const codeBaguette = `
        caractère c = 'a';
        entier i = 42;
        flottant f = 3.14;
        flottantprécis d = 3.141592653589793;
        entiercourt s = 100;
        entierlong l = 1000000L;
        ouijeveuxlesigne entier signed_int = -42;
        jmencarrelaracedusigne entier ui = 42U;
        boule b = vrai;
        `;

        const expectedC = `
        char c = 'a';
        int i = 42;
        float f = 3.14;
        double d = 3.141592653589793;
        short s = 100;
        long l = 1000000L;
        signed int signed_int = -42;
        unsigned int ui = 42U;
        bool b = true;
        `;

        const compiledCode = compileBaguetteToC(codeBaguette);
        expect(compiledCode.replace(/\s+/g, ' ')).toEqual(expectedC.replace(/\s+/g, ' '));
    });

    test('Compilation des structures de contrôle', () => {
        const codeBaguette = `
        entier fibonacci(entier n) {
            si (n <= 1) {
                retourner n;
            } sinon {
                retourner fibonacci(n-1) + fibonacci(n-2);
            }
        }
        
        néant loops() {
            pour (entier i = 0; i < 10; i++) {
                si (i == 5) {
                    continuer;
                }
                si (i == 8) {
                    arrêter;
                }
            }
            
            entier j = 0;
            tantque (j < 5) {
                j++;
            }
            
            faire {
                j--;
            } tantque (j > 0);
        }
        `;

        const expectedC = `
        int fibonacci(int n) {
            if (n <= 1) {
                return n;
            } else {
                return fibonacci(n-1) + fibonacci(n-2);
            }
        }
        
        void loops() {
            for (int i = 0; i < 10; i++) {
                if (i == 5) {
                    continue;
                }
                if (i == 8) {
                    break;
                }
            }
            
            int j = 0;
            while (j < 5) {
                j++;
            }
            
            do {
                j--;
            } while (j > 0);
        }
        `;

        const compiledCode = compileBaguetteToC(codeBaguette);
        expect(compiledCode.replace(/\s+/g, ' ')).toEqual(expectedC.replace(/\s+/g, ' '));
    });

    test('Compilation des qualificateurs et spécificateurs de stockage', () => {
        const codeBaguette = `
        constante entier MAX_SIZE = 100;
        volatile entier interrupt_flag;
        statique entier counter = 0;
        externe entier global_var;
        automatique entier local_var;
        
        linéarisé entier square(entier x) {
            retourner x * x;
        }
        
        enregistrertype classe Point Point_t;
        `;

        const expectedC = `
        const int MAX_SIZE = 100;
        volatile int interrupt_flag;
        static int counter = 0;
        extern int global_var;
        auto int local_var;
        
        inline int square(int x) {
            return x * x;
        }
        
        typedef struct Point Point_t;
        `;

        const compiledCode = compileBaguetteToC(codeBaguette);
        expect(compiledCode.replace(/\s+/g, ' ')).toEqual(expectedC.replace(/\s+/g, ' '));
    });

    test('Compilation des opérateurs et constantes', () => {
        const codeBaguette = `
        néant test_operators() {
            entier size = taillede(entier);
            boule is_true = vrai;
            boule is_false = faux;
            entier* ptr = pointeurverslenéant;
            
            si (is_true && !is_false) {
                // Test passé
            }
        }
        `;

        const expectedC = `
        void test_operators() {
            int size = sizeof(int);
            bool is_true = true;
            bool is_false = false;
            int* ptr = nullptr;
            
            if (is_true && !is_false) {
                // Test passé
            }
        }
        `;

        const compiledCode = compileBaguetteToC(codeBaguette);
        expect(compiledCode.replace(/\s+/g, ' ')).toEqual(expectedC.replace(/\s+/g, ' '));
    });

    test('Compilation avec goto et étiquettes', () => {
        const codeBaguette = `
        néant test_goto() {
            entier i = 0;
            
        boucle:
            si (i < 5) {
                i++;
                allerà boucle;
            }
            
            retourner;
        }
        `;

        const expectedC = `
        void test_goto() {
            int i = 0;
            
        boucle:
            if (i < 5) {
                i++;
                goto boucle;
            }
            
            return;
        }
        `;

        const compiledCode = compileBaguetteToC(codeBaguette);
        expect(compiledCode.replace(/\s+/g, ' ')).toEqual(expectedC.replace(/\s+/g, ' '));
    });

    test('Compilation avec unions et énumérations complexes', () => {
        const codeBaguette = `
        énumération Color {
            RED,
            GREEN,
            BLUE
        };
        
        union Data {
            entier i;
            flottant f;
            caractère c[4];
        };
        
        classe Point {
            entier x, y;
            énumération Color color;
        };
        `;

        const expectedC = `
        enum Color {
            RED,
            GREEN,
            BLUE
        };
        
        union Data {
            int i;
            float f;
            char c[4];
        };
        
        struct Point {
            int x, y;
            enum Color color;
        };
        `;

        const compiledCode = compileBaguetteToC(codeBaguette);
        expect(compiledCode.replace(/\s+/g, ' ')).toEqual(expectedC.replace(/\s+/g, ' '));
    });

    test('Compilation avec mélange de français et d\'identifiants', () => {
        const codeBaguette = `
        néant calculateFactorial() {
            entier number = 5;
            entier result = 1;
            
            pour (entier i = 1; i <= number; i++) {
                result *= i;
            }
            
            printf("Factorial de %d est %d\\n", number, result);
        }
        `;

        const expectedC = `
        void calculateFactorial() {
            int number = 5;
            int result = 1;
            
            for (int i = 1; i <= number; i++) {
                result *= i;
            }
            
            printf("Factorial de %d est %d\\n", number, result);
        }
        `;

        const compiledCode = compileBaguetteToC(codeBaguette);
        expect(compiledCode.replace(/\s+/g, ' ')).toEqual(expectedC.replace(/\s+/g, ' '));
    });

    test('Compilation avec switch complexe et multiples cases', () => {
        const codeBaguette = `
        néant processCommand(entier cmd) {
            enfonctionde (cmd) {
                lorsque 1:
                lorsque 2:
                    printf("Commande simple\\n");
                    arrêter;
                    
                lorsque 3:
                    printf("Commande spéciale\\n");
                    // Pas de break volontaire
                    
                lorsque 4:
                    printf("Commande avancée\\n");
                    arrêter;
                    
                pardéfaut:
                    printf("Commande inconnue\\n");
                    arrêter;
            }
        }
        `;

        const expectedC = `
        void processCommand(int cmd) {
            switch (cmd) {
                case 1:
                case 2:
                    printf("Commande simple\\n");
                    break;
                    
                case 3:
                    printf("Commande spéciale\\n");
                    // Pas de break volontaire
                    
                case 4:
                    printf("Commande avancée\\n");
                    break;
                    
                default:
                    printf("Commande inconnue\\n");
                    break;
            }
        }
        `;

        const compiledCode = compileBaguetteToC(codeBaguette);
        expect(compiledCode.replace(/\s+/g, ' ')).toEqual(expectedC.replace(/\s+/g, ' '));
    });

    test('Compilation avec pointeurs et arithmétique', () => {
        const codeBaguette = `
        néant pointer_arithmetic() {
            entier arr[10];
            entier* ptr = arr;
            entier** double_ptr = &ptr;
            
            pour (entier i = 0; i < 10; i++) {
                *(ptr + i) = i * 2;
            }
            
            entier size = taillede(arr) / taillede(entier);
            printf("Taille du tableau: %d\\n", size);
        }
        `;

        const expectedC = `
        void pointer_arithmetic() {
            int arr[10];
            int* ptr = arr;
            int** double_ptr = &ptr;
            
            for (int i = 0; i < 10; i++) {
                *(ptr + i) = i * 2;
            }
            
            int size = sizeof(arr) / sizeof(int);
            printf("Taille du tableau: %d\\n", size);
        }
        `;

        const compiledCode = compileBaguetteToC(codeBaguette);
        expect(compiledCode.replace(/\s+/g, ' ')).toEqual(expectedC.replace(/\s+/g, ' '));
    });
});
