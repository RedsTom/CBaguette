import { translateCToBaguette, compileBaguetteToC } from '../lexer';

describe('Préservation du contenu non-code', () => {

    describe('Préservation des chaînes de caractères', () => {
        test('C vers C🥖 : chaînes avec mots-clés', () => {
            const codeC = `
            void function_test() {
                char *msg = "This string contains int, void, if, else keywords";
                printf("Testing: int=%d, void function, if condition\\n", 42);
                char buffer[] = "enum, struct, union, typedef should not change";
            }
            `;

            const expectedBaguette = `
            néant function_test() {
                caractère *msg = "This string contains int, void, if, else keywords";
                printf("Testing: int=%d, void function, if condition\\n", 42);
                caractère buffer[] = "enum, struct, union, typedef should not change";
            }
            `;

            const translatedCode = translateCToBaguette(codeC);
            expect(translatedCode.replace(/\s+/g, ' ')).toEqual(expectedBaguette.replace(/\s+/g, ' '));
        });

        test('C🥖 vers C : chaînes avec mots-clés français', () => {
            const codeBaguette = `
            néant function_test() {
                caractère *msg = "Cette chaîne contient néant, entier, si, sinon";
                printf("Test: entier=%d, fonction néant, condition si\\n", 42);
                caractère buffer[] = "énumération, classe, union ne doivent pas changer";
            }
            `;

            const expectedC = `
            void function_test() {
                char *msg = "Cette chaîne contient néant, entier, si, sinon";
                printf("Test: entier=%d, fonction néant, condition si\\n", 42);
                char buffer[] = "énumération, classe, union ne doivent pas changer";
            }
            `;

            const compiledCode = compileBaguetteToC(codeBaguette);
            expect(compiledCode.replace(/\s+/g, ' ')).toEqual(expectedC.replace(/\s+/g, ' '));
        });

        test('Chaînes avec caractères d\'échappement', () => {
            const codeC = `
            void escape_test() {
                char *str1 = "Message with \\"quotes\\" and int keyword";
                char *str2 = "Newline\\n with void keyword\\t";
                char *str3 = "Backslash \\\\ and float keyword";
            }
            `;

            const expectedBaguette = `
            néant escape_test() {
                caractère *str1 = "Message with \\"quotes\\" and int keyword";
                caractère *str2 = "Newline\\n with void keyword\\t";
                caractère *str3 = "Backslash \\\\ and float keyword";
            }
            `;

            const translatedCode = translateCToBaguette(codeC);
            expect(translatedCode.replace(/\s+/g, ' ')).toEqual(expectedBaguette.replace(/\s+/g, ' '));
        });

        test('Chaînes multilignes et caractères', () => {
            const codeC = `
            void multi_test() {
                char *long_msg = "This is a very long string that contains "
                                "multiple int, void, if keywords across lines";
                char single_char = 'i'; // 'i' comme dans 'int' mais c'est un char
                char *format = "int: %d, float: %f, char: %c";
            }
            `;

            const expectedBaguette = `
            néant multi_test() {
                caractère *long_msg = "This is a very long string that contains "
                                     "multiple int, void, if keywords across lines";
                caractère single_char = 'i'; // 'i' comme dans 'int' mais c'est un char
                caractère *format = "int: %d, float: %f, char: %c";
            }
            `;

            const translatedCode = translateCToBaguette(codeC);
            expect(translatedCode.replace(/\s+/g, ' ')).toEqual(expectedBaguette.replace(/\s+/g, ' '));
        });
    });

    describe('Préservation des commentaires', () => {
        test('C vers C🥖 : commentaires de ligne avec mots-clés', () => {
            const codeC = `
            void comment_test() {
                int x = 5; // Cette variable int contient une valeur
                // Les mots-clés suivants ne doivent pas être traduits: void, if, else, for, while
                float y = 3.14; // float pour les nombres décimaux
                /* Ce commentaire contient: struct, union, enum, typedef */
            }
            `;

            const expectedBaguette = `
            néant comment_test() {
                entier x = 5; // Cette variable int contient une valeur
                // Les mots-clés suivants ne doivent pas être traduits: void, if, else, for, while
                flottant y = 3.14; // float pour les nombres décimaux
                /* Ce commentaire contient: struct, union, enum, typedef */
            }
            `;

            const translatedCode = translateCToBaguette(codeC);
            expect(translatedCode.replace(/\s+/g, ' ')).toEqual(expectedBaguette.replace(/\s+/g, ' '));
        });

        test('C🥖 vers C : commentaires avec mots-clés français', () => {
            const codeBaguette = `
            néant comment_test() {
                entier x = 5; // Cette variable entier contient une valeur
                // Les mots-clés suivants ne doivent pas être traduits: néant, si, sinon, pour, tantque
                flottant y = 3.14; // flottant pour les nombres décimaux
                /* Ce commentaire contient: classe, énumération */
            }
            `;

            const expectedC = `
            void comment_test() {
                int x = 5; // Cette variable entier contient une valeur
                // Les mots-clés suivants ne doivent pas être traduits: néant, si, sinon, pour, tantque
                float y = 3.14; // flottant pour les nombres décimaux
                /* Ce commentaire contient: classe, énumération */
            }
            `;

            const compiledCode = compileBaguetteToC(codeBaguette);
            expect(compiledCode.replace(/\s+/g, ' ')).toEqual(expectedC.replace(/\s+/g, ' '));
        });

        test('Commentaires de bloc complexes', () => {
            const codeC = `
            /*
             * Cette fonction utilise plusieurs types:
             * - int pour les entiers
             * - float pour les décimaux  
             * - void pour le type de retour
             * Les structures de contrôle incluent:
             * if, else, for, while, switch, case, default
             */
            void complex_function() {
                /* Commentaire inline avec int, void, if */
                int result = 0;
            }
            `;

            const expectedBaguette = `
            /*
             * Cette fonction utilise plusieurs types:
             * - int pour les entiers
             * - float pour les décimaux  
             * - void pour le type de retour
             * Les structures de contrôle incluent:
             * if, else, for, while, switch, case, default
             */
            néant complex_function() {
                /* Commentaire inline avec int, void, if */
                entier result = 0;
            }
            `;

            const translatedCode = translateCToBaguette(codeC);
            expect(translatedCode.replace(/\s+/g, ' ')).toEqual(expectedBaguette.replace(/\s+/g, ' '));
        });

        test('Commentaires imbriqués et cas limites', () => {
            const codeC = `
            void edge_cases() {
                int x = 5; /* commentaire avec int */ float y = 3.14; // commentaire avec float
                // TODO: implémenter la logique pour void, int, char
                /* 
                 * Bloc de commentaire avec:
                 * struct Point { int x, y; };
                 * enum State { INIT, RUNNING };
                 */
            }
            `;

            const expectedBaguette = `
            néant edge_cases() {
                entier x = 5; /* commentaire avec int */ flottant y = 3.14; // commentaire avec float
                // TODO: implémenter la logique pour void, int, char
                /* 
                 * Bloc de commentaire avec:
                 * struct Point { int x, y; };
                 * enum State { INIT, RUNNING };
                 */
            }
            `;

            const translatedCode = translateCToBaguette(codeC);
            expect(translatedCode.replace(/\s+/g, ' ')).toEqual(expectedBaguette.replace(/\s+/g, ' '));
        });
    });

    describe('Préservation des directives préprocesseur', () => {
        test('Directives avec mots-clés dans les noms', () => {
            const codeC = `
            #include <stdio.h>
            #include <stdlib.h>
            #define INT_MAX 2147483647
            #define VOID_FUNC() do { /* void function */ } while(0)
            #ifdef USE_INT_TYPE
                typedef int my_int_type;
            #endif
            
            void preprocessor_test() {
                int value = INT_MAX;
            }
            `;

            const expectedBaguette = `
            #include <stdio.h>
            #include <stdlib.h>
            #define INT_MAX 2147483647
            #define VOID_FUNC() do { /* void function */ } while(0)
            #ifdef USE_INT_TYPE
                enregistrertype entier my_int_type;
            #endif
            
            néant preprocessor_test() {
                entier value = INT_MAX;
            }
            `;

            const translatedCode = translateCToBaguette(codeC);
            expect(translatedCode.replace(/\s+/g, ' ')).toEqual(expectedBaguette.replace(/\s+/g, ' '));
        });

        test('Macros complexes avec mots-clés', () => {
            const codeC = `
            #define DEBUG_INT(x) printf("int value: %d\\n", x)
            #define DECLARE_INT_VAR(name) int name = 0
            #define IF_VOID_PTR(ptr) if ((void*)ptr == NULL)
            
            void macro_test() {
                DECLARE_INT_VAR(test_var);
                DEBUG_INT(test_var);
            }
            `;

            const expectedBaguette = `
            #define DEBUG_INT(x) printf("int value: %d\\n", x)
            #define DECLARE_INT_VAR(name) int name = 0
            #define IF_VOID_PTR(ptr) if ((void*)ptr == NULL)
            
            néant macro_test() {
                DECLARE_INT_VAR(test_var);
                DEBUG_INT(test_var);
            }
            `;

            const translatedCode = translateCToBaguette(codeC);
            expect(translatedCode.replace(/\s+/g, ' ')).toEqual(expectedBaguette.replace(/\s+/g, ' '));
        });
    });

    describe('Préservation des identificateurs', () => {
        test('Identificateurs contenant des mots-clés', () => {
            const codeC = `
            struct int_container {
                int int_value;
                float float_value;
            };
            
            void interface_function() {
                int interface_id = 1;
                char interface_name[50];
                struct int_container my_int_data;
                
                void (*void_function_ptr)(void) = NULL;
            }
            `;

            const expectedBaguette = `
            classe int_container {
                entier int_value;
                flottant float_value;
            };
            
            néant interface_function() {
                entier interface_id = 1;
                caractère interface_name[50];
                classe int_container my_int_data;
                
                néant (*void_function_ptr)(néant) = NULL;
            }
            `;

            const translatedCode = translateCToBaguette(codeC);
            expect(translatedCode.replace(/\s+/g, ' ')).toEqual(expectedBaguette.replace(/\s+/g, ' '));
        });

        test('Noms de fonctions avec mots-clés', () => {
            const codeC = `
            int get_int_value();
            void set_void_pointer(void *ptr);
            float calculate_float_result();
            char read_char_input();
            
            struct data_struct {
                int (*int_processor)(int);
                void (*void_handler)(void);
            };
            `;

            const expectedBaguette = `
            entier get_int_value();
            néant set_void_pointer(néant *ptr);
            flottant calculate_float_result();
            caractère read_char_input();
            
            classe data_struct {
                entier (*int_processor)(entier);
                néant (*void_handler)(néant);
            };
            `;

            const translatedCode = translateCToBaguette(codeC);
            expect(translatedCode.replace(/\s+/g, ' ')).toEqual(expectedBaguette.replace(/\s+/g, ' '));
        });
    });

    describe('Tests de bidirectionnalité avec préservation', () => {
        test('Bidirectionnalité complète avec contenu mixte', () => {
            const originalC = `
            #include <stdio.h>
            
            /* 
             * Programme de test avec mots-clés dans commentaires:
             * int, void, float, char, if, else, for, while
             */
            
            #define DEBUG_MSG "Debug: int=%d, void function called"
            
            struct int_data_container {
                int interface_value;
                char interface_name[100];
            };
            
            void process_int_interface(struct int_data_container *data) {
                // Traitement avec int et void dans le commentaire
                printf("Processing int value: %d\\n", data->interface_value);
                printf(DEBUG_MSG, data->interface_value);
                
                char *msg = "String with int, void, if keywords inside";
                
                if (data->interface_value > 0) {
                    printf("Positive int value detected\\n");
                }
            }
            `;

            // C → C🥖
            const baguetteCode = translateCToBaguette(originalC);
            // C🥖 → C
            const backToC = compileBaguetteToC(baguetteCode);

            expect(backToC.replace(/\s+/g, ' ')).toEqual(originalC.replace(/\s+/g, ' '));
        });

        test('Bidirectionnalité avec cas complexes de préservation', () => {
            const originalC = `
            /*
             * Complex test with keywords in various contexts:
             * Types: int, float, double, char, void
             * Control: if, else, for, while, switch, case
             */
            
            #define INT_FUNC(x) "int function with x=" #x
            #define VOID_CALL() void_function_call()
            
            typedef struct {
                int int_field;      // Field named with 'int' keyword
                char char_array[50]; // Array named with 'char' keyword  
            } struct_with_int_names;
            
            void function_with_keywords_in_strings() {
                char *debug_msg = "Keywords: int, void, if, else should stay in strings";
                printf("Testing: int=%d, void ptr=%p\\n", 42, (void*)NULL);
                
                // Comment with int, void, float keywords that should not be translated
                struct_with_int_names data = {0};
                
                if (data.int_field == 0) {
                    /* Block comment with if, else, for keywords */
                    printf(INT_FUNC(123));
                }
            }
            `;

            // C → C🥖 → C
            const baguetteCode = translateCToBaguette(originalC);
            const backToC = compileBaguetteToC(baguetteCode);

            expect(backToC.replace(/\s+/g, ' ')).toEqual(originalC.replace(/\s+/g, ' '));
        });

        test('Préservation avec caractères spéciaux et échappements', () => {
            const originalC = `
            void escape_sequence_test() {
                char *str1 = "Escaped quote: \\"int value\\" in string";
                char *str2 = "Newline:\\n with int keyword\\t after tab";
                char *str3 = "Backslash: \\\\ before int keyword";
                
                // Comment with escaped characters and int keyword
                printf("Complex string: \\"void\\", \\t\\n, \\\\ and int");
                
                char pattern[] = "Regex: \\\\d+ matches int values";
            }
            `;

            const baguetteCode = translateCToBaguette(originalC);
            const backToC = compileBaguetteToC(baguetteCode);

            expect(backToC.replace(/\s+/g, ' ')).toEqual(originalC.replace(/\s+/g, ' '));
        });
    });

    describe('Tests de cas limites', () => {
        test('Mots-clés adjacents à des délimiteurs', () => {
            const codeC = `
            void edge_case_test() {
                printf("int,void;float:char|if&else");
                char *tokens = "int void float char if else";
                char *punctuation = "int;void,float.char!if?else";
                
                // Comment: int,void;float:char
                /* Block: int|void&float */
            }
            `;

            const expectedBaguette = `
            néant edge_case_test() {
                printf("int,void;float:char|if&else");
                caractère *tokens = "int void float char if else";
                caractère *punctuation = "int;void,float.char!if?else";
                
                // Comment: int,void;float:char
                /* Block: int|void&float */
            }
            `;

            const translatedCode = translateCToBaguette(codeC);
            expect(translatedCode.replace(/\s+/g, ' ')).toEqual(expectedBaguette.replace(/\s+/g, ' '));
        });

        test('Commentaires avec syntaxe de code', () => {
            const codeC = `
            void code_in_comments() {
                /*
                 * Example code snippet in comment:
                 * int main() {
                 *     if (condition) {
                 *         printf("void function");
                 *     }
                 * }
                 */
                int x = 5; // x est de type int
            }
            `;

            const expectedBaguette = `
            néant code_in_comments() {
                /*
                 * Example code snippet in comment:
                 * int main() {
                 *     if (condition) {
                 *         printf("void function");
                 *     }
                 * }
                 */
                entier x = 5; // x est de type int
            }
            `;

            const translatedCode = translateCToBaguette(codeC);
            expect(translatedCode.replace(/\s+/g, ' ')).toEqual(expectedBaguette.replace(/\s+/g, ' '));
        });
    });
});
