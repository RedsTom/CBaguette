import { translateCToBaguette, compileBaguetteToC } from '../lexer';

describe('Tests de bidirectionnalité', () => {
    test('C → C🥖 → C doit préserver le code original', () => {
        const originalC = `
        void main() {
            int x = 10;
            if (x > 5) {
                return;
            }
        }
        `;

        // C → C🥖
        const baguetteCode = translateCToBaguette(originalC);
        // C🥖 → C
        const backToC = compileBaguetteToC(baguetteCode);

        expect(backToC.replace(/\s+/g, ' ')).toEqual(originalC.replace(/\s+/g, ' '));
    });

    test('C🥖 → C → C🥖 doit préserver le code original', () => {
        const originalBaguette = `
        néant main() {
            entier x = 10;
            si (x > 5) {
                retourner;
            }
        }
        `;

        // C🥖 → C
        const cCode = compileBaguetteToC(originalBaguette);
        // C → C🥖
        const backToBaguette = translateCToBaguette(cCode);

        expect(backToBaguette.replace(/\s+/g, ' ')).toEqual(originalBaguette.replace(/\s+/g, ' '));
    });

    test('Bidirectionnalité avec structures complexes', () => {
        const originalC = `
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

        const baguetteCode = translateCToBaguette(originalC);
        const backToC = compileBaguetteToC(baguetteCode);

        expect(backToC.replace(/\s+/g, ' ')).toEqual(originalC.replace(/\s+/g, ' '));
    });

    test('Bidirectionnalité avec tous les types de données', () => {
        const originalC = `
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

        const baguetteCode = translateCToBaguette(originalC);
        const backToC = compileBaguetteToC(baguetteCode);

        expect(backToC.replace(/\s+/g, ' ')).toEqual(originalC.replace(/\s+/g, ' '));
    });

    test('Bidirectionnalité avec structures de contrôle', () => {
        const originalC = `
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

        const baguetteCode = translateCToBaguette(originalC);
        const backToC = compileBaguetteToC(baguetteCode);

        expect(backToC.replace(/\s+/g, ' ')).toEqual(originalC.replace(/\s+/g, ' '));
    });

    test('Bidirectionnalité avec qualificateurs et spécificateurs', () => {
        const originalC = `
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

        const baguetteCode = translateCToBaguette(originalC);
        const backToC = compileBaguetteToC(baguetteCode);

        expect(backToC.replace(/\s+/g, ' ')).toEqual(originalC.replace(/\s+/g, ' '));
    });

    test('Bidirectionnalité avec opérateurs spéciaux', () => {
        const originalC = `
        void test_operators() {
            int size = sizeof(int);
            bool is_true = true;
            bool is_false = false;
            int* ptr = nullptr;
            
            if (is_true && !is_false) {
                printf("Test OK\\n");
            }
        }
        `;

        const baguetteCode = translateCToBaguette(originalC);
        const backToC = compileBaguetteToC(baguetteCode);

        expect(backToC.replace(/\s+/g, ' ')).toEqual(originalC.replace(/\s+/g, ' '));
    });

    test('Bidirectionnalité avec goto', () => {
        const originalC = `
        void test_goto() {
            int i = 0;
            
        loop:
            if (i < 5) {
                i++;
                goto loop;
            }
            
            return;
        }
        `;

        const baguetteCode = translateCToBaguette(originalC);
        const backToC = compileBaguetteToC(baguetteCode);

        expect(backToC.replace(/\s+/g, ' ')).toEqual(originalC.replace(/\s+/g, ' '));
    });

    test('Bidirectionnalité préservant les commentaires et chaînes', () => {
        const originalC = `
        /* Commentaire de bloc */
        void test_strings() {
            // Commentaire de ligne
            char *message = "This string contains int and void keywords";
            printf("Keywords in strings: int, void, if\\n");
        }
        `;

        const baguetteCode = translateCToBaguette(originalC);
        const backToC = compileBaguetteToC(baguetteCode);

        expect(backToC.replace(/\s+/g, ' ')).toEqual(originalC.replace(/\s+/g, ' '));
    });

    test('Bidirectionnalité avec switch complexe', () => {
        const originalC = `
        void process_command(int cmd) {
            switch (cmd) {
                case 1:
                case 2:
                    printf("Simple command\\n");
                    break;
                    
                case 3:
                    printf("Special command\\n");
                    
                case 4:
                    printf("Advanced command\\n");
                    break;
                    
                default:
                    printf("Unknown command\\n");
                    break;
            }
        }
        `;

        const baguetteCode = translateCToBaguette(originalC);
        const backToC = compileBaguetteToC(baguetteCode);

        expect(backToC.replace(/\s+/g, ' ')).toEqual(originalC.replace(/\s+/g, ' '));
    });

    test('Bidirectionnalité avec pointeurs complexes', () => {
        const originalC = `
        void pointer_test() {
            int arr[10];
            int* ptr = arr;
            int** double_ptr = &ptr;
            
            const int *const_ptr = &arr[0];
            volatile int *volatile_ptr;
            
            for (int i = 0; i < 10; i++) {
                *(ptr + i) = i * 2;
            }
            
            int size = sizeof(arr) / sizeof(int);
        }
        `;

        const baguetteCode = translateCToBaguette(originalC);
        const backToC = compileBaguetteToC(baguetteCode);

        expect(backToC.replace(/\s+/g, ' ')).toEqual(originalC.replace(/\s+/g, ' '));
    });

    test('Bidirectionnalité avec programme complet', () => {
        const originalC = `
        #include <stdio.h>
        #include <stdlib.h>
        
        typedef struct Node {
            int data;
            struct Node* next;
        } Node_t;
        
        static int global_count = 0;
        
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
        
        void process_list(Node_t* head) {
            Node_t* current = head;
            
            while (current != nullptr) {
                switch (current->data) {
                    case 0:
                        printf("Zero found\\n");
                        break;
                    case 1:
                        printf("One found\\n");
                        break;
                    default:
                        printf("Other: %d\\n", current->data);
                        break;
                }
                current = current->next;
            }
        }
        
        int main(void) {
            const int MAX_SIZE = 100;
            int arr[MAX_SIZE];
            
            for (int i = 0; i < MAX_SIZE; i++) {
                arr[i] = i * 2;
            }
            
            int sum = 0;
            int i = 0;
            do {
                sum += arr[i];
                i++;
            } while (i < MAX_SIZE);
            
            printf("Sum: %d\\n", sum);
            return 0;
        }
        `;

        const baguetteCode = translateCToBaguette(originalC);
        const backToC = compileBaguetteToC(baguetteCode);

        expect(backToC.replace(/\s+/g, ' ')).toEqual(originalC.replace(/\s+/g, ' '));
    });
});
