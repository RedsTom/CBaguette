import { translateCToBaguette } from '../lexer';

describe('Traduction (C vers C🥖)', () => {
    test('Traduction de base', () => {
        const codeC = `
        void main() {
            int x = 10;
            if (x > 5) {
                return;
            }
        }
        `;

        const expectedBaguette = `
        néant main() {
            entier x = 10;
            si (x > 5) {
                retourner;
            }
        }
        `;

        const translatedCode = translateCToBaguette(codeC);
        expect(translatedCode.replace(/\s+/g, ' ')).toEqual(expectedBaguette.replace(/\s+/g, ' '));
    });

    test('Traduction avec des mots-clés complexes', () => {
        const codeC = `
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

        const expectedBaguette = `
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

        const translatedCode = translateCToBaguette(codeC);
        expect(translatedCode.replace(/\s+/g, ' ')).toEqual(expectedBaguette.replace(/\s+/g, ' '));
    });

    test('Traduction d\'un extrait de test.c', () => {
        // Extrait du fichier test.c
        const codeC = `
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

        const expectedBaguette = `
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

        const translatedCode = translateCToBaguette(codeC);
        expect(translatedCode.replace(/\s+/g, ' ')).toEqual(expectedBaguette.replace(/\s+/g, ' '));
    });

    test('Traduction des types de données', () => {
        const codeC = `
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

        const expectedBaguette = `
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

        const translatedCode = translateCToBaguette(codeC);
        expect(translatedCode.replace(/\s+/g, ' ')).toEqual(expectedBaguette.replace(/\s+/g, ' '));
    });

    test('Traduction des structures de contrôle complexes', () => {
        const codeC = `
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

        const expectedBaguette = `
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

        const translatedCode = translateCToBaguette(codeC);
        expect(translatedCode.replace(/\s+/g, ' ')).toEqual(expectedBaguette.replace(/\s+/g, ' '));
    });

    test('Traduction des qualificateurs et spécificateurs', () => {
        const codeC = `
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

        const expectedBaguette = `
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

        const translatedCode = translateCToBaguette(codeC);
        expect(translatedCode.replace(/\s+/g, ' ')).toEqual(expectedBaguette.replace(/\s+/g, ' '));
    });

    test('Traduction des opérateurs et constantes spéciales', () => {
        const codeC = `
        void test_operators() {
            int size = sizeof(int);
            bool is_true = true;
            bool is_false = false;
            int* ptr = nullptr;
            
            if (is_true && !is_false) {
                printf("Test réussi\\n");
            }
        }
        `;

        const expectedBaguette = `
        néant test_operators() {
            entier size = taillede(entier);
            boule is_true = vrai;
            boule is_false = faux;
            entier* ptr = pointeurverslenéant;
            
            si (is_true && !is_false) {
                printf("Test réussi\\n");
            }
        }
        `;

        const translatedCode = translateCToBaguette(codeC);
        expect(translatedCode.replace(/\s+/g, ' ')).toEqual(expectedBaguette.replace(/\s+/g, ' '));
    });

    test('Traduction avec goto et labels', () => {
        const codeC = `
        void error_handling() {
            int result = initialize();
            if (result != 0) {
                goto cleanup;
            }
            
            result = process_data();
            if (result != 0) {
                goto cleanup;
            }
            
            return;
            
        cleanup:
            cleanup_resources();
            return;
        }
        `;

        const expectedBaguette = `
        néant error_handling() {
            entier result = initialize();
            si (result != 0) {
                allerà cleanup;
            }
            
            result = process_data();
            si (result != 0) {
                allerà cleanup;
            }
            
            retourner;
            
        cleanup:
            cleanup_resources();
            retourner;
        }
        `;

        const translatedCode = translateCToBaguette(codeC);
        expect(translatedCode.replace(/\s+/g, ' ')).toEqual(expectedBaguette.replace(/\s+/g, ' '));
    });

    test('Traduction avec structures complexes', () => {
        const codeC = `
        struct Student {
            char name[50];
            int age;
            float grade;
        };
        
        enum Grade {
            EXCELLENT,
            GOOD,
            AVERAGE,
            POOR
        };
        
        union Value {
            int integer_val;
            float float_val;
            char string_val[20];
        };
        
        typedef struct Student Student_t;
        `;

        const expectedBaguette = `
        classe Student {
            caractère name[50];
            entier age;
            flottant grade;
        };
        
        énumération Grade {
            EXCELLENT,
            GOOD,
            AVERAGE,
            POOR
        };
        
        union Value {
            entier integer_val;
            flottant float_val;
            caractère string_val[20];
        };
        
        enregistrertype classe Student Student_t;
        `;

        const translatedCode = translateCToBaguette(codeC);
        expect(translatedCode.replace(/\s+/g, ' ')).toEqual(expectedBaguette.replace(/\s+/g, ' '));
    });

    test('Traduction avec switch complexe et fall-through', () => {
        const codeC = `
        void process_grade(enum Grade g) {
            switch (g) {
                case EXCELLENT:
                case GOOD:
                    printf("Bien joué !\\n");
                    break;
                    
                case AVERAGE:
                    printf("Peut mieux faire\\n");
                    break;
                    
                case POOR:
                    printf("Il faut travailler plus\\n");
                    // Fall through volontaire
                    
                default:
                    printf("Grade invalide\\n");
                    break;
            }
        }
        `;

        const expectedBaguette = `
        néant process_grade(énumération Grade g) {
            enfonctionde (g) {
                lorsque EXCELLENT:
                lorsque GOOD:
                    printf("Bien joué !\\n");
                    arrêter;
                    
                lorsque AVERAGE:
                    printf("Peut mieux faire\\n");
                    arrêter;
                    
                lorsque POOR:
                    printf("Il faut travailler plus\\n");
                    // Fall through volontaire
                    
                pardéfaut:
                    printf("Grade invalide\\n");
                    arrêter;
            }
        }
        `;

        const translatedCode = translateCToBaguette(codeC);
        expect(translatedCode.replace(/\s+/g, ' ')).toEqual(expectedBaguette.replace(/\s+/g, ' '));
    });

    test('Traduction avec pointeurs avancés', () => {
        const codeC = `
        void advanced_pointers() {
            int matrix[3][3];
            int (*ptr_to_array)[3] = matrix;
            int *ptr_array[3];
            int **double_ptr;
            
            const int *const_ptr = &matrix[0][0];
            volatile int *volatile_ptr;
            
            int size_of_int = sizeof(int);
            int size_of_matrix = sizeof(matrix);
        }
        `;

        const expectedBaguette = `
        néant advanced_pointers() {
            entier matrix[3][3];
            entier (*ptr_to_array)[3] = matrix;
            entier *ptr_array[3];
            entier **double_ptr;
            
            constante entier *const_ptr = &matrix[0][0];
            volatile entier *volatile_ptr;
            
            entier size_of_int = taillede(entier);
            entier size_of_matrix = taillede(matrix);
        }
        `;

        const translatedCode = translateCToBaguette(codeC);
        expect(translatedCode.replace(/\s+/g, ' ')).toEqual(expectedBaguette.replace(/\s+/g, ' '));
    });

    test('Traduction avec fonctions et récursion', () => {
        const codeC = `
        static int global_counter = 0;
        
        extern void external_function(void);
        
        inline int add(int a, int b) {
            return a + b;
        }
        
        int factorial(int n) {
            if (n <= 1) {
                return 1;
            }
            return n * factorial(n - 1);
        }
        
        void increment_counter(void) {
            static int local_counter = 0;
            global_counter++;
            local_counter++;
        }
        `;

        const expectedBaguette = `
        statique entier global_counter = 0;
        
        externe néant external_function(néant);
        
        linéarisé entier add(entier a, entier b) {
            retourner a + b;
        }
        
        entier factorial(entier n) {
            si (n <= 1) {
                retourner 1;
            }
            retourner n * factorial(n - 1);
        }
        
        néant increment_counter(néant) {
            statique entier local_counter = 0;
            global_counter++;
            local_counter++;
        }
        `;

        const translatedCode = translateCToBaguette(codeC);
        expect(translatedCode.replace(/\s+/g, ' ')).toEqual(expectedBaguette.replace(/\s+/g, ' '));
    });

    test('Traduction préservant les commentaires et chaînes', () => {
        const codeC = `
        /* Commentaire de bloc
           sur plusieurs lignes */
        void test_strings() {
            // Commentaire de ligne
            char *message = "Hello, this contains int and void words";
            printf("int = %d, void function called\\n", 42);
            
            /* Les mots-clés dans les commentaires ne doivent pas être traduits:
               int, void, if, else, for, while, etc. */
        }
        `;

        const expectedBaguette = `
        /* Commentaire de bloc
           sur plusieurs lignes */
        néant test_strings() {
            // Commentaire de ligne
            caractère *message = "Hello, this contains int and void words";
            printf("int = %d, void function called\\n", 42);
            
            /* Les mots-clés dans les commentaires ne doivent pas être traduits:
               int, void, if, else, for, while, etc. */
        }
        `;

        const translatedCode = translateCToBaguette(codeC);
        expect(translatedCode.replace(/\s+/g, ' ')).toEqual(expectedBaguette.replace(/\s+/g, ' '));
    });

    test('Traduction avec identifiants contenant des mots-clés', () => {
        const codeC = `
        void test_identifiers() {
            int interface_id = 1;  // "int" est traduit, "interface" ne l'est pas
            char interface[100];   // "char" est traduit, "interface" ne l'est pas
            float interface_function(void); // "float" et "void" traduits, "interface_function" non
            
            struct interface_data {
                int value;
                char name[50];
            };
        }
        `;

        const expectedBaguette = `
        néant test_identifiers() {
            entier interface_id = 1;  // "int" est traduit, "interface" ne l'est pas
            caractère interface[100];   // "char" est traduit, "interface" ne l'est pas
            flottant interface_function(néant); // "float" et "void" traduits, "interface_function" non
            
            classe interface_data {
                entier value;
                caractère name[50];
            };
        }
        `;

        const translatedCode = translateCToBaguette(codeC);
        expect(translatedCode.replace(/\s+/g, ' ')).toEqual(expectedBaguette.replace(/\s+/g, ' '));
    });
});
